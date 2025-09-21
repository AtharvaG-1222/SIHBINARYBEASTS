// pages/CopingDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const strategyDetails = {
  "stress-management": {
    title: "🌬️ Stress Management",
    content: [
      "Practice deep breathing: Inhale 4s, hold 4s, exhale 6s.",
      "Progressive muscle relaxation: Tense and release muscles systematically.",
      "Mindfulness meditation: Observe thoughts without judgment for 10-15 minutes daily.",
      "Short walks or stretching to release physical tension.",
      "Listen to calming music or nature sounds to reduce cortisol levels.",
    ],
  },
  "grounding": {
    title: "🌎 Grounding Techniques",
    content: [
      "5-4-3-2-1 method: Identify 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.",
      "Visualization: Picture a peaceful place in detail.",
      "Use tactile objects like stress balls or textured fabrics to stay present.",
      "Focus on physical sensations like your feet on the ground or your breath.",
    ],
  },
  "journaling": {
    title: "📖 Journaling & Reflection",
    content: [
      "Maintain a gratitude journal: List 3 things daily that you’re grateful for.",
      "Emotion tracking: Write down triggers, reactions, and solutions.",
      "Reflect on accomplishments and challenges to improve self-awareness.",
      "Set goals and track progress weekly to boost motivation.",
    ],
  },
  "distractions": {
    title: "🎨 Healthy Distractions",
    content: [
      "Engage in hobbies: Drawing, painting, writing, or music.",
      "Physical activity: Exercise, stretching, dancing, or yoga.",
      "Mind games: Puzzles, crosswords, or brain teasers.",
      "Watch educational or uplifting content to shift focus positively.",
    ],
  },
  "affirmations": {
    title: "💬 Positive Affirmations",
    content: [
      "Repeat empowering statements daily: 'I am capable of overcoming challenges.'",
      "Use present tense: 'I am calm and focused.'",
      "Write affirmations on sticky notes where you’ll see them often.",
      "Combine affirmations with deep breathing or visualization for stronger effect.",
    ],
  },
  "time-management": {
    title: "📅 Time Management",
    content: [
      "Break tasks into smaller, actionable steps.",
      "Use the Pomodoro technique: 25 minutes work, 5 minutes break.",
      "Prioritize tasks: Focus on high-impact tasks first.",
      "Schedule self-care breaks to avoid burnout.",
      "Reflect weekly: Adjust plan based on what worked and what didn’t.",
    ],
  },
  "social": {
    title: "🤝 Social Connection",
    content: [
      "Talk to trusted friends, family, or mentors about your feelings.",
      "Join support groups or online communities with similar experiences.",
      "Plan regular social activities, even short virtual calls help.",
      "Express gratitude and appreciation to strengthen bonds.",
    ],
  },
  "emotional-regulation": {
    title: "🧠 Emotional Regulation",
    content: [
      "Reframe negative thoughts using CBT techniques: Challenge irrational beliefs.",
      "Pause and count to 10 before responding to triggers.",
      "Practice journaling to identify patterns in emotional reactions.",
      "Use calming techniques: Breathwork, meditation, or short walks.",
    ],
  },
  "physical": {
    title: "💪 Physical Well-being",
    content: [
      "Ensure 7-9 hours of sleep per night for mental clarity.",
      "Stay hydrated and maintain balanced nutrition.",
      "Include daily physical activity: walking, stretching, or workouts.",
      "Limit caffeine, alcohol, and excessive screen time.",
      "Practice good posture and ergonomic workspace habits.",
    ],
  },
  "crisis": {
    title: "🚨 Crisis Coping",
    content: [
      "If in immediate danger, contact local emergency services.",
      "Reach out to trusted friends, family, or crisis hotlines.",
      "Use grounding techniques to regain calm: deep breathing, sensory focus.",
      "Engage in short distraction activities: listen to music, draw, or walk.",
      "Create a personal safety plan: safe places, contacts, and coping steps.",
    ],
  },
};

export default function CopingDetail() {
  const { id } = useParams();
  const strategy = strategyDetails[id];

  if (!strategy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-600 text-center font-bold">
        Strategy not found 🚫
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="relative h-screen flex flex-col bg-black text-white pt-[80px] p-6">
        {/* Cosmic particles background */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-black/80">
            {[...Array(80)].map((_, i) => (
              <span
                key={i}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random(),
                  animationDuration: `${Math.random() * 5 + 3}s`,
                }}
              ></span>
            ))}
          </div>
        </div>

        {/* Content Card */}
        <div className="relative z-10 max-w-3xl mx-auto bg-gradient-to-br from-black/40 via-black/20 to-black/30 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{strategy.title}</h1>
          <ul className="list-disc pl-6 space-y-3 text-white/90 text-base md:text-lg">
            {strategy.content.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>

          <div className="mt-6">
            <Link
              to="/coping-strategies"
              className="inline-block text-yellow-300 font-semibold hover:underline"
            >
              ⬅ Back to all strategies
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          .animate-pulse { animation: pulse 4s infinite ease-in-out; }
        `}</style>
      </div>
    </>
  );
}
