import { Controller } from "react-hook-form";

export const TextAreaInput = ({
  name,
  label,
  error,
  control,
  placeholder,
  rows,
  disabled,
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
          <textarea
            disabled={disabled}
            readOnly={disabled}
            {...field}
            id={name}
            placeholder={placeholder}
            rows={rows}
            className="bg-white border border-theme-pink text-gray-900 text-sm rounded-lg focus:ring-theme-pink focus:border-2 focus:border-theme-peach block w-full p-2.5"
          />
        )}
      />
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
};
