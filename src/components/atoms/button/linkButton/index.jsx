/* eslint-disable react/prop-types */
// import React from "react";
import { Link } from "react-router-dom";

export const LinkButton = ({ to, text, className }) => {
  return (
    <Link
      to={to}
      className={`${className} focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 inline-block `}
    >
      {text}
    </Link>
  );
};
