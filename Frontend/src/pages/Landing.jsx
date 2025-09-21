import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Landing() {
  const navigate = useNavigate();
  const particlesRef = useRef(null);

  const handleRoleSelect = (role) => navigate(`/auth/${role}`);

  // Floating leaf/particle effect
  useEffect(() => {
    const canvas = particlesRef.current;
    const ctx = canvas.getContext("2d");
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    const leaves = [];

    for (let i = 0; i < 40; i++) {
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 10 + Math.random() * 20,
        speed: 0.2 + Math.random() * 0.5,
        angle: Math.random() * 2 * Math.PI,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      leaves.forEach((leaf) => {
        leaf.y += leaf.speed;
        leaf.x += Math.sin(leaf.angle) * 0.5;
        leaf.angle += 0.01;

        if (leaf.y > height) leaf.y = -leaf.size;
        if (leaf.x > width) leaf.x = 0;
        if (leaf.x < 0) leaf.x = width;

        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.beginPath();
        ctx.arc(leaf.x, leaf.y, leaf.size / 2, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />

      {/* Nature background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-75"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
        }}
      ></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800/40 via-transparent to-green-700/40 animate-gradient"></div>

      {/* Floating particles */}
      <canvas
        ref={particlesRef}
        className="absolute inset-0 z-10 pointer-events-none"
      ></canvas>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fadeIn bg-clip-text text-transparent bg-gradient-to-r from-green-200 via-yellow-300 to-pink-300 drop-shadow-lg">
          Welcome to MANN MITRA
        </h1>

        <p className="text-lg md:text-xl mb-12 animate-fadeIn delay-200 max-w-xl opacity-90">
          Digital Mental Health & Psychological Support for Students
        </p>

        <div className="flex flex-col md:flex-row gap-6 animate-fadeIn delay-400">
          {["student", "admin", "counsellor"].map((role) => (
            <div
              key={role}
              onClick={() => handleRoleSelect(role)}
              className="cursor-pointer bg-white bg-opacity-20 backdrop-blur-md hover:bg-opacity-50 transition-all duration-500 rounded-xl p-8 w-64 shadow-lg hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 border border-white/30"
            >
              <h2 className="text-2xl font-semibold capitalize mb-2">{role}</h2>
              <p className="text-sm opacity-80">
                Click here to{" "}
                {role === "student"
                  ? "login/signup as Student"
                  : role === "admin"
                  ? "login as Admin"
                  : "login as Counsellor"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Anonymous Section */}
      <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-6 animate-fadeIn delay-600 relative z-20 px-4">
        <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl p-8 shadow-lg max-w-lg text-center 
                  transition-transform transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:animate-float cursor-pointer border border-gray-200/40">
          <img
            src="https://img.icons8.com/ios-filled/100/000000/anonymous-mask.png"
            alt="Anonymous Icon"
            className="mx-auto mb-4 w-16 h-16 animate-pulse"
          />
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            100% Anonymous
          </h2>
          <p className="text-gray-600">
            Your identity stays hidden from admins and counsellors until you
            choose to schedule a session. Safe, private, and stigma-free
            support!
          </p>
        </div>
      </div>

      <footer className="mt-20 text-white text-sm opacity-80 text-center relative z-20 animate-fadeUp delay-800">
        &copy; 2025 MANN MITRA - Your Mental Health Companion
      </footer>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-fadeIn { animation: fadeIn 1s ease forwards; }
          .animate-fadeUp { animation: fadeUp 1.2s ease forwards; }
          .animate-float { animation: float 3s ease-in-out infinite; }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientShift 12s ease infinite;
          }
          .delay-200 { animation-delay: 0.2s; }
          .delay-400 { animation-delay: 0.4s; }
          .delay-600 { animation-delay: 0.6s; }
          .delay-800 { animation-delay: 0.8s; }
        `}
      </style>
    </div>
  );
}
