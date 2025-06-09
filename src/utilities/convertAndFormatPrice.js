// Format and convert price for display
export default function convertAndFormatPrice(value, fromCurrency, toCurrency, rates, disableCharm = false) {
  if (!rates || !rates[fromCurrency] || !rates[toCurrency]) return "";

  const base = value / rates[fromCurrency];
  const converted = base * rates[toCurrency];

  const final = disableCharm ? converted : roundToCharm(converted);

  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: toCurrency,
  }).format(final);
}

// Charm rounding: always rounds UP to .50, .95, or next .00
export function roundToCharm(amount) {
  const whole = Math.floor(amount);
  const decimal = amount - whole;

  if (decimal === 0) return whole;
  if (decimal <= 0.50) return whole + 0.5;
  if (decimal <= 0.95) return whole + 0.95;

  return whole + 1;
}

// Return raw numeric converted price (for total calculations, not formatting)
export function convertAndFormatPriceRaw(value, fromCurrency, toCurrency, rates, charm = true) {
  if (
    typeof value !== "number" ||
    !rates ||
    !rates[fromCurrency] ||
    !rates[toCurrency]
  ) return 0;

  const base = value / rates[fromCurrency];
  const converted = base * rates[toCurrency];

  return charm ? roundToCharm(converted) : converted;
}
