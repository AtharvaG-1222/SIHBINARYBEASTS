import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Login() {
  const { role } = useParams(); // get role from URL
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you can validate credentials (mock for now)
    if (role === "student") navigate("/student");
    else if (role === "admin") navigate("/admin");
    else if (role === "counsellor") navigate("/counsellor");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 capitalize">{role} Login</h1>

      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 w-80"
      >
        <input
          type="text"
          placeholder={`${role} ID`}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
