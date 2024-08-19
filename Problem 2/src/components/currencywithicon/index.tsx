import React from "react";

interface CurrencyWithIconProps {
  currency: string;
  label?: string;
}

const CurrencyWithIcon: React.FC<CurrencyWithIconProps> = ({
  currency,
  label,
}) => {
  const currencyLabel = label || currency;

  // Construct the URL to the SVG icon in the public/tokens folder
  const iconUrl = `/tokens/${currency}.svg`;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={iconUrl}
        alt={`${currencyLabel} icon`}
        style={{ marginRight: "8px", width: "24px", height: "24px" }}
      />
      <span>{currencyLabel}</span>
    </div>
  );
};

export default CurrencyWithIcon;
