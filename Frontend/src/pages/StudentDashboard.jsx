import React from "react";
import { Link } from "react-router-dom";
import BackgroundWrapper from "../components/BackgroundWrapper";

export default function StudentDashboard() {
  const sections = [
    { title: "😴 Sleep & Mood Tracker", desc: "Track your sleep and emotions daily to understand patterns." },
    { title: "💬 Mann Mitra", desc: "Talk with our friendly AI chatbot whenever you feel low." },
    { title: "🌱 Coping Strategies", desc: "Practical relaxation and stress-management techniques." },
    { title: "📖 Psychoeducation Resources", desc: "Learn about mental health through videos & guides." },
    { title: "📅 Book a Counsellor", desc: "Schedule private sessions with professional counsellors." },
    { title: "📈 Growth Journey", desc: "Visualize your emotional journey with calming heat maps." },
  ];

  return (
    <BackgroundWrapper>
      <div className="min-h-screen p-8 text-white">
        {/* 🌟 Welcome Section */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold">Welcome Back, Student</h1>
          <p className="mt-3 text-lg text-gray-200">
            You’re doing amazing! Take it one step at a time.
          </p>
        </div>

        {/* 🌿 Daily Quote */}
        <div className="bg-gradient-to-r from-green-300/30 to-blue-300/30 backdrop-blur-lg
                        p-6 rounded-2xl shadow-lg mb-12 text-center max-w-2xl mx-auto animate-fadeIn">
          <p className="italic text-lg">
            “Every day may not be good… but there’s something good in every day.”
          </p>
        </div>

        {/* 🌸 Dashboard Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((sec, idx) => {
            const commonClass = `p-8 rounded-2xl shadow-lg transition-all duration-500
                                 transform hover:-translate-y-2 hover:shadow-2xl animate-fadeIn
                                 bg-white/20 backdrop-blur-lg text-gray-200`;

            if (sec.title.includes("Sleep & Mood Tracker")) {
              return (
                <Link to="/sleep-mood-tracker" key={idx}>
                  <div className={commonClass} style={{ animationDelay: `${idx * 0.2}s` }}>
                    <h2 className="text-2xl font-semibold mb-3">{sec.title}</h2>
                    <p className="text-gray-200 text-sm">{sec.desc}</p>
                  </div>
                </Link>
              );
            }

            if (sec.title.includes("Book a Counsellor")) {
              return (
                <Link to="/book-counsellor" key={idx}>
                  <div className={commonClass} style={{ animationDelay: `${idx * 0.2}s` }}>
                    <h2 className="text-2xl font-semibold mb-3">{sec.title}</h2>
                    <p className="text-gray-200 text-sm">{sec.desc}</p>
                  </div>
                </Link>
              );
            }

            if (sec.title.includes("Coping Strategies")) {
              return (
                <Link to="/coping-strategies" key={idx}>
                  <div className={commonClass} style={{ animationDelay: `${idx * 0.2}s` }}>
                    <h2 className="text-2xl font-semibold mb-3">{sec.title}</h2>
                    <p className="text-gray-200 text-sm">{sec.desc}</p>
                  </div>
                </Link>
              );
            }

            if (sec.title.includes("Mann Mitra")) {
              return (
                <Link to="/chatbot" key={idx}>
                  <div className={commonClass} style={{ animationDelay: `${idx * 0.2}s` }}>
                    <h2 className="text-2xl font-semibold mb-3">{sec.title}</h2>
                    <p className="text-gray-200 text-sm">{sec.desc}</p>
                  </div>
                </Link>
              );
            }

            return (
              <div key={idx} className={commonClass} style={{ animationDelay: `${idx * 0.2}s` }}>
                <h2 className="text-2xl font-semibold mb-3">{sec.title}</h2>
                <p className="text-gray-200 text-sm">{sec.desc}</p>
              </div>
            );
          })}
        </div>

        {/* 🌿 Footer */}
        <footer className="mt-16 text-center text-gray-300 text-sm">
          &copy; 2025 Mann Mitra – Your Mental Health Companion 🌿
        </footer>

        {/* 🎨 Animations */}
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
              animation: fadeIn 1s ease forwards;
            }
          `}
        </style>
      </div>
    </BackgroundWrapper>
  );
}
