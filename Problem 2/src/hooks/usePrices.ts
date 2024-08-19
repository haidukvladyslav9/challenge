import { useState, useEffect, useRef, useCallback } from "react";

export interface CurrencyData {
  currency: string;
  date: string;
  price: number;
}

export const usePrices = () => {
  const [prices, setPrices] = useState<CurrencyData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cache = useRef<CurrencyData[] | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        if (cache.current) {
          setPrices(cache.current);
          setLoading(false);
          return;
        }

        const response = await fetch(
          "https://interview.switcheo.com/prices.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch prices");
        }

        const data: CurrencyData[] = await response.json();

        cache.current = data;

        setPrices(data);
        setLoading(false);
      } catch (err) {
        setError(String(err) || "An error occurred while fetching prices");
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  const getCurrencyPrice = useCallback(
    (currency: string) => {
      return prices.find((item) => item.currency === currency)!;
    },
    [prices]
  );

  return { prices, loading, error, getCurrencyPrice };
};
