import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/dashboard/DashboardLayout.jsx";
import QADashboard from "./pages/QADashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import PortfolioDashboard from "./pages/PortfolioDashboard.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard/qa" replace />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="qa" element={<QADashboard />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="portfolio" element={<PortfolioDashboard />} />
      </Route>
    </Routes>
  );
}