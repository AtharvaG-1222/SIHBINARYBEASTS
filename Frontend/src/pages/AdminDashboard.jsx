import React from "react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-green-600 text-white px-8 py-4 shadow-md sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">🛠 Admin Dashboard</h1>
        <button className="bg-white text-green-700 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition">
          Logout
        </button>
      </header>

      {/* Dashboard Content */}
      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Student Data */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <h2 className="text-xl font-semibold mb-3 text-green-700">👥 Student Data</h2>
            <p className="text-gray-600">View and monitor student mental health stats with detailed analytics.</p>
            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              View Details
            </button>
          </div>

          {/* Counsellor Management */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <h2 className="text-xl font-semibold mb-3 text-green-700">🧑‍⚕️ Counsellor Management</h2>
            <p className="text-gray-600">Add, update, or remove counsellors and manage their appointments.</p>
            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Manage
            </button>
          </div>

          {/* Resources Management */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <h2 className="text-xl font-semibold mb-3 text-green-700">📚 Resources Management</h2>
            <p className="text-gray-600">Upload, edit, or remove educational and self-help resources.</p>
            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Update Resources
            </button>
          </div>

          {/* Reports */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <h2 className="text-xl font-semibold mb-3 text-green-700">📊 Reports</h2>
            <p className="text-gray-600">Generate custom reports and track mental health trends over time.</p>
            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Generate Report
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-600 text-white text-center py-3 text-sm shadow-inner">
        © {new Date().getFullYear()} Mann Mitra – Admin Panel
      </footer>
    </div>
  );
}
