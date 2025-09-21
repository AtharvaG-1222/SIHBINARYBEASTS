import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white bg-opacity-20 backdrop-blur-md shadow-inner py-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 text-center text-white">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MindEase – Your Mental Health Companion 🌿
        </p>
      </div>
    </footer>
  );
}
