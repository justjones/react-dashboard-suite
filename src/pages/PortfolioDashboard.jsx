import { useState } from "react";
import StatCard from "../components/dashboard/StatCard.jsx";
import DataTable from "../components/dashboard/DataTable.jsx";
import Badge from "../components/dashboard/Badge.jsx";
import { portfolioStats, skills, projects, goals } from "../data/portfolioData.js";

/* ---------- Copy Links Button ---------- */
function CopyIconButton({ url }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      console.error("Clipboard failed");
    }
  }

  return (
    <button
      type="button"
      className="iconBtn"
      onClick={handleCopy}
      aria-label="Copy link"
      title={copied ? "Copied" : "Copy link"}
    >
      {copied ? (
        <span className="iconBtn__check">✓</span>
      ) : (
        <svg
          className="iconBtn__svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {/* copy icon */}
          <path
            d="M9 9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V9Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
function CopyLinksButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = `
LinkedIn: https://www.linkedin.com/in/lori-jonessqa/
GitHub: https://github.com/justjones
    `.trim();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Clipboard failed");
    }
  }

  return (
    <button
      type="button"
      className="btn btn--ghost"
      onClick={handleCopy}
    >
      {copied ? "Copied ✓" : "Copy LinkedIn / GitHub"}
    </button>
  );
}

/* ---------- Portfolio Dashboard ---------- */
export default function PortfolioDashboard() {
  const [projFilter, setProjFilter] = useState("All");

  const projectCols = [
    { key: "name", header: "Project" },
    { key: "stack", header: "Stack" },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (r) => <Badge tone={r.statusTone}>{r.status}</Badge>,
    },
    { key: "highlight", header: "Highlight" },
  ];

  const skillsCols = [
    { key: "skill", header: "Skill" },
    {
      key: "level",
      header: "Level",
      align: "center",
      render: (r) => <Badge tone={r.tone}>{r.level}</Badge>,
    },
  ];

  const goalsCols = [
    { key: "goal", header: "Goal" },
    { key: "owner", header: "Owner" },
    {
      key: "state",
      header: "State",
      align: "center",
      render: (r) => <Badge tone={r.tone}>{r.state}</Badge>,
    },
  ];

  const filteredProjects =
    projFilter === "All"
      ? projects
      : projects.filter((p) => p.status === projFilter);

  return (
    <div className="page">
      <h2 className="page__title">Portfolio Dashboard</h2>

      <div className="grid grid--stats">
        {portfolioStats.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            helper={s.helper}
          />
        ))}
      </div>

      <div className="grid grid--two">
        <section className="panel">
          <h3 className="panel__title">Projects</h3>

          <div className="chips">
            {["All", "Active", "In Progress"].map((label) => (
              <button
                key={label}
                type="button"
                className={"chip" + (projFilter === label ? " chip--active" : "")}
                onClick={() => setProjFilter(label)}
              >
                {label}
              </button>
            ))}
          </div>

          <DataTable columns={projectCols} rows={filteredProjects} />
        </section>

        <section className="panel">
          <h3 className="panel__title">Skills Snapshot</h3>
          <DataTable columns={skillsCols} rows={skills} />
        </section>

        <section className="panel">
          <h3 className="panel__title">Next Goals</h3>
          <DataTable columns={goalsCols} rows={goals} />
        </section>

        <section className="panel">
          <h3 className="panel__title">About</h3>

          <p className="aboutText">
            Manual QA Engineer transitioning into automation + frontend. This dashboard suite is a
            portfolio project showcasing reusable UI architecture, data tables, sorting/filtering,
            theming, and lightweight SVG charts.
          </p>

          <div className="aboutActions">
  <a
    className="btn"
    href="#"
    onClick={(e) => e.preventDefault()}
  >
    Download Resume
  </a>

  <div className="linkGroup">
    <a
      className="btn btn--ghost"
      href="https://www.linkedin.com/in/lori-jonessqa/"
      target="_blank"
      rel="noreferrer"
    >
      View LinkedIn
    </a>

    <CopyIconButton url="https://www.linkedin.com/in/lori-jonessqa/" />
  </div>

  <div className="linkGroup">
    <a
      className="btn btn--ghost"
      href="https://github.com/justjones"
      target="_blank"
      rel="noreferrer"
    >
      View GitHub
    </a>

    <CopyIconButton url="https://github.com/justjones" />
  </div>
</div>
        </section>
      </div>
    </div>
  );
}