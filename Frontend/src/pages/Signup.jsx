import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Signup = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[70vh]">
        <form className="bg-white p-8 rounded-2xl shadow-lg w-80">
          <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 mb-4 border rounded"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded"
          />

          {/* Submit Button */}
          <button className="w-full bg-yellow-400 text-black py-2 rounded">
            Signup
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
