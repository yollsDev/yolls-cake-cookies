import React from "react";

export const OrderTopBar = () => {
  return (
    <div className="fixed w-full z-20 top-0 left-0 bg-theme-pink py-3">
      <a href="" className="flex items-center w-full justify-center font-bold">
        <img src="/logo.svg" className="mr-3 h-12" alt="Logo" />
        <p>Yolls Cake & Cookies</p>
      </a>
    </div>
  );
};
