import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">Student Panel</h2>
      <nav className="space-y-4">
        <Link to="/student/chatbot" className="block hover:text-yellow-300">💬 Chatbot</Link>
        <Link to="/student/sleep" className="block hover:text-yellow-300">😴 Sleep Tracker</Link>
        <Link to="/student/resources" className="block hover:text-yellow-300">📚 Resources</Link>
        <Link to="/student/book" className="block hover:text-yellow-300">📅 Book Counsellor</Link>
      </nav>
    </div>
  );
}
