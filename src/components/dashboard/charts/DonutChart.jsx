export default function DonutChart({ items, size = 160, stroke = 18 }) {
  // items: [{ label: "Organic", value: 42 }, ...] value = percent-ish or weights
  const total = items.reduce((sum, it) => sum + it.value, 0) || 1;

  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  let offset = 0;

  return (
    <div className="donutWrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="chartSvg" role="img" aria-label="Donut chart">
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {items.map((it, idx) => {
            const frac = it.value / total;
            const dash = frac * c;
            const seg = (
              <circle
                key={it.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                strokeWidth={stroke}
                strokeDasharray={`${dash} ${c - dash}`}
                strokeDashoffset={-offset}
                className={`donutSeg donutSeg--${idx}`}
                strokeLinecap="butt"
              />
            );
            offset += dash;
            return seg;
          })}
        </g>

        <circle cx={size / 2} cy={size / 2} r={r - stroke / 2} className="donutHole" />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="donutText">
          {Math.round((items[0]?.value / total) * 100)}%
        </text>
      </svg>

      <div className="donutLegend">
        {items.map((it, idx) => (
          <div key={it.label} className="donutLegend__row">
            <span className={`donutLegend__swatch donutLegend__swatch--${idx}`} />
            <span className="donutLegend__label">{it.label}</span>
            <span className="donutLegend__val">{Math.round((it.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}