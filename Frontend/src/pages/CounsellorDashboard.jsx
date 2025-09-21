import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// 🔹 Supabase client
const supabase = createClient(
  "https://ivozrjchveblnxjnmvaq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2b3pyamNodmVibG54am5tdmFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MDUzMTIsImV4cCI6MjA3Mjk4MTMxMn0.QbXHuLgGXBFvdpz6-CgIoiQWEO0pD7L_bKG84Uk8pUo"
);

export default function CounsellorDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from("book_counsellor")
        .select("*")
        .order("date", { ascending: true });

      if (error) console.error("❌ Fetch error:", error.message);
      else setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex flex-col">
      {/* Navbar */}
      <header className="bg-purple-700 text-white px-8 py-4 shadow-md sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">🧑‍⚕️ Counsellor Dashboard</h1>
        <button className="bg-white text-purple-700 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition">
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 📅 Upcoming Appointments */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-semibold mb-4 text-purple-700">
              📅 Upcoming Appointments
            </h2>

            {bookings.length === 0 ? (
              <p className="text-gray-500 italic">No bookings yet</p>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition bg-purple-50"
                  >
                    <p className="text-sm text-gray-600">
                      {new Date(b.date).toLocaleString()}
                    </p>
                    <p className="font-semibold text-gray-800">
                      {b.revealIdentity
                        ? `${b.fullname} (${b.email})`
                        : "Anonymous"}
                    </p>
                    <p className="text-gray-700">
                      Concern: <span className="font-medium">{b.concern}</span>
                    </p>
                    <span
                      className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                        b.urgency === "High"
                          ? "bg-red-100 text-red-600"
                          : b.urgency === "Medium"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {b.urgency} Priority
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 💬 Messages Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-semibold mb-4 text-purple-700">
              💬 Messages
            </h2>
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-xl shadow-sm">
                <p className="font-medium text-gray-800">Student A</p>
                <p className="text-gray-600 text-sm">
                  "I am feeling anxious, can we talk?"
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl shadow-sm">
                <p className="font-medium text-gray-800">Student B</p>
                <p className="text-gray-600 text-sm">
                  "Thanks for the last session, I’m feeling better."
                </p>
              </div>
              <p className="text-gray-500 italic text-sm">+ More messages coming...</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-purple-700 text-white text-center py-3 text-sm shadow-inner">
        © {new Date().getFullYear()} Mann Mitra – Counsellor Panel
      </footer>
    </div>
  );
}
