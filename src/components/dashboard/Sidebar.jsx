import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  "sidebar__link" + (isActive ? " sidebar__link--active" : "");

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">DashSuite</div>

      <nav className="sidebar__nav">
        <NavLink to="/dashboard/admin" className={linkClass}>
          Admin Analytics
        </NavLink>
        <NavLink to="/dashboard/qa" className={linkClass}>
          QA Execution
        </NavLink>
        <NavLink to="/dashboard/portfolio" className={linkClass}>
          Portfolio
        </NavLink>
      </nav>

      <div className="sidebar__footer">
        <small>React + CSS</small>
      </div>
    </aside>
  );
}