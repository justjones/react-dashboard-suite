import { useState, useEffect } from "react";
import StatCard from "../components/dashboard/StatCard.jsx";
import Badge from "../components/dashboard/Badge.jsx";
import DataTable from "../components/dashboard/DataTable.jsx";
import { StatCardSkeleton, TableSkeleton } from "../components/dashboard/LoadingBlocks.jsx";
import { qaStats, qaSuites, qaDefects } from "../data/qaData.js";
import sortRows from "../utils/sortRows.js";





export default function QADashboard() {
  // Suites sorting
  const [suiteSortKey, setSuiteSortKey] = useState("suite");
  const [suiteSortDir, setSuiteSortDir] = useState("asc");

  // Defects sorting + filtering
  const [defectSortKey, setDefectSortKey] = useState("key");
  const [defectSortDir, setDefectSortDir] = useState("asc");
  const [defectFilter, setDefectFilter] = useState("All");
  const [defectSearch, setDefectSearch] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  // Column defs
  const suiteCols = [
    { key: "suite", header: "Suite" },
    { key: "env", header: "Env" },
    { key: "build", header: "Build", align: "right" },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (r) => <Badge tone={r.statusTone}>{r.status}</Badge>,
    },
  ];

  const defectCols = [
    { key: "key", header: "Key" },
    { key: "title", header: "Title" },
    {
      key: "severity",
      header: "Severity",
      align: "center",
      render: (r) => <Badge tone={r.sevTone}>{r.severity}</Badge>,
    },
    { key: "owner", header: "Owner" },
    { key: "state", header: "State" },
  ];

  // Custom sort priority maps
  const suiteOrderMap = {
    status: { FAIL: 0, WARN: 1, PASS: 2 },
  };

  const defectOrderMap = {
    severity: { High: 0, Medium: 1, Low: 2 },
  };

  // Filter defects first
  const filteredDefects = qaDefects
    .filter((d) => (defectFilter === "All" ? true : d.state === defectFilter))
    .filter((d) => {
      const q = defectSearch.trim().toLowerCase();
      if (!q) return true;

      const haystack = [
        d.key,
        d.title,
        d.owner,
        d.state,
        d.severity,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });

  // Sort after filtering
  const sortedSuites = sortRows(qaSuites, suiteSortKey, suiteSortDir, suiteOrderMap);
  const sortedDefects = sortRows(filteredDefects, defectSortKey, defectSortDir, defectOrderMap);

  // Sort handlers
  function handleSuiteSort(key) {
    if (key === suiteSortKey) setSuiteSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSuiteSortKey(key);
      setSuiteSortDir("asc");
    }
  }

  function handleDefectSort(key) {
    if (key === defectSortKey) setDefectSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setDefectSortKey(key);
      setDefectSortDir("asc");
    }
  }

  return (
    <div className="page">
      <h2 className="page__title">QA Test Execution</h2>

      <div className="grid grid--stats">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          : qaStats.map((s) => (
            <StatCard key={s.label} label={s.label} value={s.value} helper={s.helper} />
          ))}
      </div>

      <div className="grid grid--two">
        <section className="panel">
          <h3 className="panel__title">Test Suites</h3>
          {loading ? (
            <TableSkeleton rows={5} cols={4} />
          ) : (
            <DataTable
              columns={suiteCols}
              rows={sortedSuites}
              sortKey={suiteSortKey}
              sortDir={suiteSortDir}
              onSort={handleSuiteSort}
            />
          )}
        </section>

        <section className="panel">
          <h3 className="panel__title">Defects</h3>
          <div className="panelSearchWrap">
            <input
              className="panelSearch"
              value={defectSearch}
              onChange={(e) => setDefectSearch(e.target.value)}
              placeholder="Search defects (key, title, owner, state)…"
            />

            {defectSearch && (
              <button
                type="button"
                className="panelSearchClear"
                onClick={() => setDefectSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className="chips">
            {["All", "Open", "In QA", "Triaged"].map((label) => (
              <button
                key={label}
                type="button"
                className={"chip" + (defectFilter === label ? " chip--active" : "")}
                onClick={() => setDefectFilter(label)}
              >
                {label}
              </button>
            ))}
          </div>

          {loading ? (
            <TableSkeleton rows={6} cols={5} />
          ) : (
            <DataTable
              columns={defectCols}
              rows={sortedDefects}
              sortKey={defectSortKey}
              sortDir={defectSortDir}
              onSort={handleDefectSort}
            />
          )}
        </section>
      </div>
    </div>
  );
}