import json
import os
from datetime import datetime
from transformers import pipeline
import logging


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.ERROR)


HISTORY_FILE = "./history.json"
os.makedirs(os.path.dirname(HISTORY_FILE), exist_ok=True)
if not os.path.exists(HISTORY_FILE):
    with open(HISTORY_FILE, "w") as f:
        json.dump({"phq9": [], "emotions": []}, f)


emotion_clf = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=None,
    device=0  # GPU
)

NEG_EMOTIONS = {"sadness", "anger", "fear", "disgust"}
NEG_KEYWORDS = ["sad", "tired", "hopeless", "depressed", "lonely", "unhappy", "down"]


def load_history():
    try:
        with open(HISTORY_FILE, "r") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Error loading history: {e}")
        return {"phq9": [], "emotions": []}

def save_history(history):
    try:
        with open(HISTORY_FILE, "w") as f:
            json.dump(history, f, indent=2)
    except Exception as e:
        logger.error(f"Error saving history: {e}")

def analyze_emotion(text, threshold=0.5):
    try:
        out = emotion_clf(text, top_k=None)[0]
        ml_negative = False
        label = None
        score = 0

        if isinstance(out, list):
            for o in out:
                if o["label"].lower() in NEG_EMOTIONS and o["score"] >= threshold:
                    ml_negative = True
                    label = o["label"]
                    score = o["score"]
                    break
        else:
            if out["label"].lower() in NEG_EMOTIONS and out["score"] >= threshold:
                ml_negative = True
                label = out["label"]
                score = out["score"]

        keyword_negative = any(word in text.lower() for word in NEG_KEYWORDS)
        negative = ml_negative or keyword_negative

        history = load_history()
        history["emotions"].append({
            "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "text": text,
            "negative": negative,
            "label": label if ml_negative else "negative",
            "score": round(score, 3) if ml_negative else None
        })
        save_history(history)

        return negative
    except Exception as e:
        logger.error(f"Error in analyze_emotion: {e}")
        return False
