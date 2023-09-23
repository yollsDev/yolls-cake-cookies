/* eslint-disable react/prop-types */
// import React from "react";
import { Link } from "react-router-dom";

export const LinkButton = ({ to, text, className, withIcon, icon, size }) => {
  return withIcon ? (
    <Link
      to={to}
      className={
        `${className} focus:outline-none rounded-full text-center inline-flex items-center gap-4 ` +
        (size === "sm" ? "text-sm px-3 py-1.5" : "text-base px-5 py-2")
      }
    >
      <div>{icon}</div>
      {text}
    </Link>
  ) : (
    <Link
      to={to}
      className={
        `${className} focus:outline-none rounded-full  text-center mb-2 inline-block ` +
        (size === "sm" ? "text-sm px-3 py-1.5" : "text-base px-5 py-2")
      }
    >
      {text}
    </Link>
  );
};
