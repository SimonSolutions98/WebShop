import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";
import AnimatedRoutes from "./components/navigation/AnimatedRoutes";
import { PageTransitionProvider } from "./context/PageTransitionContext.jsx";
import SmoothScrollProvider from "./components/navigation/SmoothScrollProvider";
import SessionCleanup from "./storage/SessionCleanup";
import RouteHistoryProvider from "./context/RouteHistoryProvider";

export default function App() {
  return (
    <div className="bg-primary">
      <Router>
        <PageTransitionProvider>
          <SmoothScrollProvider>
            <SessionCleanup />
            <div className="min-h-[100vh] flex flex-col">
              <Header />
              <div className="flex flex-col flex-1">
                <RouteHistoryProvider>
                  <AnimatedRoutes />
                </RouteHistoryProvider>
              </div>
            </div>
            <Footer />
          </SmoothScrollProvider>
        </PageTransitionProvider>
      </Router>
    </div>
  );
}
