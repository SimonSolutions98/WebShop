import { FaRegClock } from "react-icons/fa";

export default function EstimatedTime({ minutes, className = "" }) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formatted = `${hours > 0 ? `${hours}h ` : ""}${remainingMinutes}m`;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <FaRegClock />
      <span>{formatted}</span>
    </div>
  );
}
