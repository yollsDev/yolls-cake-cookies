import React from "react";
import { NavLink } from "react-router-dom";

export const SidebarMenu = ({ menu, icon, path }) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          [
            "flex items-center p-4 text-gray-900 rounded-lg  hover:bg-white  group",
            isActive ? "bg-white" : null,
          ]
            .filter(Boolean)
            .join(" ")
        }
      >
        {icon}
        <span className="flex-1 ml-3 whitespace-nowrap font-bold">{menu}</span>
      </NavLink>
    </li>
  );
};
