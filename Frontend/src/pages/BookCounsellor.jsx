// BookCounsellor.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { createClient } from "@supabase/supabase-js";

// 🔹 Supabase client
const supabase = createClient(
  "https://ivozrjchveblnxjnmvaq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2b3pyamNodmVibG54am5tdmFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MDUzMTIsImV4cCI6MjA3Mjk4MTMxMn0.QbXHuLgGXBFvdpz6-CgIoiQWEO0pD7L_bKG84Uk8pUo"
);

const BookCounsellor = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    age: "",
    gender: "",
    email: "",
    date: "",
    concern: "",
    urgency: "Medium",
    pastExperience: "No",
    notes: "",
    revealIdentity: false,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("book_counsellor").insert([formData]);

    if (error) {
      console.error("❌ Error:", error.message);
      setMessage("❌ Something went wrong while booking!");
    } else {
      setMessage("✅ Counsellor booking request submitted!");
      setFormData({
        fullname: "",
        age: "",
        gender: "",
        email: "",
        date: "",
        concern: "",
        urgency: "Medium",
        pastExperience: "No",
        notes: "",
        revealIdentity: false,
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="relative h-screen flex flex-col bg-black text-white pt-[80px]">
        {/* 🌌 Cosmic background */}
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
              />
            ))}
          </div>
        </div>

        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-black/70 backdrop-blur-md py-6 border-b border-white/20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
              📅 Book a Counsellor
            </h1>
            <p className="mt-2 text-lg md:text-xl text-white/80">
              Fill the form below to request a session
            </p>
          </div>
        </div>

        {/* Booking Card */}
        <div className="relative z-10 flex-1 flex justify-center items-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-gradient-to-br from-black/40 via-black/20 to-black/30 
                          backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-6">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3 text-black">
              {/* Full Name */}
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                className="p-3 rounded-2xl bg-white/20 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />

              {/* Age & Gender */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  className="p-3 rounded-2xl bg-white/20 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="p-3 rounded-2xl bg-white/20 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 rounded-2xl bg-white/20 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />

              {/* Preferred Date */}
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="p-3 rounded-2xl bg-white/20 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />

              {/* Primary Concern */}
              <textarea
                name="concern"
                placeholder="Describe your primary concern..."
                value={formData.concern}
                onChange={handleChange}
                className="p-3 rounded-2xl bg-white/20 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                rows="2"
                required
              />

              {/* Urgency & Past Experience */}
              <div className="grid grid-cols-2 gap-3">
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="p-3 rounded-2xl bg-white/20 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <select
                  name="pastExperience"
                  value={formData.pastExperience}
                  onChange={handleChange}
                  className="p-3 rounded-2xl bg-white/20 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="No">No past experience</option>
                  <option value="Yes">Yes, I had counselling before</option>
                </select>
              </div>

              {/* Notes */}
              <textarea
                name="notes"
                placeholder="Additional notes (optional)"
                value={formData.notes}
                onChange={handleChange}
                className="p-3 rounded-2xl bg-white/20 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                rows="1"
              ></textarea>

              {/* Reveal Identity */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="revealIdentity"
                  checked={formData.revealIdentity}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <label className="text-white text-sm">
                  I want to reveal my identity to the counsellor
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-green-400 to-cyan-500 hover:from-green-500 hover:to-cyan-600 py-3 rounded-2xl font-semibold transition shadow-lg disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Booking"}
              </button>
            </form>

            {/* Status Message */}
            {message && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/20 text-white px-6 py-3 rounded-xl shadow-md text-center max-w-md">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookCounsellor;
