from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from chatbot import query_gemini, check_for_crisis
from emotions import analyze_emotion
from phq9 import wellbeing_questions, interpret_phq9_score, take_phq9_test

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

user_states = {}

@app.post("/chat")
async def chat_endpoint(request: Request):
    data = await request.json()
    user_message = data.get("message", "").strip()
    user_id = data.get("user_id", "default")

    state = user_states.get(user_id, {})

    if state.get("mode") == "phq9":
        try:
            answer = int(user_message)
        except ValueError:
            return {"reply": "⚠️ Please answer with a number 0–3 (0 = Not at all, 3 = Nearly every day).", "crisis": False}

        if answer < 0 or answer > 3:
            return {"reply": "⚠️ Please answer with a number between 0 and 3.", "crisis": False}

        state["answers"].append(answer)
        state["index"] += 1

        if state["index"] < len(wellbeing_questions):
            q = wellbeing_questions[state["index"]]
            user_states[user_id] = state
            return {
                "reply": f"{state['index']+1}. {q}",
                "crisis": False
            }
        else:
            total, interp, rec = take_phq9_test(state["answers"])
            user_states[user_id] = {}
            reply_msg = f"Your PHQ-9 score: {total}\n{interp}"
            if rec:
                reply_msg += f"\n\n{rec['message']}\nMore info: {rec['url']}"
            return {"reply": reply_msg, "crisis": False}

    if check_for_crisis(user_message):
        return {
            "reply": "⚠️ It sounds like you might be in crisis. Please reach out immediately.",
            "crisis": True
        }

    if state.get("mode") == "awaiting_confirm":
        if user_message.lower() in ("yes", "y"):
            user_states[user_id] = {"mode": "phq9", "index": 0, "answers": []}
            first_q = wellbeing_questions[0]
            return {
                "reply": (
                    "PHQ-9 scoring scale: Reply with a number 0–3 for each question "
                    "(0 = Not at all, 1 = Several days, 2 = More than half the days, 3 = Nearly every day)\n\n"
                    f"1. {first_q}"
                ),
                "crisis": False
            }
        else:
            user_states[user_id] = {}
            return {"reply": "No problem! We can chat normally. Tell me more about how you're feeling.", "crisis": False}

    if analyze_emotion(user_message):
        user_states[user_id] = {"mode": "awaiting_confirm"}
        return {
            "reply": (
                "I'm here for you.\n"
                "It sounds like things might be tough right now.\n"
                "Would you like me to gently guide you through a short well-being check (PHQ-9)?\n"
                "Just reply 'yes' to begin or 'no' to skip."
            ),
            "crisis": False
        }

    bot_reply = query_gemini(user_message)
    return {"reply": bot_reply, "crisis": False}


@app.post("/phq9")
async def phq9_endpoint(request: Request):
    data = await request.json()
    answers = data.get("answers", [])

    total_score, interp, rec = take_phq9_test(answers)
    reply_msg = f"Your PHQ-9 score: {total_score}\n{interp}"
    if rec:
        reply_msg += f"\n\n{rec['message']}\nMore info: {rec['url']}"

    return {
        "score": total_score,
        "interpretation": interp,
        "recommendation": rec,
        "reply": reply_msg
    }
