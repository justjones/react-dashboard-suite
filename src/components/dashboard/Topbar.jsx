export default function Topbar({ theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <div className="topbar__left">
        <h1 className="topbar__title">Dashboard</h1>
        <p className="topbar__subtitle">Switch views using the sidebar</p>
      </div>

      <div className="topbar__right">
        <button className="themeBtn" type="button" onClick={onToggleTheme}>
          {theme === "dark" ? "Light" : "Dark"}
        </button>

        <input className="topbar__search" placeholder="Search…" />
        <div className="topbar__avatar" title="Profile">
          LJ
        </div>
      </div>
    </header>
  );
}