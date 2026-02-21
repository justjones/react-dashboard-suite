import "../../styles/tables.css";

export default function DataTable({
  columns,
  rows,
  sortKey,
  sortDir,
  onSort,
}) {
  const isSortable = typeof onSort === "function";

  return (
    <div className="tableWrap">
      <table className="table">
        <thead>
          <tr>
            {columns.map((c) => {
              const active = isSortable && sortKey === c.key;
              const clickable = isSortable && c.sortable !== false; // default sortable

              return (
                <th
                  key={c.key}
                  className={[
                    clickable ? "thSort" : "",
                    c.align ? `cell--${c.align}` : "",
                  ].join(" ").trim() || undefined}
                  onClick={() => clickable && onSort(c.key)}
                  title={clickable ? "Click to sort" : undefined}
                >
                  <span className="thSort__inner">
                    {c.header}
                    {active ? (
                      <span className="thSort__arrow">
                        {sortDir === "asc" ? "▲" : "▼"}
                      </span>
                    ) : null}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {rows.map((r, idx) => (
            <tr key={r.id ?? idx}>
              {columns.map((c) => (
                <td key={c.key}
                className={c.align ? `cell--${c.align}` : undefined}
                >
                  {typeof c.render === "function" ? c.render(r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}