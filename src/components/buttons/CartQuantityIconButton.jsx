import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/useCart";
import { LiaShoppingCartSolid } from "react-icons/lia";

function CartQuantityIconButton() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const badgeRef = useRef(null);
  const previousTotalRef = useRef(0);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const badge = badgeRef.current;

    if (badge && totalItems !== previousTotalRef.current) {
      badge.classList.remove("pop");
      void badge.offsetWidth;
      badge.classList.add("pop");
      previousTotalRef.current = totalItems;
    }
  }, [totalItems]);

  const handleClick = () => {
    if (location.pathname !== "/cart") {
      navigate("/cart");
    }
  };

  return (
    <div
      className="relative cursor-pointer flex items-center"
      onClick={handleClick}
    >
      <LiaShoppingCartSolid className="scale-130" />
      {totalItems > 0 && (
        <span
          ref={badgeRef}
          className="cart-badge absolute -top-2 -right-3 text-fluid-s leading-none px-[5px] py-0.5 text-accent border-1 border-accent rounded-full bg-secondary font-accent "
        >
          <span className="relative top-[1px]">{totalItems}</span>
        </span>
      )}
      <style>{`
        .cart-badge.pop {
          animation: cart-badge-pop 0.3s ease;
        }
        @keyframes cart-badge-pop {
          0% { transform: scale(1); }
          30% { transform: scale(1.3) rotate(2deg); }
          60% { transform: scale(0.95) rotate(-2deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}

export default CartQuantityIconButton;
