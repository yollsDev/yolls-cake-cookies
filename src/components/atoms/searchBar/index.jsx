import React from "react";
import { IconSearch } from "../icons";

export const SearchBar = ({ value, onChange }) => {
  return (
    <form>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <IconSearch />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-theme-pink focus:border-theme-peach focus:outline-none "
          placeholder="Search..."
          value={value} // Controlled input value
          onChange={onChange} // Input change handler
        />
        {/* <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-theme-red hover:bg-red-950 focus:ring-4 focus:outline-none focus:ring-theme-pink font-medium rounded-lg text-sm px-4 py-2 "
        >
          Search
        </button> */}
      </div>
    </form>
  );
};
