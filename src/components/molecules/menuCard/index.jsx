/* eslint-disable react/prop-types */
// import React from "react";

import { IconImagePlaceholder } from "../../atoms";

export const MenuCard = ({ name, desc, img }) => {
  const parts = img.split("/");
  const fileName = parts[parts.length - 1].split(".")[0];

  return (
    <div className="p-5 rounded-2xl bg-theme-peach h-full">
      {fileName !== "null" ? (
        <img
          src={img}
          alt={name}
          className="max-w-full mb-4 object-cover rounded-lg aspect-square"
        />
      ) : (
        <div className="bg-gray-300 rounded-lg flex flex-col justify-center items-center mb-3 aspect-square">
          <IconImagePlaceholder size={100} color={"#fff"} />
          <p className="text-gray-600 font-bold">Image Not Available</p>
        </div>
      )}

      <h3 className="font-bold text-2xl text-theme-red mt-4 mb-2">{name}</h3>
      <p className="md:block hidden text-sm">{desc}</p>
    </div>
  );
};
