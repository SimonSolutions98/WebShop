import { useState, useRef, useEffect } from "react";
import { FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useCart } from "../../context/useCart";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPageQuantityControls({
  productId,
  quantity,
  onConfirmRemove,
}) {
  const { updateQuantity } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const listRef = useRef(null);
  const scrollIntervalRef = useRef(null); // ✅ NEW

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onConfirmRemove();
  };

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

  const handleSelect = (value) => {
    if (value === 0) {
      onConfirmRemove();
    } else {
      updateQuantity(productId, value);
    }
    setMenuOpen(false);
  };

  const scrollDown = () => {
    const container = listRef.current;
    if (container) {
      const item = container.querySelector("li button");
      const itemHeight = item?.offsetHeight || 32;
      container.scrollBy({ top: itemHeight, behavior: "smooth" });
    }
  };

  // const scrollUp = () => {
  //   const container = listRef.current;
  //   if (container) {
  //     const item = container.querySelector("li button");
  //     const itemHeight = item?.offsetHeight || 32;
  //     container.scrollBy({ top: -itemHeight, behavior: "smooth" });
  //   }
  // };

  // ✅ NEW: Start and stop continuous scroll
  const startScrollDown = () => {
    scrollDown();
    scrollIntervalRef.current = setInterval(scrollDown, 100);
  };

  const stopScroll = () => {
    clearInterval(scrollIntervalRef.current);
    scrollIntervalRef.current = null;
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div
      className={`relative flex items-center text-accent font-primary rounded-full px-2 py-0.5 border transition-colors duration-300 ${
        menuOpen ? "border-transparent" : "border-blend"
      }`}
      ref={menuRef}
    >
      <button
        type="button"
        onClick={handleRemove}
        className="p-[3px] font-bold hover:-translate-y-[2px] hover:text-blend cursor-pointer"
        title="Remove"
      >
        <FiTrash2 />
      </button>

      <button
        type="button"
        onClick={handleDecrease}
        className="px-2 font-bold hover:-translate-y-[2px] hover:text-blend cursor-pointer"
      >
        –
      </button>

      <div className="relative">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
          className="px-2 w-[1.75em] text-center hover:-translate-y-[2px] hover:text-blend cursor-pointer"
          title="Set quantity"
        >
          {quantity}
        </button>

        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Full screen overlay to close menu */}
              <motion.div
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.01 }}
                exit={{ opacity: 0 }}
              />

              {/* Dropdown */}
              <motion.div
                data-lenis-prevent
                className="absolute top-[-2px] left-0 z-50 w-[1.75em]"
                initial={{ scaleY: 0, opacity: 0, transformOrigin: "top" }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Up arrow */}
                {/* <button
                  onClick={scrollUp}
                  className="w-full py-1 flex items-center justify-center bg-secondary border border-blend rounded-t-xl text-accent cursor-pointer hover:bg-blend"
                  title="Scroll up"
                >
                  <FiChevronUp size={16} />
                </button> */}

                {/* List */}
                <ul
                  ref={listRef}
                  className="bg-secondary overflow-y-auto h-[6em] border rounded-t-full border-blend hide-scrollbar text-center"
                >
                  {Array.from({ length: 100 }, (_, i) => (
                    <li key={i}>
                      <button
                        onClick={() => handleSelect(i)}
                        className="w-full hover:bg-blend cursor-pointer"
                      >
                        {i}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Down arrow with hold-scroll */}
                <button
                  onMouseDown={startScrollDown}
                  onMouseUp={stopScroll}
                  onMouseLeave={stopScroll}
                  className="w-full py-1 flex items-center justify-center bg-secondary border-b border-x border-blend rounded-b-full text-accent cursor-pointer hover:bg-blend"
                  title="Scroll down"
                >
                  <FiChevronDown
                    className="transition-transform duration-200 hover:-translate-y-[-2px]"
                    size={16}
                  />
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={handleIncrease}
        className="px-2 font-bold hover:-translate-y-[2px] hover:text-blend cursor-pointer"
      >
        +
      </button>
    </div>
  );
}
