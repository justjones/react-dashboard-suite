import "../../styles/skeleton.css";

export default function Skeleton({ className = "" }) {
  return <div className={"skel " + className} aria-hidden="true" />;
}