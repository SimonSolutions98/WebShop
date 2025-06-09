import { useContext } from "react";
import { CurrencyContext } from "./currencyContext.js";

export function useCurrency() {
  return useContext(CurrencyContext);
}
