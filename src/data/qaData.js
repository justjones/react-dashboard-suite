export const qaStats = [
  { label: "Passed", value: "12", helper: "Last run" },
  { label: "Failed", value: "3", helper: "Last run" },
  { label: "Skipped", value: "1", helper: "Last run" },
  { label: "Fail Rate", value: "18.3%", helper: "7-day avg" },
];

export const qaSuites = [
  { id: 1, suite: "Login Tests", env: "staging", build: "03.17.2026", status: "PASS", statusTone: "good" },
  { id: 2, suite: "Checkout Tests", env: "staging", build: "03.17.2026", status: "FAIL", statusTone: "bad" },
  { id: 3, suite: "Search Tests", env: "prod", build: "03.16.2026", status: "PASS", statusTone: "good" },
  { id: 4, suite: "Profile Tests", env: "prod", build: "03.16.2026", status: "WARN", statusTone: "warn" },
];

export const qaDefects = [
  { id: 1, key: "BUG-100", title: "Checkout button disabled", severity: "High", sevTone: "bad", owner: "J. Smith", state: "Open" },
  { id: 2, key: "BUG-101", title: "Login error message overlaps", severity: "Medium", sevTone: "warn", owner: "L. Jones", state: "In QA" },
  { id: 3, key: "BUG-102", title: "Search results duplicate items", severity: "Low", sevTone: "good", owner: "A. Patel", state: "Triaged" },
];