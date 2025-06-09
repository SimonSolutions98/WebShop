import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import PageWrapper from "../layout/PageWrapper";
import PageTitleWrapper from "./PageTitleWrapper";

import HomePage from "../../pages/HomePage";
import AboutPage from "../../pages/AboutPage";
import ContactPage from "../../pages/ContactPage";
import CartPage from "../../pages/CartPage";
import ProductPage from "../../pages/ProductPage";
import DetailedProductPage from "../../pages/DetailedProductPage";
import CheckoutPage from "../../pages/CheckoutPage";
import OrderConfirmationPage from "../../pages/OrderConfirmationPage";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} className="flex flex-col flex-1">
        <div className="flex-1 flex items-center justify-center max-h-[13vh] [@media(min-width:330px)]:max-h-[22vh]">
          <PageTitleWrapper />
        </div>
        <div className="w-full px-fluid-m mx-auto pb-fluid-l md:px-fluid-xl 2xl:mb-fluid-l">
          <Routes location={location}>
            <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
            <Route path="/cart" element={<PageWrapper><CartPage /></PageWrapper>} />
            <Route path="/products" element={<PageWrapper><ProductPage /></PageWrapper>} />
            <Route path="/product/:slug" element={<PageWrapper><DetailedProductPage /></PageWrapper>} />
            <Route path="/checkout" element={<PageWrapper><CheckoutPage /></PageWrapper>} />
            <Route path="/confirmation" element={<PageWrapper><OrderConfirmationPage /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><HomePage /></PageWrapper>} />
          </Routes>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
