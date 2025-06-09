import { useCurrency } from "../../context/useCurrency.js";
import convertAndFormatPrice from "../../utilities/convertAndFormatPrice.js";

export default function PriceTag({
  value,
  currency: productCurrency = "USD",
  className = "",
  style = {},
  disableCharm = false, // ✅ NEW
}) {
  const { currency: selectedCurrency, rates } = useCurrency();

  const formatted = convertAndFormatPrice(
    value,
    productCurrency,
    selectedCurrency,
    rates,
    disableCharm // ✅ Pass to converter
  );

  return (
    <span className={`price-tag ${className}`} style={style}>
      {formatted || "–"}
    </span>
  );
}
