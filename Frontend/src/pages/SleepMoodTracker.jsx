// pages/SleepMoodTracker.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function SleepMoodTracker() {
  const [sleepData, setSleepData] = useState({
    date: new Date().toISOString().split("T")[0],
    sleepTime: "",
    wakeUpTime: "",
    sleepQuality: 5,
  });

  const [moodData, setMoodData] = useState({
    date: new Date().toISOString().split("T")[0],
    mood: "Happy",
    energyLevel: 5,
    notes: "",
  });

  const handleSleepChange = (e) => {
    const { name, value } = e.target;
    setSleepData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMoodChange = (e) => {
    const { name, value } = e.target;
    setMoodData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `✅ Sleep Entry:\nDate: ${sleepData.date}\nSleep: ${sleepData.sleepTime} - ${sleepData.wakeUpTime}\nQuality: ${sleepData.sleepQuality}/10\n\n` +
      `✅ Mood Entry:\nDate: ${moodData.date}\nMood: ${moodData.mood}\nEnergy: ${moodData.energyLevel}/10\nNotes: ${moodData.notes}`
    );
  };

  // Function to get slider color based on value
  const getSliderColor = (value) => {
    if (value <= 3) return "red";
    if (value <= 7) return "yellow";
    return "green";
  };

  return (
    <>
      <Navbar />
      <div className="relative h-screen flex flex-col bg-black text-white pt-[80px]">
        {/* Cosmic background */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-black/80">
            {[...Array(60)].map((_, i) => (
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

        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/70 backdrop-blur-md py-6 border-b border-white/20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
              Sleep & Mood Tracker
            </h1>
            <p className="mt-2 text-lg md:text-xl text-white/80">
              Track your daily sleep and mood patterns
            </p>
          </div>
        </div>

        {/* Tracker Container */}
        <div className="relative z-10 flex-1 flex justify-center p-4 overflow-auto">
          <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 p-6 rounded-3xl 
                          bg-gradient-to-br from-black/40 via-black/20 to-black/30 
                          backdrop-blur-xl border border-white/20 shadow-2xl">

            {/* Left: Sleep Tracker */}
            <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">🌙 Sleep Tracking</h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={sleepData.date}
                    onChange={handleSleepChange}
                    className="w-full p-3 rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-green-400 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm">Sleep Time</label>
                    <input
                      type="time"
                      name="sleepTime"
                      value={sleepData.sleepTime}
                      onChange={handleSleepChange}
                      className="w-full p-3 rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-green-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Wake-up Time</label>
                    <input
                      type="time"
                      name="wakeUpTime"
                      value={sleepData.wakeUpTime}
                      onChange={handleSleepChange}
                      className="w-full p-3 rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-green-400 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm">
                    Sleep Quality: {sleepData.sleepQuality}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    name="sleepQuality"
                    value={sleepData.sleepQuality}
                    onChange={handleSleepChange}
                    className="w-full"
                    style={{ accentColor: getSliderColor(sleepData.sleepQuality) }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Mood Tracker */}
            <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-6">💛 Mood Tracking</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={moodData.date}
                      onChange={handleMoodChange}
                      className="w-full p-3 rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-green-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Mood</label>
                    <select
                      name="mood"
                      value={moodData.mood}
                      onChange={handleMoodChange}
                      className="w-full p-3 rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-green-400 outline-none"
                    >
                      <option>Happy</option>
                      <option>Neutral</option>
                      <option>Sad</option>
                      <option>Anxious</option>
                      <option>Stressed</option>
                      <option>Excited</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">
                      Energy Level: {moodData.energyLevel}/10
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      name="energyLevel"
                      value={moodData.energyLevel}
                      onChange={handleMoodChange}
                      className="w-full"
                      style={{ accentColor: getSliderColor(moodData.energyLevel) }}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Add anything about your day</label>
                    <textarea
                      name="notes"
                      value={moodData.notes}
                      onChange={handleMoodChange}
                      placeholder="Write your thoughts..."
                      rows="3"
                      className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="z-10 flex justify-center mt-6 mb-6">
          <button
            onClick={handleSubmit}
            className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 font-semibold shadow-lg transition-all"
          >
            Save Sleep & Mood
          </button>
        </div>
      </div>

      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
