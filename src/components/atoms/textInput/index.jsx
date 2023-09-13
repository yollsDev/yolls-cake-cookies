import { Controller } from "react-hook-form";

// import React from "react";

export const TextInput = ({
  name,
  label,
  type,
  error,
  control,
  placeholder,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-md font-medium text-gray-900"
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type={type}
            {...field}
            id={name}
            placeholder={placeholder}
            className="bg-white border border-theme-pink text-gray-900 text-sm rounded-lg focus:ring-theme-pink focus:border-2 focus:border-theme-peach block w-full p-2.5"
          />
        )}
      />
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
};
