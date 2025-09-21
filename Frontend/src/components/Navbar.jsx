import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="w-full bg-white bg-opacity-20 backdrop-blur-md fixed top-0 left-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-center items-center relative">
        {/* Back Button (left of logo) */}
        {location.pathname !== "/" && (
          <button
            onClick={() => navigate(-1)}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 p-3 rounded-full shadow-2xl text-white transition-all duration-300 flex items-center justify-center animate-pulse"
            title="Go Back"
          >
            <ArrowLeft size={24} />
          </button>
        )}

        {/* Logo */}
        <div className="text-2xl font-bold text-purple-700 animate-pulse">
          MANN MITRA
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 text-white absolute right-6">
          <Link
            to="/"
            className="hover:text-yellow-300 transition duration-300 font-semibold"
          >
            Home
          </Link>
          <a
            href="#features"
            className="hover:text-yellow-300 transition duration-300 font-semibold"
          >
            Features
          </a>
          <a
            href="#about"
            className="hover:text-yellow-300 transition duration-300 font-semibold"
          >
            About
          </a>
          <a
            href="#contact"
            className="hover:text-yellow-300 transition duration-300 font-semibold"
          >
            Contact
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden text-white absolute right-6">
          <button className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
