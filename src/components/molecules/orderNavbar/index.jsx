import React from "react";

export const OrderTopBar = () => {
  return (
    <div className="fixed w-full z-20 top-0 left-0 bg-theme-pink py-3 flex px-8">
      <a href="/" className="flex items-center w-full justify-center font-bold">
        <img src="/logo.svg" className="mr-3 h-12" alt="Logo" />
        <p>Yolls Cake & Cookies</p>
      </a>
      <a
        className="bg-theme-red text-white hover:bg-white hover:text-theme-red hover:border-theme-red border-2 border-theme-red rounded-full px-5 py-2 w-[20%] flex items-center justify-center"
        href="/reviews"
      >
        Give us a Review!
      </a>
    </div>
  );
};
