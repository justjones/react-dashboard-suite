import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Landing from "./pages/Landing.jsx";
import QADashboard from "./pages/QADashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import PortfolioDashboard from "./pages/PortfolioDashboard.jsx";
import DashboardLayout from "./components/dashboard/DashboardLayout.jsx";

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <div data-theme={theme}>
      <Routes>
         <Route path="/" element={<Landing />} />

        <Route
          path="/dashboard"
          element={<DashboardLayout theme={theme} onToggleTheme={toggleTheme} />}
        >
          <Route index element={<Navigate to="qa" replace />} />
          <Route path="qa" element={<QADashboard />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="portfolio" element={<PortfolioDashboard />} />
          
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}