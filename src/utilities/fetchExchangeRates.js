const EXCHANGE_API_URL = "https://api.exchangerate-api.com/v4/latest/USD";
// Optional: switch to ExchangeRate.host if needed

export default async function fetchExchangeRates() {
  try {
    const response = await fetch(EXCHANGE_API_URL);
    if (!response.ok) throw new Error("Failed to fetch currency exchange rates");

    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error("Currency API error:", error);
    return {};
  }
}
