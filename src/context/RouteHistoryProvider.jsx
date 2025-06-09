import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RouteHistoryContext } from "./routeHistoryContext";

export default function RouteHistoryProvider({ children }) {
  const location = useLocation();

  useEffect(() => {
    const fullPath = location.pathname + location.search;
    const history = JSON.parse(sessionStorage.getItem("navHistory") || "[]");
    const newHistory = [...history, fullPath].slice(-20); // store last 20 full paths
    sessionStorage.setItem("navHistory", JSON.stringify(newHistory));
  }, [location]);

  return (
    <RouteHistoryContext.Provider value={null}>
      {children}
    </RouteHistoryContext.Provider>
  );
}
