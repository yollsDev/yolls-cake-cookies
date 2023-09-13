import React from "react";
import { SidebarMenu } from "../../atoms";

export const Sidebar = ({ menu, role }) => {
  return (
    <div>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden "
      >
        <span className="sr-only">Open sidebar</span>
        <a href="/" className="flex items-center">
          <img src="/logo.svg" className="mr-3 h-12" alt="Logo" />
        </a>
      </button>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-8 overflow-y-auto bg-theme-pink">
          <div href="/" className="flex items-center pl-2.5 mb-10">
            <a href="/" className="flex items-center">
              <img src="/logo.svg" className="mr-3 h-12" alt="Logo" />
            </a>
            <span className="self-center text-md font-semibold whitespace-nowrap">
              Yolls Cake & Cookies
            </span>
          </div>
          <ul className="space-y-2 font-medium">
            {menu.map((item) => (
              <SidebarMenu
                menu={item.menu}
                icon={item.icon}
                path={item.path}
                key={item.menu}
              />
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};
