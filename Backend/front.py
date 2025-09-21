import streamlit as st
import time
import json
import os
from datetime import datetime
import google.genai as genai
from transformers import pipeline

# =========================
# Setup
# =========================
GEMINI_API_KEY = "AIzaSyBwN8EYpgtvnG-Cb7AGquw1JBSd9RpPang" 
gemini_client = genai.Client(api_key=GEMINI_API_KEY)

HISTORY_FILE = "history.json"
COUNSELOR_TAB_LINK = "https://yourwebsite.com/#counsellor"

# Crisis keywords
CRISIS_KEYWORDS = [
    "suicide", "kill myself", "end life", "self-harm",
    "overdose", "die", "dying", "cut myself"
]

# Emotion model
emotion_clf = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=None
)
NEG_EMOTIONS = {"sadness", "anger", "fear", "disgust"}
NEG_KEYWORDS = ["sad", "tired", "hopeless", "depressed", "lonely", "unhappy", "down"]

# PHQ-9 questions
wellbeing_questions = [
    "1. In the last 2 weeks, did you feel less happy in things you usually enjoy?",
    "2. Have you been feeling sad, low, or without hope?",
    "3. How has your sleep been — do you find it hard to sleep, wake up often, or sleep too much?",
    "4. Do you often feel very tired or without energy?",
    "5. Has your eating changed — eating too little or eating too much?",
    "6. Do you sometimes feel you are not good enough, or that you let yourself or your family down?",
    "7. Do you find it hard to focus on simple things like reading, studying, or watching TV?",
    "8. Have you or others noticed that you are moving or speaking slower than usual — or very restless and can’t sit still?",
    "9. Have you had thoughts that life is not worth living, or that you want to hurt yourself?"
]

response_feedback = {
    0: "😊 Thanks for sharing! Sounds like things are pretty calm for now.",
    1: "🧐 Got it. Let's keep an eye on that, okay?",
    2: "😔 Thanks for being honest. That sounds like that's been bothering you a great deal.",
    3: "😓 Oh, I hear you. That must be so hard to deal with so often."
}

# =========================
# Utils
# =========================
def load_history():
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, "r") as f:
            return json.load(f)
    return {"phq9": [], "emotions": []}

def save_history(history):
    with open(HISTORY_FILE, "w") as f:
        json.dump(history, f, indent=2)

def analyze_emotion(text, threshold=0.5):
    out = emotion_clf(text)[0]
    ml_negative, label, score = False, None, 0

    if isinstance(out, list):
        for o in out:
            if o["label"].lower() in NEG_EMOTIONS and o["score"] >= threshold:
                ml_negative, label, score = True, o["label"], o["score"]
                break
    else:
        if out["label"].lower() in NEG_EMOTIONS and out["score"] >= threshold:
            ml_negative, label, score = True, out["label"], out["score"]

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

def query_gemini(user_message):
    try:
        response = gemini_client.models.generate_content(
            model="gemini-1.5-flash",
            contents=user_message
        )
        return response.text
    except Exception as e:
        return f"[API Error] {e}"

def check_for_crisis(user_message):
    text = user_message.lower()
    for word in CRISIS_KEYWORDS:
        if word in text:
            return (
                "⚠️ I hear your pain, and this feels very serious. "
                "💙 Please don’t go through this alone.\n"
                f"👉 You can connect with a counselor here: {COUNSELOR_TAB_LINK}"
            )
    return None

def interpret_phq9_score(total_score, last_q):
    if last_q > 0:
        return (
            "⚠ Critical Alert: You reported thoughts of self-harm or that you'd be better off dead.\n"
            "Please seek immediate help: reach out to a mental health professional, emergency services, or someone you trust right away."
        )
    if 0 <= total_score <= 4:
        return "I suggest some open strategies: daily walks, journaling, or catching up with friends."
    elif 5 <= total_score <= 9:
        return "Try mindfulness apps, chatting with a friend, or setting small daily goals."
    elif 10 <= total_score <= 14:
        return "You may need to talk to a counselor. Meanwhile, use guided meditation or a structured routine."
    elif 15 <= total_score <= 19:
        return "You are going through a tough time. Consider crisis helplines or online therapy platforms."
    elif 20 <= total_score <= 27:
        return "Immediate professional support is necessary. You can book an online appointment with a counselor."
    return "Invalid score range."

# =========================
# Streamlit UI
# =========================
st.set_page_config(page_title="Mann Mitrr", page_icon="💙", layout="wide")
st.title("💙 Mann Mitrr – Your Friend & Tracker")

choice = st.sidebar.radio("Go to", ["🤖 Chatbot", "📝 PHQ-9 Test", "📊 Tracker"])

# =========================
# Chatbot
# =========================
if choice == "🤖 Chatbot":
    st.subheader("Chat with Mann Mitrr")

    if "chat_history" not in st.session_state:
        st.session_state.chat_history = [
            {"role": "assistant", "text": "Hey, I’m Mann Mitrr, your friend 😊 What’s on your mind?"}
        ]

    for msg in st.session_state.chat_history:
        st.chat_message(msg["role"]).write(msg["text"])

    if prompt := st.chat_input("Type your message..."):
        st.session_state.chat_history.append({"role": "user", "text": prompt})
        st.chat_message("user").write(prompt)

        reply = None
        crisis_alert = check_for_crisis(prompt)
        if crisis_alert:
            reply = crisis_alert
        else:
            if analyze_emotion(prompt):
                reply = "I sense you might be feeling a little low... That’s completely okay 💙 If you'd like, you can also try the PHQ-9 well-being check from the sidebar."
            else:
                reply = query_gemini(prompt)

        st.session_state.chat_history.append({"role": "assistant", "text": reply})
        st.chat_message("assistant").write(reply)

# =========================
# PHQ-9 Test
# =========================
if choice == "📝 PHQ-9 Test":
    st.subheader("📝 PHQ-9 Well-being Check")
    history = load_history()

    if "phq9_answers" not in st.session_state:
        st.session_state.phq9_answers = {}

    with st.form("phq9_form"):
        total_score, last_q = 0, 0
        for idx, q in enumerate(wellbeing_questions):
            st.markdown(q)
            ans = st.radio(
                f"Your answer to Q{idx+1}",
                [0, 1, 2, 3],
                format_func=lambda x: f"{x} - {['Not at all','Several days','More than half the days','Nearly every day'][x]}",
                key=f"phq9_q{idx}"
            )
            total_score += ans
            if idx == 8:
                last_q = ans
            st.info(response_feedback[ans])

        submitted = st.form_submit_button("Submit PHQ-9")
        if submitted:
            st.success(f"✅ Your PHQ-9 score: {total_score}/27")
            st.warning("📌 Recommendation: " + interpret_phq9_score(total_score, last_q))

            history["phq9"].append({
                "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "score": total_score,
                "q9": last_q
            })
            save_history(history)

# =========================
# Tracker
# =========================
if choice == "📊 Tracker":
    st.subheader("📊 Your Emotional & PHQ-9 History")

    history = load_history()

    if not history["emotions"] and not history["phq9"]:
        st.info("No history available yet. Chat or take a PHQ-9 test to get started!")
    else:
        if history["emotions"]:
            st.markdown("### 😶 Emotion Log")
            st.dataframe(history["emotions"])

        if history["phq9"]:
            st.markdown("### 📝 PHQ-9 Scores")
            st.dataframe(history["phq9"])
