// pages/CopingStrategies.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const strategies = [
  { id: "stress-management", title: "🌬️ Stress Management" },
  { id: "grounding", title: "🌎 Grounding Techniques" },
  { id: "journaling", title: "📖 Journaling & Reflection" },
  { id: "distractions", title: "🎨 Healthy Distractions" },
  { id: "affirmations", title: "💬 Positive Affirmations" },
  { id: "time-management", title: "📅 Time Management" },
  { id: "social", title: "🤝 Social Connection" },
  { id: "emotional-regulation", title: "🧠 Emotional Regulation" },
  { id: "physical", title: "💪 Physical Well-being" },
  { id: "crisis", title: "🚨 Crisis Coping" },
];

export default function CopingStrategies() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 
                      p-8 text-white pt-24">
        {/* ✅ Added pt-24 to push content below navbar */}
        <h1 className="text-4xl font-bold text-center mb-8">
          🌱 Stressease Coping Strategies
        </h1>
        <p className="text-center max-w-2xl mx-auto mb-10 text-lg text-white/90">
          Explore practical coping strategies to improve your mental health. 
          Click on any option to learn more in detail.
        </p>

        {/* Grid of coping strategies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((s) => (
            <Link
              to={`/coping-strategies/${s.id}`}
              key={s.id}
              className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-lg 
                        hover:bg-white/30 transition transform hover:-translate-y-2"
            >
              <h2 className="text-2xl font-semibold">{s.title}</h2>
              <p className="text-sm text-white/80 mt-2">Click to explore</p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
