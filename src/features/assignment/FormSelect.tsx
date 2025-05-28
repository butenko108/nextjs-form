"use client";

import clsx from "clsx";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

export default function FormSelect({
  id,
  label,
  error,
  required,
  options,
  placeholder,
  className,
  ...props
}: FormSelectProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={id}
        className={clsx(
          "w-full px-3 py-2 border border-gray-300 rounded",
          error && "border-red-500",
          className,
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
