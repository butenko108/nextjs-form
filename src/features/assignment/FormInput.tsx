"use client";

import clsx from "clsx";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
}

export default function FormInput({
  id,
  label,
  error,
  required,
  className,
  ...props
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        className={clsx(
          "w-full px-3 py-2 border border-gray-300 rounded",
          error && "border-red-500",
          className,
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
