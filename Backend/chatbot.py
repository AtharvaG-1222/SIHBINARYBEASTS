import time
import sys
import google.genai as genai
from emotions import analyze_emotion
from phq9 import take_phq9_test

GEMINI_API_KEY = "AIzaSyBQYrH_GrFTSmX3R3xg0hleOoaV4Gj7m-c" 
gemini_client = genai.Client(api_key=GEMINI_API_KEY)

COUNSELOR_TAB_LINK = "https://yourwebsite.com/#counsellor"

CRISIS_KEYWORDS = [
    "suicide", "kill myself", "end life", "self-harm",
    "overdose", "die", "dying", "cut myself"
]

EXIT_KEYWORDS = {"exit", "quit", "bye", "goodbye", "cya", "ttyl"}

def type_text_slowly(text, delay=0.035):
    for letter in text:
        sys.stdout.write(letter)
        sys.stdout.flush()
        time.sleep(delay)
    print()

def query_gemini(user_message, retries=3, delay=2):
    for attempt in range(retries):
        try:
            response = gemini_client.models.generate_content(
                model="gemini-1.5-flash",
                contents=user_message
            )
            return response.text
        except Exception as e:
            time.sleep(delay)
    return "Mann Mitrr: I'm having trouble connecting right now. Let's try again later."

def check_for_crisis(user_message):
    text = user_message.lower()
    for word in CRISIS_KEYWORDS:
        if word in text:
            return (
                "⚠️ I hear your pain, and this feels very serious. 💙\n"
                f"👉 You can connect with a counselor here: {COUNSELOR_TAB_LINK}"
            )
    return None

def run_chatbot():
    type_text_slowly("Mann Mitrr: Hey, I’m Mann Mitrr, your friend 😊 What’s on your mind?")
    while True:
        user_message = input("You: ").strip()
        
        if any(user_message.lower().startswith(word) for word in EXIT_KEYWORDS):
            gemini_response = query_gemini(user_message)
            type_text_slowly(f"Mann Mitrr: {gemini_response}")
            break

        crisis_alert = check_for_crisis(user_message)
        if crisis_alert:
            type_text_slowly(crisis_alert)
            continue

        user_feeling_low = analyze_emotion(user_message)
        if user_feeling_low:
            type_text_slowly("I sense you might be feeling low 💙. Would you like to do a gentle well-being check? (yes/no)")
            response = input("You: ").strip().lower()
            if response in {"yes", "y"}:
                total, interp = take_phq9_test()
                type_text_slowly(f"Your PHQ-9 score: {total}")
                type_text_slowly(f"Interpretation: {interp}")
            else:
                type_text_slowly("No problem! I'm here to chat anytime 🌸")
            continue

        gemini_response = query_gemini(user_message)
        type_text_slowly(f"Mann Mitrr: {gemini_response}")

if __name__ == "__main__":
    run_chatbot()
