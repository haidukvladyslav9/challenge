import React, { useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import CurrencySelector from "../currencyselector";
import AmountInput from "../amountinput";
import { toFixedNumber } from "../../utils/mathUtils";
import { getCurrencyPrice } from "../../tests/data/prices";

const CurrencyExchange: React.FC = () => {
  const [fromAmount, setFromAmount] = useState<number>(1);
  const [toAmount, setToAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [isFromAmountChanging, setIsFromAmountChanging] =
    useState<boolean>(true);

  const fromCurrencyInfo = useMemo(
    () => getCurrencyPrice(fromCurrency),
    [fromCurrency]
  );
  const toPriceInfo = useMemo(() => getCurrencyPrice(toCurrency), [toCurrency]);

  useMemo(() => {
    if (isFromAmountChanging) {
      const converted = toFixedNumber(
        (fromAmount * toPriceInfo.price) / fromCurrencyInfo.price,
        6
      );
      setToAmount(converted);
    } else {
      const converted = toFixedNumber(
        (toAmount * fromCurrencyInfo.price) / toPriceInfo.price,
        6
      );
      setFromAmount(converted);
    }
  }, [
    fromAmount,
    toAmount,
    fromCurrencyInfo.price,
    toPriceInfo.price,
    isFromAmountChanging,
  ]);

  const handleFromAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsFromAmountChanging(true);
    setFromAmount(Number(event.target.value));
  };

  const handleToAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFromAmountChanging(false);
    setToAmount(Number(event.target.value));
  };

  const handleFromCurrencyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setToCurrency(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        {fromAmount} {fromCurrency} equals
      </Typography>
      <Typography variant="h4" gutterBottom>
        {toAmount.toFixed(2)} {toCurrency}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {isFromAmountChanging
          ? fromCurrencyInfo.date.toUTCString()
          : toPriceInfo.date.toUTCString()}{" "}
      </Typography>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
      >
        <AmountInput
          label="Amount"
          value={fromAmount}
          onChange={handleFromAmountChange}
          currencySymbol={fromCurrency}
        />
        <CurrencySelector
          label="From"
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
        />
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
      >
        <AmountInput
          label="Converted"
          value={toAmount}
          onChange={handleToAmountChange}
          currencySymbol={toCurrency}
        />
        <CurrencySelector
          label="To"
          value={toCurrency}
          onChange={handleToCurrencyChange}
        />
      </Box>
    </Box>
  );
};

export default CurrencyExchange;
