import React from "react";
import { TextField, MenuItem } from "@mui/material";
import CurrencyWithIcon from "../currencywithicon";
import { latestCurrencies } from "../../tests/data/prices";

interface CurrencySelectorProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      sx={{ maxWidth: 200 }}
    >
      {latestCurrencies.map((option) => (
        <MenuItem key={option.currency} value={option.currency}>
          <CurrencyWithIcon
            currency={option.currency}
            label={option.currency}
          />
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CurrencySelector;
