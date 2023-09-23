import React from "react";
import { Listbox } from "@headlessui/react";
import { IconCheck } from "../icons";

export const DropDownInput = ({ options, value, onChange, disabled }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="status"
        className="block mb-2 text-md font-medium text-gray-900"
      >
        Status
      </label>
      <Listbox
        value={value}
        onChange={onChange}
        {...(disabled && { disabled: true })}
      >
        {({ open }) => (
          <>
            <div className="mt-1 relative">
              <Listbox.Button className="bg-white border border-theme-pink text-gray-900 text-sm rounded-lg focus:ring-theme-pink focus:border-theme-peach block focus:ring-opacity-50  w-full py-2.5 pl-3 pr-10 text-left cursor-pointer focus:outline-none sm:text-sm">
                {value ? value : "Select Status"}
              </Listbox.Button>

              <Listbox.Options className="z-10 mt-2 absolute w-full py-1 bg-white border border-theme-pink rounded-lg shadow-lg max-h-32 ring-1 ring-theme-pink focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option key={option} value={option}>
                    {({ active, selected }) => (
                      <div
                        className={`${
                          active ? "text-white bg-theme-peach" : "text-gray-900"
                        } cursor-pointer select-none relative px-3 py-2 flex justify-between`}
                      >
                        {option}
                        {selected && <IconCheck size={20} />}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};
