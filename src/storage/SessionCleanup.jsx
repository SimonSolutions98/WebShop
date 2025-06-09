import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function SessionCleanup() {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const prevPath = prevPathRef.current;
    const currPath = location.pathname;

    if (prevPath === "/confirmation" && currPath !== "/confirmation") {
      sessionStorage.removeItem("checkoutForm");
      sessionStorage.removeItem("cart");
      sessionStorage.removeItem("orderId");
      sessionStorage.removeItem("currency");
      sessionStorage.removeItem("total");
      sessionStorage.removeItem("homeButtonShown");
    }

    prevPathRef.current = currPath;
  }, [location.pathname]);

  return null;
}
