import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useFetchCategories from "../../hooks/useFetchCategories";
import { getPageTitle } from "../../utilities/getPageTitle";

const EXIT_DURATION = 0.25;
const EXIT_DELAY = 0.3;
const ENTRY_DURATION = 0.25;
const ENTRY_DELAY = 0.3;

export default function PageTitleWrapper() {
  const location = useLocation();
  const { categories } = useFetchCategories();

  const pathname = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const categorySlug = searchParams.get("category");

  const computedTitle = getPageTitle(pathname, categorySlug, categories);

  const [currentTitle, setCurrentTitle] = useState(null);
  const [pendingTitle, setPendingTitle] = useState(null);

  useEffect(() => {
    if (!currentTitle && computedTitle) {
      setCurrentTitle(computedTitle);
    } else if (computedTitle && computedTitle !== currentTitle) {
      setPendingTitle(computedTitle);
      setCurrentTitle(null); // Triggers exit animation
    }
  }, [computedTitle, currentTitle]);

  return (
    <AnimatePresence mode="wait">
      {currentTitle && (
        <motion.h1
          key={currentTitle}
          className="dynamicPageTitle my-fluid-xs md:mb-0"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{
            opacity: 0,
            x: 100,
            transition: {
              duration: EXIT_DURATION,
              delay: EXIT_DELAY,
            },
          }}
          transition={{
            duration: ENTRY_DURATION,
            delay: ENTRY_DELAY,
          }}
          onAnimationComplete={(definition) => {
            if (definition === "exit" && pendingTitle) {
              setCurrentTitle(pendingTitle);
              setPendingTitle(null);
            }
          }}
        >
          {currentTitle}
        </motion.h1>
      )}
    </AnimatePresence>
  );
}
