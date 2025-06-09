import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import OrderConfirmationProductCard from "../components/cards/OrderConfirmationProductCard";

export default function OrderConfirmationPage() {
  const navigate = useNavigate();

  const formData = JSON.parse(sessionStorage.getItem("checkoutForm") || "{}");
  const cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
  const orderId = sessionStorage.getItem("orderId");
  const currency = sessionStorage.getItem("currency") || "USD";
  const total = sessionStorage.getItem("total");

  // If landed here directly (not from checkout), redirect to home
  useEffect(() => {
    if (!formData.firstName || !orderId || cart.length === 0) {
      navigate("/", { replace: true });
    }
  }, [formData, orderId, cart, navigate]);

  const handleGoHome = () => {
    navigate("/", { replace: true }); // prevent going back again
  };

  const formatPrice = (value) =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
    }).format(value);

  function capitalize(name) {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  return (
    <motion.main
      className="max-w-[850px] mx-auto px-fluid-xs pb-fluid-m text-accent font-secondary text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-fluid-l font-bold mb-fluid-xs">
        Thank you, {capitalize(formData.firstName)} {capitalize(formData.lastName)} for your purchase at Simon Solutions!
      </h1>

      <p className="text-fluid-m mb-fluid-s">
        Your order number is <strong>#{orderId}</strong> and a confirmation email was sent to <strong>{formData.email}</strong>
      </p>

      <div className="flex flex-row items-center justify-between mb-fluid-xs text-fluid-l">
        <h2>Order Summary:</h2>
        <div>Total: {formatPrice(total)}</div>
      </div>

      <ul className="overflow-hidden text-left">
        {cart.map((item) => (
          <li key={item.id} className="p-1">
            <OrderConfirmationProductCard item={item} currency={currency} />
          </li>
        ))}
      </ul>

      <button
        onClick={handleGoHome}
        className="text-fluid-m mt-fluid-s bg-accent w-full text-primary py-2 px-6 rounded transition cursor-pointer transition-transform duration-200 hover:-translate-y-[2px]"
      >
        Go to Home
      </button>
    </motion.main>
  );
}
