const FALLBACK_CURRENCY = "USD";

// Basic country → currency mapping
const countryCurrencyMap = {
  SE: "SEK",
  US: "USD",
  GB: "GBP",
  DE: "EUR",
  FR: "EUR",
  IN: "INR",
  // Add more as needed
};

export default async function detectUserCurrency() {
  try {
    const response = await fetch("https://ipwho.is/");
    if (!response.ok) throw new Error("Failed to fetch location");

    const data = await response.json();
    const countryCode = data.country_code;

    return countryCurrencyMap[countryCode] || FALLBACK_CURRENCY;
  } catch (error) {
    console.warn("Currency detection failed, using fallback:", error);
    return FALLBACK_CURRENCY;
  }
}
