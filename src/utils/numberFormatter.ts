// src/utils/numberFormatter.ts
export const formatNumberWithCommas = (value: number | string): string => {
  if (value === null || value === undefined || value === "") return "";

  const numberValue = Number(value);
  if (isNaN(numberValue)) return "";

  return numberValue.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

export const parseFormattedNumber = (value: string): number => {
  if (!value) return 0;
  return Number(value.replace(/,/g, ""));
};
