// AuthForm.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("student");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // ✅ Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
            ...(role === "student" && { age, gender }),
          },
        },
      });
      if (error) throw error;
      setMessage("🎉 Signup successful! Check your email for verification.");
      setIsFlipped(false);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;

      const userRole = user?.user_metadata?.role || "student";
      setMessage(`✅ Login successful as ${userRole}! Redirecting...`);

      setTimeout(() => {
        if (userRole === "admin") {
          navigate("/admin");
        } else if (userRole === "counsellor") {
          navigate("/counsellor");
        } else {
          navigate("/student");
        }
      }, 1000);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex flex-col bg-black text-white pt-[80px]">
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
              ></span>
            ))}
          </div>
        </div>

        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-black/70 backdrop-blur-md py-6 border-b border-white/20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
              Mann Mitra Portal
            </h1>
            <p className="mt-2 text-lg md:text-xl text-white/80">
              Login / Signup to continue
            </p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
          <div
            className={`relative w-[360px] h-[500px] transition-transform duration-700 transform-style-preserve-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            {/* Login Side */}
            <form
              onSubmit={handleLogin}
              className="absolute w-full h-full bg-gradient-to-br from-black/40 via-black/20 to-black/30 
                         backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 
                         flex flex-col justify-center text-center backface-hidden"
            >
              <h2 className="text-3xl font-bold mb-6 text-white w-full break-words">
                🔐 Login
              </h2>
              <input
                type="email"
                placeholder="Email"
                className="p-3 mb-4 rounded-2xl bg-black/40 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="p-3 mb-6 rounded-2xl bg-black/40 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 py-3 rounded-2xl font-semibold transition shadow-lg disabled:opacity-50"
              >
                {loading ? "Loading..." : "Login"}
              </button>
              <p
                className="mt-4 text-sm text-white cursor-pointer hover:underline"
                onClick={() => setIsFlipped(true)}
              >
                Don’t have an account? Signup
              </p>
            </form>

            {/* Signup Side */}
            <form
              onSubmit={handleSignup}
              className="absolute w-full h-full bg-gradient-to-br from-black/40 via-black/20 to-black/30 
                         backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 
                         flex flex-col justify-center text-center rotate-y-180 backface-hidden"
            >
              {/* ✅ Fixed Signup Title */}
              <h2 className="text-3xl font-bold mb-6 text-white w-full break-words">
                🌱 Signup
              </h2>
              <input
                type="text"
                placeholder="Full Name"
                className="p-3 mb-4 rounded-2xl bg-black/40 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />

              {role === "student" && (
                <>
                  <input
                    type="number"
                    placeholder="Age"
                    className="p-3 mb-4 rounded-2xl bg-black/40 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                  <select
                    className="p-3 mb-4 rounded-2xl bg-black/40 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </>
              )}

              <input
                type="email"
                placeholder="Email"
                className="p-3 mb-4 rounded-2xl bg-black/40 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="p-3 mb-4 rounded-2xl bg-black/40 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="p-3 mb-6 rounded-2xl bg-black/40 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="counsellor">Counsellor</option>
              </select>

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-green-400 to-cyan-500 hover:from-green-500 hover:to-cyan-600 py-3 rounded-2xl font-semibold transition shadow-lg disabled:opacity-50"
              >
                {loading ? "Loading..." : "Signup"}
              </button>
              <p
                className="mt-4 text-sm text-white cursor-pointer hover:underline"
                onClick={() => setIsFlipped(false)}
              >
                Already have an account? Login
              </p>
            </form>
          </div>

          {/* 📝 Status Message */}
          {message && (
            <div className="mt-6 bg-white/20 text-white px-6 py-3 rounded-xl shadow-md text-center max-w-md">
              {message}
            </div>
          )}
        </div>
      </div>

      {/* 🔮 Extra styles */}
      <style>
        {`
          .transform-style-preserve-3d { transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
        `}
      </style>
    </>
  );
};

export default AuthForm;
