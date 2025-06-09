import { useCart } from "../context/useCart";
import { useCurrency } from "../context/useCurrency";
import { useEffect, useState } from "react";
import ConfirmModal from "../components/inputs/YesNoPopUp";
import CartPageProductCard from "../components/cards/CartProductCard";
import PriceTag from "../components/media/PriceTag";
import ContinueShoppingButton from "../components/buttons/ContinueShoppingButton";
import ProceedToCheckoutButton from "../components/buttons/ProceedToCheckoutButton";
import { convertAndFormatPriceRaw } from "../utilities/convertAndFormatPrice";
import { motion, AnimatePresence } from "framer-motion";

// Variants
const buttonsAndTotalVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.3 },
  },
};

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const { currency, rates } = useCurrency();
  const [itemToRemove, setItemToRemove] = useState(null);
  const [showEmptyMsg, setShowEmptyMsg] = useState(false);
  const [showFooter, setShowFooter] = useState(cart.length > 0);

  useEffect(() => {
    if (cart.length > 0) {
      setShowFooter(true);
    } else {
      const timeout = setTimeout(() => setShowFooter(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [cart]);

  useEffect(() => {
    if (cart.length === 0) {
      const timer = setTimeout(() => setShowEmptyMsg(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowEmptyMsg(false);
    }
  }, [cart]);

  if (!rates || !rates[currency]) return null;

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

  return (
    <motion.main
      className="flex flex-col min-h-[76vh] md:max-w-[800px] mx-auto py-fluid-s font-secondary text-accent"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      layout
    >
      {/* Buttons */}
      <AnimatePresence>
        {showFooter && (
          <motion.div
            key="cart-buttons"
            className="flex justify-between mb-fluid-s"
            variants={buttonsAndTotalVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            layout
            layoutTransition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ContinueShoppingButton className="bg-accent w-[44vw] max-w-[200px] text-fluid-s text-primary p-2 rounded transition hover:bg-highlight cursor-pointer" />
            <ProceedToCheckoutButton className="bg-accent w-[44vw] max-w-[200px] text-fluid-s text-primary p-2 rounded transition hover:bg-highlight cursor-pointer" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Items */}
      <motion.ul className="flex flex-col gap-fluid-s mb-fluid-s" layout>
        <AnimatePresence>
          {cart.map((item) => (
            <li key={item.id} className="relative">
              <motion.div
                layout
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <CartPageProductCard
                  item={item}
                  onRemoveRequest={() => setItemToRemove(item)}
                />
              </motion.div>
            </li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {/* Total */}
      <AnimatePresence>
        {showFooter && (
          <motion.div
            key="cart-total"
            className="border-t border-accent pt-fluid-s text-fluid-l"
            variants={buttonsAndTotalVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            layout
            layoutTransition={{ duration: 0.3, ease: "easeInOut" }}
          >
            Total: <PriceTag value={total} currency={currency} disableCharm />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty Message */}
      <AnimatePresence>
        {showEmptyMsg && (
            <motion.p
              key="empty-msg"
              className="text-center text-fluid-l text-accent"
              initial={{ opacity: 0, y: 210 }}
              animate={{ opacity: 1, y: 200, transition: { duration: 0.4, delay:0.2 } }}
              exit={{ opacity: 0, y: 210, transition: { duration: 0.1 } }}
            >
              Your Simon Solutions cart is currently empty.
            </motion.p>
        )}
      </AnimatePresence>

      {/* Confirm Modal */}
      {itemToRemove && (
        <ConfirmModal
          message={`Remove "${itemToRemove.name}" from cart?`}
          onConfirm={() => {
            removeFromCart(itemToRemove.id);
            setItemToRemove(null);
          }}
          onCancel={() => setItemToRemove(null)}
        />
      )}
    </motion.main>
  );
}
