import { useNavigate } from "react-router-dom";

export default function ProceedToCheckoutButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/checkout");
  };

  return (
    <button
      onClick={handleClick}
      className="bg-accent w-[44vw] max-w-[200px] text-fluid-s text-primary p-2 rounded transition hover:bg-highlight cursor-pointer"
    >
      Proceed to Checkout
    </button>
  );
}
