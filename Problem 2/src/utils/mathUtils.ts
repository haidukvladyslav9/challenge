export const toFixedNumber = (
  number: number,
  digits: number,
  base: number = 10
): number => {
  const pow = Math.pow(base, digits);
  return Math.round(number * pow) / pow;
};
