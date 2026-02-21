import { useEffect, useState } from "react";
import useCountUp from "../../hooks/useCountUp.js";
import "../../styles/cards.css";

export default function StatCard({ label, value, helper }) {
  const animatedValue = useCountUp(value, 750);
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsIn(true), 20);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={"card" + (isIn ? " card--in" : "")}>
      <div className="card__label">{label}</div>
      <div className="card__value">{animatedValue}</div>
      {helper ? <div className="card__helper">{helper}</div> : null}
    </div>
  );
}