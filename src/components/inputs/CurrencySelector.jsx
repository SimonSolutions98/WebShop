import { useCurrency } from "../../context/useCurrency.js";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CurrencySelector() {
  const { currency, setCurrency, rates } = useCurrency();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const menuRef = useRef(null);

  const PRIORITY = ["USD", "EUR", "GBP", "SEK"];
  const allCurrencies = Object.keys(rates || {});
  const others = allCurrencies.filter((c) => !PRIORITY.includes(c)).sort();

const visibleOptions = showAll
  ? [...PRIORITY, ...others].filter((code) => code !== currency)
  : [...new Set([...PRIORITY, "OTHER"].filter((code) => code !== currency))];

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
        setShowAll(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    if (code === "OTHER") {
      setShowAll(true);
    } else {
      setCurrency(code);
      localStorage.setItem("preferredCurrency", code);
      setMenuOpen(false);
      setShowAll(false);
    }
  };

 return (
  <div className="relative inline-block w-fit" ref={menuRef}>
    <button
      type="button"
      onClick={() => {
        setMenuOpen((prev) => !prev);
        if (menuOpen) setShowAll(false);
      }}
      className={`flex items-center justify-between w-full px-2.5 py-0.5 bg-secondary text-fluid-s font-primary border border-accent gap-fluid-xs cursor-pointer ${
        menuOpen ? 'rounded-t-2xl' : 'rounded-2xl'
      }`}
    >
      {currency}
      <motion.span
        className="text-fluid-xs"
        animate={{ rotate: menuOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        ▲
      </motion.span>
    </button>

    <AnimatePresence>
      {menuOpen && (
        <motion.ul
          data-lenis-prevent
          key="currency-menu"
          initial={{ scaleY: 0, opacity: 0, transformOrigin: "top" }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
        transition={{
          ease: "easeInOut",
          duration: 0.25,
        }}
          className={`absolute w-full bg-secondary border border-t-0 border-accent z-1000 origin-top max-h-36 overflow-y-auto
           rounded-bl-2xl ${showAll ? '' : 'rounded-br-2xl'}`}
        >
          {visibleOptions.map((code) => (
            <li key={code}>
              <button
                onClick={() => handleSelect(code)}
                className="w-full text-left px-3 py-1 hover:bg-blend cursor-pointer"
              >
                {code === "OTHER" ? "Other..." : code}
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  </div>
);

}
