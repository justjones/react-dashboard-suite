import Skeleton from "../ui/Skeleton.jsx";

export function StatCardSkeleton() {
  return (
    <div className="card card--in">
      <Skeleton className="skel skel--line" />
      <div style={{ height: 10 }} />
      <Skeleton className="skel skel--cardValue" />
      <div style={{ height: 10 }} />
      <Skeleton className="skel skel--line" />
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="tableWrap">
      <div
        className="tableSkel"
        style={{ "--skel-cols": cols }}
      >
        {Array.from({ length: rows }).map((_, r) => (
          <div className="tableSkel__row" key={r}>
            {Array.from({ length: cols }).map((__, c) => (
              <Skeleton
                className="skel skel--line tableSkel__cell"
                key={c}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}