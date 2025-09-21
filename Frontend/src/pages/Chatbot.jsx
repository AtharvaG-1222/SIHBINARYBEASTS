import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { Send } from "lucide-react";

const API_BASE = process.env.REACT_APP_API_BASE || "http://127.0.0.1:5000";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi there! I'm your Mann Mitra. How are you feeling today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState("");
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // 🌌 Pre-generate dots once so they don’t move
  const dots = useRef(
    [...Array(80)].map(() => ({
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random(),
    }))
  );

  // Auto scroll
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typingMessage]);

  // Keep input focused
  useEffect(() => {
    inputRef.current?.focus();
  }, [messages, typingMessage]);

  const typeMessage = (fullText) => {
    let index = 0;
    setTypingMessage("");
    const interval = setInterval(() => {
      setTypingMessage((prev) => prev + fullText[index]);
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        setMessages((m) => [...m, { sender: "bot", text: fullText }]);
        setTypingMessage("");
      }
    }, 30);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((m) => [...m, { sender: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();

      typeMessage(data.reply);

      if (data.crisis) {
        typeMessage(
          "⚠️ If you're in danger, please contact local emergency services or a trusted person immediately."
        );
      }
    } catch (err) {
      console.error("Chat error:", err);
      typeMessage("Sorry — something went wrong. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative h-screen flex flex-col bg-black text-white pt-[80px]">
        {/* 🌌 Cosmic particles background */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-black/80">
            {dots.current.map((style, i) => (
              <span
                key={i}
                className="absolute bg-white rounded-full"
                style={style}
              ></span>
            ))}
          </div>
        </div>

        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-black/70 backdrop-blur-md py-6 border-b border-white/20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
              Mann Mitra Chatbot
            </h1>
            <p className="mt-2 text-lg md:text-xl text-white/80">
              Your safe space to talk and share
            </p>
          </div>
        </div>

        {/* Chat container */}
        <div className="relative z-10 flex-1 flex justify-center p-4 overflow-hidden">
          <div
            className="w-full max-w-3xl flex flex-col gap-3 p-4 rounded-3xl 
                        bg-gradient-to-br from-black/40 via-black/20 to-black/30 
                        backdrop-blur-xl border border-white/20 shadow-2xl 
                        overflow-y-auto"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-lg 
                              bg-white/20 backdrop-blur-lg text-gray-100 text-base 
                              animate-fadeIn break-words`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {typingMessage && (
              <div className="flex justify-start">
                <div className="max-w-[75%] px-4 py-2 rounded-2xl shadow-lg bg-white/10 backdrop-blur-lg text-gray-100 text-base animate-pulse break-words">
                  {typingMessage}
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="z-10 flex items-center gap-3 p-3 mx-6 mb-4
                        bg-black/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-2xl border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100 placeholder-gray-400 bg-black/30"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 p-3 rounded-2xl transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={22} className="text-white" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }
      `}</style>
    </>
  );
}
