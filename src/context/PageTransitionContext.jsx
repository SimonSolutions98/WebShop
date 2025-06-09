import { createContext, useContext, useState } from 'react';

const PageTransitionContext = createContext(null);

export function PageTransitionProvider({ children }) {
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);

  return (
    <PageTransitionContext.Provider value={{ isTransitionComplete, setIsTransitionComplete }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  return useContext(PageTransitionContext);
}