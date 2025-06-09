import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/useCart";

export default function QuantityControls({
  productId,
  quantity,
  onConfirmRemove,
  showGoToCart = true,
}) {
  const { updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleDecrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity === 1) {
      onConfirmRemove();
    } else {
      updateQuantity(productId, quantity - 1);
    }
  };

  const handleIncrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(productId, quantity + 1);
  };

  return (
    <div
      type="button"
      className="
        flex justify-around items-center w-full
        bg-accent text-secondary border border-primary
        rounded-sm
        hover:bg-secondary hover:text-accent hover:border-accent transition
        font-primary text-fluid-m px-4 py-[2px] cursor-pointer
      "
      onClick={(e) => {
        if (showGoToCart) {
          e.preventDefault();
          navigate("/cart");
        }
      }}
    >
      {/* Left: - 1 + */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={handleDecrease}
          className="px-2 font-bold transition-all hover:-translate-y-[2px] hover:text-blend cursor-pointer"
        >
          –
        </button>
        <span className="min-w-[1.5rem] text-center select-none">{quantity}</span>
        <button
          type="button"
          onClick={handleIncrease}
          className="px-2 font-bold transition-all hover:-translate-y-[2px] hover:text-blend cursor-pointer"
        >
          +
        </button>
      </div>

      {/* Right text */}
      {showGoToCart && (
        <span className="transition-all hover:-translate-y-[2px] hover:text-accent">
          Go to Cart
        </span>
      )}
    </div>
  );
}
