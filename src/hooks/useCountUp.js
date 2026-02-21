import { useEffect, useMemo, useState } from "react";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function useCountUp(rawValue, durationMs = 700) {
  // Detect percent like "18.3%"
  const isPercent =
    typeof rawValue === "string" && rawValue.trim().endsWith("%");

  const parsed = useMemo(() => {
    const str = String(rawValue).trim();
    const clean = isPercent ? str.slice(0, -1) : str;
    const num = Number(clean);
    return Number.isFinite(num) ? num : null;
  }, [rawValue, isPercent]);

  const decimals = useMemo(() => {
    if (parsed == null) return 0;
    const s = String(
      isPercent ? String(rawValue).trim().slice(0, -1) : rawValue,
    );
    const dot = s.indexOf(".");
    return dot >= 0 ? clamp(s.length - dot - 1, 0, 3) : 0;
  }, [rawValue, isPercent, parsed]);

  const [display, setDisplay] = useState(parsed ?? rawValue);

  useEffect(() => {
    if (parsed == null) {
      setDisplay(rawValue);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const from = 0;
    const to = parsed;

    const tick = (t) => {
      const p = clamp((t - start) / durationMs, 0, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      const current = from + (to - from) * eased;

      const formatted =
        decimals > 0 ? current.toFixed(decimals) : String(Math.round(current));

      setDisplay(isPercent ? `${formatted}%` : formatted);

      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [rawValue, parsed, durationMs, decimals, isPercent]);

  return display;
}
