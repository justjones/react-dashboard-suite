
function sortRows(rows, key, dir, customOrderMap = null) {
  const order = customOrderMap?.[key];

  const sorted = [...rows].sort((a, b) => {
    const av = a[key];
    const bv = b[key];

    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;

    // custom ordering (e.g., severity/status)
    if (order) {
      const ai = order[String(av)] ?? Number.MAX_SAFE_INTEGER;
      const bi = order[String(bv)] ?? Number.MAX_SAFE_INTEGER;
      return ai - bi;
    }

    if (typeof av === "number" && typeof bv === "number") return av - bv;

    return String(av).localeCompare(String(bv), undefined, { numeric: true });
  });

  return dir === "asc" ? sorted : sorted.reverse();
}

export default sortRows;


