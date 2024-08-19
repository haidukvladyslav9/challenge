import { currencies } from "./currencies";
import { Currency } from "./types";

// Create a Map to hold the latest data for each currency
const latestCurrencyMap = new Map<string, Currency>();

currencies.forEach((currency) => {
  const existingCurrency = latestCurrencyMap.get(currency.currency);

  // If the currency is not in the map yet, or the new date is more recent, update the map
  if (!existingCurrency || currency.date > existingCurrency.date) {
    latestCurrencyMap.set(currency.currency, currency);
  }
});

// Convert the map back to an array if needed
export const latestCurrencies = Array.from(latestCurrencyMap.values());

export const getCurrencyPrice = (currency: string) => {
  return latestCurrencies.find((item) => item.currency === currency)!;
};
