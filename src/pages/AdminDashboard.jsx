import { useState } from "react";
import StatCard from "../components/dashboard/StatCard.jsx";
import DataTable from "../components/dashboard/DataTable.jsx";
import Badge from "../components/dashboard/Badge.jsx";
import { adminStats, recentActivity, topAccounts } from "../data/adminData.js";
import MiniLineChart from "../components/dashboard/charts/MiniLineChart.jsx";
import DonutChart from "../components/dashboard/charts/DonutChart.jsx";
import { revenueTrend, trafficSources } from "../data/adminCharts.js";
import sortRows from "../utils/sortRows.js";



export default function AdminDashboard() {
  // Sorting state: activity
  const [activitySortKey, setActivitySortKey] = useState("time");
  const [activitySortDir, setActivitySortDir] = useState("desc");

  // Sorting state: accounts
  const [acctSortKey, setAcctSortKey] = useState("mrr");
  const [acctSortDir, setAcctSortDir] = useState("desc");

  const activityCols = [
    { key: "time", header: "Time", align: "right" },
    { key: "action", header: "Action" },
    { key: "detail", header: "Detail" },
    { key: "owner", header: "Owner" },
  ];

  const accountCols = [
    { key: "name", header: "Account" },
    { key: "plan", header: "Plan", align: "center" },
    { key: "mrr", header: "MRR", align: "right" },
    { key: "renew", header: "Renew", align: "right" },
    {
      key: "health",
      header: "Health",
      align: "center",
      // Sortable by raw health text; we can custom-order later if you want
      render: (r) => <Badge tone={r.healthTone}>{r.health}</Badge>,
    },
  ];

  const sortedActivity = sortRows(recentActivity, activitySortKey, activitySortDir);
  const sortedAccounts = sortRows(topAccounts, acctSortKey, acctSortDir);

  function handleActivitySort(key) {
    if (key === activitySortKey) setActivitySortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setActivitySortKey(key);
      setActivitySortDir("asc");
    }
  }

  function handleAccountSort(key) {
    if (key === acctSortKey) setAcctSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setAcctSortKey(key);
      setAcctSortDir("asc");
    }
  }

  return (
    <div className="page">
      <h2 className="page__title">Admin Analytics</h2>

      <div className="grid grid--stats">
        {adminStats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} helper={s.helper} />
        ))}
      </div>

      <div className="grid grid--admin">
        <section className="panel">
          <h3 className="panel__title">KPIs Overview</h3>

          <div className="chartGrid">
            <div className="chartBox">
  <div className="chartBox__title">Revenue Trend</div>
  <div className="chartBox__inner">
    <MiniLineChart data={revenueTrend} />
  </div>
</div>

            <div className="chartBox">
  <div className="chartBox__title">Traffic Sources</div>
  <div className="chartBox__inner">
    <DonutChart items={trafficSources} />
  </div>
</div>
          </div>
        </section>

        <section className="panel">
          <h3 className="panel__title">Recent Activity</h3>
          <DataTable
            columns={activityCols}
            rows={sortedActivity}
            sortKey={activitySortKey}
            sortDir={activitySortDir}
            onSort={handleActivitySort}
          />
        </section>

        <section className="panel">
          <h3 className="panel__title">Top Accounts</h3>
          <DataTable
            columns={accountCols}
            rows={sortedAccounts}
            sortKey={acctSortKey}
            sortDir={acctSortDir}
            onSort={handleAccountSort}
          />
        </section>
      </div>
    </div>
  );
}