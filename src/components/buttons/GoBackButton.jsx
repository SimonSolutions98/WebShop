import { useNavigate } from "react-router-dom";

export default function GoBackButton({ className = "" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`
        flex items-center justify-center
        bg-secondary border border-accent text-accent
        font-secondary text-fluid-s
        px-fluid-s py-fluid-xs rounded
        transition-transform duration-200
        hover:scale-105
        ${className}
      `}
    >
      ← Back
    </button>
  );
}
