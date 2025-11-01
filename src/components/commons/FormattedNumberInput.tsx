"use client";

import { Input } from "@/components/ui/input";
import {
  formatNumberWithCommas,
  parseFormattedNumber,
} from "@/utils/numberFormatter";

interface FormattedNumberInputProps {
  label: string;
  value: number | null | undefined;
  onChange: (val: number) => void;
  className?: string;
  labelClassName?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function FormattedNumberInput({
  label,
  value,
  onChange,
  className = "",
  labelClassName = "block text-gray-300 font-medium mb-1",
  placeholder = "",
  disabled = false,
}: FormattedNumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = e.target.value.replace(/,/g, "");
    onChange(parseFormattedNumber(formatted));
  };

  return (
    <div className="space-y-1">
      <label className={labelClassName}>{label}</label>
      <Input
        type="text"
        value={formatNumberWithCommas(value ?? "")}
        onChange={handleChange}
        placeholder={placeholder}
        className={`bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 ${className}`}
        disabled={disabled}
      />
    </div>
  );
}
