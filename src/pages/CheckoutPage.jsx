import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/useCart";
import { useCurrency } from "../context/useCurrency";
import { convertAndFormatPriceRaw } from "../utilities/convertAndFormatPrice";
import { motion, AnimatePresence } from "framer-motion";
import CheckoutFormFields from "../components/inputs/CheckoutFormFields";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { currency, rates } = useCurrency();
  const [showSummary, setShowSummary] = useState(false);

  const [formData, setFormData] = useState(() => {
    const saved = sessionStorage.getItem("checkoutForm");
    return saved
      ? JSON.parse(saved)
      : {
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          country: "",
          zip: "",
        };
  });

  useEffect(() => {
    const saved = sessionStorage.getItem("checkoutForm");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("checkoutForm", JSON.stringify(formData));
  }, [formData]);

  const total = cart.reduce((sum, item) => {
    const converted = convertAndFormatPriceRaw(
      item.price,
      item.productCurrency,
      currency,
      rates,
      true
    );
    return sum + converted * item.quantity;
  }, 0);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderId = Math.floor(100000 + Math.random() * 900000).toString();

    const cartWithConvertedPrices = cart.map((item) => ({
      ...item,
      convertedPrice: convertAndFormatPriceRaw(
        item.price,
        item.productCurrency,
        currency,
        rates,
        true
      ),
      convertedCurrency: currency,
    }));

    const payload = {
      customer: formData,
      cart: cartWithConvertedPrices,
      currency,
      total,
      orderId,
    };

    console.log("🧾 Checkout Payload:", payload);

    sessionStorage.setItem("orderId", orderId);
    sessionStorage.setItem("checkoutForm", JSON.stringify(formData));
    sessionStorage.setItem("cart", JSON.stringify(cartWithConvertedPrices));
    sessionStorage.setItem("currency", currency);
    sessionStorage.setItem("total", total);

    clearCart();
    localStorage.removeItem("cart");

    navigate("/confirmation", { replace: true });
  };

  return (
    <motion.main
      className="max-w-[1000px] mx-auto font-secondary text-accent pb-fluid-xl md:mb-fluid-xl lg:pb-0 lg:mb-0 2xl:pb-fluid-l 2xl:mb-fluid-l"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-wrap justify-between mb-fluid-s">
        <button
          onClick={() => navigate("/cart")}
          className="w-[44vw] max-w-[200px] text-fluid-s bg-accent text-primary p-2 rounded hover:bg-highlight transition-all duration-200 hover:-translate-x-[2px] cursor-pointer"
        >
          ← Back to Cart
        </button>
        <button
          onClick={() => setShowSummary(true)}
          className="w-[44vw] max-w-[200px] text-fluid-s bg-accent text-primary p-2 rounded hover:bg-highlight transition-all duration-200 hover:-translate-x-[-2px] cursor-pointer"
        >
          Show Summary →
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-fluid-s">

        <div className="col-span-2 lg:col-span-1">
          <CheckoutFormFields formData={formData} handleChange={handleChange} />
        </div>

        <div className="col-span-2 lg:col-span-1 gap-fluid-s">
          <div className="bg-muted p-4 rounded border border-accent h-full min-h-[70px]">
            <p className="text-center italic text-fluid-s text-muted">
              🧾 Payment integration coming soon...
            </p>
          </div>
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full text-fluid-s bg-accent text-primary p-2 rounded hover:bg-highlight transition cursor-pointer text-fluid-m transition-all duration-200 hover:-translate-y-[2px]"
          >
            Place Order
          </button>
        </div>
      </form>

      <AnimatePresence>
        {showSummary && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowSummary(false)}
            />
            <motion.div
              data-lenis-prevent
              className="fixed top-0 right-0 z-[1000] bg-secondary text-accent font-primary
                        p-fluid-s shadow-[-2px_0_10px_rgba(0,0,0,0.3)]
                        flex flex-col w-[50vw] max-w-[400px]
                        min-h-screen overflow-y-auto hide-scrollbar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-fluid-l font-bold">Order Summary:</h2>
              </div>

              {cart.map((item) => (
                <div className="flex py-fluid-xs" key={item.id}>
                  <div className="w-1/3">
                    <div className="aspect-square w-full rounded overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          if (item.images[1]) e.target.src = item.images[1];
                        }}
                      />
                    </div>
                  </div>

                  <div className="w-2/3 text-fluid-xs sm:text-fluid-m line-clamp-1 flex flex-col justify-evenly pl-fluid-xs">
                    <p className="line-clamp-1">{item.name}</p>
                    <p className="text-fluid-xs sm:text-fluid-m">Qty: {item.quantity}</p>
                    <p className="text-fluid-xs sm:text-fluid-m">
                      {new Intl.NumberFormat(undefined, {
                        style: "currency",
                        currency,
                      }).format(
                        convertAndFormatPriceRaw(
                          item.price,
                          item.productCurrency,
                          currency,
                          rates,
                          true
                        )
                      )}
                    </p>
                  </div>
                </div>
              ))}

              <div className="text-left text-fluid-l mt-fluid-s border-t border-accent">
                Total:{" "}
                {new Intl.NumberFormat(undefined, {
                  style: "currency",
                  currency,
                }).format(total)}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
