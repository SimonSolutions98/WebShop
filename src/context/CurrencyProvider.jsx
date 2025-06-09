import { useEffect, useState } from "react";
import { CurrencyContext } from "./currencyContext.js";
import fetchExchangeRates from "../utilities/fetchExchangeRates.js";
import detectUserCurrency from "../utilities/detectUserCurrency.js";

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(null);
  const [rates, setRates] = useState({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    async function init() {
      const fetchedRates = await fetchExchangeRates();
      setRates(fetchedRates);

      const saved = localStorage.getItem("preferredCurrency");
      const fallback = await detectUserCurrency();
      const chosen = saved && fetchedRates[saved] ? saved : fallback;

      setCurrency(chosen);
      setInitialized(true);
    }

    init();
  }, []);

  useEffect(() => {
    if (initialized && currency) {
      localStorage.setItem("preferredCurrency", currency);
    }
  }, [currency, initialized]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates }}>
      {children}
    </CurrencyContext.Provider>
  );
}
