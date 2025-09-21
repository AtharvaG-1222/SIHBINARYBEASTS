import json
import os
from datetime import datetime

HISTORY_FILE_PATH = "./history.json"

wellbeing_questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading the newspaper or watching television",
    "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
    "Thoughts that you would be better off dead or of hurting yourself in some way"
]

response_feedback = {
    0: "Thanks for sharing! Sounds like things are calm for now.",
    1: "Got it. Let's keep an eye on that, okay?",
    2: "Thanks for being honest. That must be bothering you a lot.",
    3: "I hear you. That must be really hard to deal with."
}

def load_history_file():
    if os.path.exists(HISTORY_FILE_PATH):
        try:
            with open(HISTORY_FILE_PATH, "r") as f:
                return json.load(f)
        except Exception:
            return {"phq9": [], "emotions": []}
    return {"phq9": [], "emotions": []}

def save_history_file(history_data):
    os.makedirs(os.path.dirname(HISTORY_FILE_PATH), exist_ok=True)
    with open(HISTORY_FILE_PATH, "w") as f:
        json.dump(history_data, f, indent=2)

def interpret_phq9_score(total_score, last_question_answer):
    try:
        total_score = int(total_score)
        last_question_answer = int(last_question_answer)
    except ValueError:
        return "Error: Score and last answer must be numbers.", None

    recommendation = {"message": "", "url": ""}

    if last_question_answer > 0:
        interpretation = (
            "⚠ Critical Alert: You reported thoughts of self-harm or that you'd be better off dead.\n"
            "Please seek immediate help: reach out to a mental health professional, emergency services, or someone you trust right away."
        )
        recommendation["message"] = "You should contact a counselor immediately."
        recommendation["url"] = "http://localhost:3000/book-counsellor"
        return interpretation, recommendation

    if 0 <= total_score <= 4:
        interpretation = "It seems you’re doing fairly well. You might just need small daily self-care practices."
        recommendation["message"] = "Try some coping strategies like journaling, light exercise, or mindfulness."
        recommendation["url"] = "https://yourwebsite.com/coping-strategies"
    elif 5 <= total_score <= 9:
        interpretation = "You may be experiencing mild symptoms. Keep an eye on your mood and self-care habits."
        recommendation["message"] = "Guided mindfulness exercises or chatting with friends may help."
        recommendation["url"] = "http://localhost:3000/coping-strategies"
    elif 10 <= total_score <= 14:
        interpretation = "Moderate symptoms detected. Talking to a counselor could be beneficial."
        recommendation["message"] = "Consider scheduling a counseling session or using structured routines and guided meditation."
        recommendation["url"] = "https://yourwebsite.com/book-counselor"
    elif 15 <= total_score <= 19:
        interpretation = "You are experiencing moderately severe symptoms. Professional support is recommended."
        recommendation["message"] = "Reach out to online therapy platforms or crisis helplines."
        recommendation["url"] = "http://localhost:3000/book-counsellor"
    elif 20 <= total_score <= 27:
        interpretation = "Severe symptoms detected. Immediate professional support is necessary."
        recommendation["message"] = "Please book a session with a counselor or therapist as soon as possible."
        recommendation["url"] = "http://localhost:3000/book-counsellor"
    else:
        interpretation = "Invalid score range. Please check your inputs."
        recommendation = None

    return interpretation, recommendation

def take_phq9_test(answers=None):
    history_data = load_history_file()
    total_score = 0
    last_question_score = 0

    if answers is None:
        # CLI interactive mode
        print("\nPHQ-9 scoring scale: Reply with a number 0–3 for each question "
              "(0 = Not at all, 1 = Several days, 2 = More than half the days, 3 = Nearly every day)\n")
        answers = []
        for idx, question in enumerate(wellbeing_questions):
            print(f"{idx+1}. {question}")
            while True:
                try:
                    ans = int(input("Your answer (0-3): ").strip())
                    if ans in (0, 1, 2, 3):
                        break
                    print("⚠ Please answer with a number 0–3.")
                except ValueError:
                    print("⚠ Please enter a valid number 0–3.")
            print("Bot:", response_feedback.get(ans, "Thanks for your response."))
            answers.append(ans)

    if not isinstance(answers, list) or len(answers) != 9 or not all(isinstance(a, int) and 0 <= a <= 3 for a in answers):
        return 0, "Error: Please provide a list of 9 integer answers (each 0–3).", None

    for idx, answer_value in enumerate(answers):
        total_score += int(answer_value)
        if idx == 8:
            last_question_score = int(answer_value)

    interpretation, recommendation = interpret_phq9_score(total_score, last_question_score)

    history_data["phq9"].append({
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "score": total_score,
        "q9": last_question_score,
        "interpretation": interpretation,
        "recommendation": recommendation
    })
    save_history_file(history_data)

    return total_score, interpretation, recommendation
