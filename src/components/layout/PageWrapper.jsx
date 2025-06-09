import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePageTransition } from "../../context/PageTransitionContext.jsx";

export default function PageWrapper({ children }) {
  const { setCanAnimateIn, setCanAnimateOut, canAnimateOut } = usePageTransition();
  const [readyToAnimate, setReadyToAnimate] = useState(false);

  useEffect(() => {
    if (canAnimateOut) {
      console.log("[PageWrapper] canAnimateOut is true — allowing page transition to begin");
      setReadyToAnimate(true);
    }
  }, [canAnimateOut]);

  const handleAnimationComplete = () => {
    if (readyToAnimate) {
      console.log("[PageWrapper] Transition done — setting canAnimateIn = true");
      setCanAnimateIn(true);
      setCanAnimateOut(false); // Reset for next route
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={readyToAnimate ? { opacity: 0 } : {}}
      transition={{ duration: 0.3 }}
      onAnimationComplete={handleAnimationComplete}
    >
      {children}
    </motion.div>
  );
}
