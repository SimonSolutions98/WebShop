import { GiWeight } from "react-icons/gi";

export default function EstimatedWeight({ grams, className = "" }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <GiWeight />
      <span>{grams}g</span>
    </div>
  );
}
