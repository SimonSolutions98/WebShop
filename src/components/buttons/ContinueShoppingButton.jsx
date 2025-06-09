import { useNavigate } from "react-router-dom";

export default function ContinueShoppingButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <button
      onClick={handleClick}
      className="bg-accent w-[44vw] max-w-[200px] text-fluid-s text-primary p-2 rounded transition hover:bg-highlight cursor-pointer"
    >
      Continue Shopping
    </button>
  );
}
