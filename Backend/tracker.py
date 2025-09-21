# tracker.py
import json
import os
from datetime import datetime
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

HISTORY_FILE = "./history.json"

def load_history():
    """Load history from JSON file."""
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, "r") as f:
            return json.load(f)
    return {"phq9": [], "emotions": []}

def plot_phq9(history):
    """Plot PHQ-9 score trend."""
    if not history.get("phq9"):
        print("No PHQ-9 data available.")
        return

    df = pd.DataFrame(history["phq9"])
    if "date" not in df or "score" not in df:
        print("PHQ-9 data missing required fields.")
        return

    df["date"] = pd.to_datetime(df["date"])

    plt.figure(figsize=(8, 5))
    plt.plot(df["date"], df["score"], marker="o", linestyle="-", label="PHQ-9 Score")
    plt.axhline(y=4, color="green", linestyle="--", label="Minimal")
    plt.axhline(y=9, color="blue", linestyle="--", label="Mild")
    plt.axhline(y=14, color="orange", linestyle="--", label="Moderate")
    plt.axhline(y=19, color="red", linestyle="--", label="Moderately Severe")
    plt.axhline(y=27, color="black", linestyle="--", label="Severe")

    plt.title("PHQ-9 Score Trend")
    plt.xlabel("Date")
    plt.ylabel("Score")
    plt.legend()
    plt.tight_layout()
    plt.show()

def plot_emotions(history):
    """Plot emotion intensity heatmap."""
    if not history.get("emotions"):
        print("No emotion data available.")
        return

    df = pd.DataFrame(history["emotions"])
    print("DEBUG: Emotions DataFrame Columns ->", df.columns.tolist())

    # Normalize column names
    if "emotion" not in df.columns:
        if "type" in df.columns:
            df.rename(columns={"type": "emotion"}, inplace=True)
        elif "emotion_name" in df.columns:
            df.rename(columns={"emotion_name": "emotion"}, inplace=True)
        else:
            print("Could not find an 'emotion' column in emotions data.")
            print(df.head())
            return

    if "score" not in df.columns:
        if "intensity" in df.columns:
            df.rename(columns={"intensity": "score"}, inplace=True)
        else:
            print("Could not find a 'score' column in emotions data.")
            print(df.head())
            return

    if "date" not in df.columns:
        print("No 'date' column found in emotions data.")
        print(df.head())
        return

    # Convert dates
    df["date"] = pd.to_datetime(df["date"])

    # Pivot table for heatmap
    pivot = df.pivot_table(index="emotion", columns="date", values="score", fill_value=0)

    plt.figure(figsize=(12, 6))
    sns.heatmap(pivot, cmap="coolwarm", annot=False, cbar=True)
    plt.title("Emotion Intensity Over Time")
    plt.xlabel("Date")
    plt.ylabel("Emotion")
    plt.tight_layout()
    plt.show()

def show_plots():
    history = load_history()
    plot_phq9(history)
    plot_emotions(history)

if __name__ == "__main__":
    show_plots()
