import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import "../../styles/dashboard.css";

export default function DashboardLayout() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <div className="dash" data-theme={theme}>
      <Sidebar />
      <div className="dash__main">
        <Topbar theme={theme} onToggleTheme={toggleTheme} />
        <div className="dash__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}