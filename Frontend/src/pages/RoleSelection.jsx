import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-12 text-gray-800">Welcome to MindCare</h1>

      {/* Role Selection Buttons */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Student */}
        <button
          onClick={() => navigate("/auth/student")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          Student
        </button>

        {/* Admin */}
        <button
          onClick={() => navigate("/auth/admin")}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          Admin
        </button>

        {/* Counsellor */}
        <button
          onClick={() => navigate("/auth/counsellor")}
          className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          Counsellor
        </button>
      </div>
    </div>
  );
}
