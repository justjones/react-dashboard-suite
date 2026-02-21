export default function MiniLineChart({ data, height = 160, padding = 12 }) {
  // data: [{ label: "Mon", value: 10 }, ...]
  const width = 520; // internal SVG width (scales via viewBox)

  const values = data.map((d) => d.value);
  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const range = maxV - minV || 1;

  const innerW = width - padding * 2;
  const innerH = height - padding * 2;

  const xStep = innerW / Math.max(1, data.length - 1);

  const pts = data.map((d, i) => {
    const x = padding + i * xStep;
    const y = padding + (1 - (d.value - minV) / range) * innerH;
    return { x, y };
  });

  const lineD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD =
    `${lineD} L ${padding + innerW} ${padding + innerH} L ${padding} ${padding + innerH} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="chartSvg" role="img" aria-label="Line chart">
      {/* subtle grid */}
      <g className="chartGridLines">
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={padding}
            x2={padding + innerW}
            y1={padding + innerH * t}
            y2={padding + innerH * t}
          />
        ))}
      </g>

      {/* area + line */}
      <path d={areaD} className="chartArea" />
      <path d={lineD} className="chartLine" />

      {/* last point */}
      {pts.length ? <circle cx={pts.at(-1).x} cy={pts.at(-1).y} r="3.5" className="chartDot" /> : null}
    </svg>
  );
}