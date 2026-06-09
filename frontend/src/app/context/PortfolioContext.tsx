import { createContext, useContext, useState } from "react";

interface ContextProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  API: string;
}

const PortfolioContext = createContext<ContextProps | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {

  const API = (import.meta as any).env.VITE_BACKEND_API;

  const [loading, setLoading] = useState(false);

  return (
    <PortfolioContext.Provider value={{ loading, setLoading, API }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
