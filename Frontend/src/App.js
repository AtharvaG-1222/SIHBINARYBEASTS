import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import AuthForm from "./pages/AuthForm";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CounsellorDashboard from "./pages/CounsellorDashboard";
import BookCounsellor from "./pages/BookCounsellor"; 
import CopingStrategies from "./pages/CopingStrategies";
import CopingDetail from "./pages/CopingDetail";
import Chatbot from "./pages/Chatbot";
import SleepMoodTracker from "./pages/SleepMoodTracker"; // ✅ Import Sleep & Mood Tracker

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} /> {/* Landing page */}
        <Route path="/auth/:role" element={<AuthForm />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/counsellor" element={<CounsellorDashboard />} />
        <Route path="/book-counsellor" element={<BookCounsellor />} /> 
        <Route path="/coping-strategies" element={<CopingStrategies />} />
        <Route path="/coping-strategies/:id" element={<CopingDetail />} />
        <Route path="/chatbot" element={<Chatbot />} /> 
        <Route path="/sleep-mood-tracker" element={<SleepMoodTracker />} /> {/* ✅ New route */}
      </Routes>
    </Router>
  );
}

export default App;
