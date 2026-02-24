import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";


export default function DashboardLayout({ theme, onToggleTheme }) {
  return (
    <div className="dash">
      <Sidebar />
      <div className="dash__main">
        <Topbar theme={theme} onToggleTheme={onToggleTheme} />
        <div className="dash__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}