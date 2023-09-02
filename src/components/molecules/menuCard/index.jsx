/* eslint-disable react/prop-types */
// import React from "react";

export const MenuCard = ({ name, desc, img }) => {
  return (
    <div className="p-5 rounded-lg bg-theme-peach">
      <img
        src={img}
        alt={name}
        className="w-full h-auto rounded-md"
        loading="lazy"
      />
      <h3 className="font-bold text-2xl text-theme-red mt-4 mb-2">{name}</h3>
      <p className="md:block hidden">{desc}</p>
    </div>
  );
};
