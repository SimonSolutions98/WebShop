import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LogoButton from "../buttons/LogoButton.jsx";
import HamburgerMenu from "./HamburgerMenu.jsx";
import CartQuantityIconButton from "../buttons/CartQuantityIconButton.jsx";
import CurrencySelector from "../inputs/CurrencySelector.jsx";

export default function Header() {
  const location = useLocation();
  const hideOnRoutes = ["/checkout", "/confirmation"];
  const shouldHideUI = hideOnRoutes.includes(location.pathname);

  const fadeAnim = {
    initial: { opacity: 0, y: 0 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.2 } },
    exit: { opacity: 0, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <header className="w-full mx-auto pt-fluid-l pb-fluid-xs header">
      <div className="grid grid-cols-9 items-center justify-items-center">

        {/* Hamburger Menu */}
        <AnimatePresence>
          {!shouldHideUI && (
            <motion.div
              key="hamburger"
              className="col-start-2 flex justify-center items-center"
              {...fadeAnim}
            >
              <div className="flex w-max items-center justify-center text-fluid-xl">
                <HamburgerMenu />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logo */}
        <div className="col-start-5 flex w-max justify-center">
          <LogoButton />
        </div>

        {/* Currency Selector */}
        <AnimatePresence>
          {!shouldHideUI && (
            <motion.div
              key="currency"
              className="hidden lg:flex col-start-7 w-full justify-end items-center text-fluid-s cursor-pointer transition-transform duration-200 hover:-translate-y-[2px] relative top-1"
              {...fadeAnim}
            >
              <CurrencySelector />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cart Icon */}
        <AnimatePresence>
          {!shouldHideUI && (
            <motion.div
              key="cart"
              className="col-start-8 flex justify-center transition-transform duration-200 hover:-translate-y-[2px] relative top-1"
              {...fadeAnim}
            >
              <div className="flex w-max items-center text-accent rounded-fluid-xs text-fluid-xl">
                <CartQuantityIconButton />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
}
