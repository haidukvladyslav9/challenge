import React from "react";
import { TextField, InputAdornment } from "@mui/material";

interface AmountInputProps {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currencySymbol: string;
}

const AmountInput: React.FC<AmountInputProps> = ({
  label,
  value,
  onChange,
  currencySymbol,
}) => {
  return (
    <TextField
      label={label}
      type="number"
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{currencySymbol}</InputAdornment>
        ),
      }}
      fullWidth
    />
  );
};

export default AmountInput;
