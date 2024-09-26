// import React from "react";
import { FaStoreAlt } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";

export const Footer = () => {
  return (
    <footer className="bg-theme-pink bottom-0 relative">
      <div className="mx-auto w-full">
        <div className="grid grid-cols-1 gap-8  py-6 lg:py-8 md:grid-cols-3">
          <div className="border-theme-brown border-0 md:border-r-4 px-10 md:px-14">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="logo" />
              <h2 className="text:md md:text-xl font-semibold text-gray-900 ">
                Yolls Cake & Cookies
              </h2>
            </div>
            <div className="px-2 mt-4">
              <p className="text-sm text-justify">
                We use traditional recipes passed down from generation to
                generation. we maintain quality with natural ingredients. The
                products we offer are freshly made
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 border-theme-brown border-0 md:border-r-4 px-10 md:px-14">
            <ul className="text-gray-500  font-medium">
              <li className="mb-4">
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              {/* <li className="mb-4">
                <a href="/menu" className="hover:underline">
                  Menu
                </a>
              </li>
              <li className="mb-4">
                <a href="/about-us" className="hover:underline">
                  About Us
                </a>
              </li>
              <li className="mb-4">
                <a href="customer-service" className="hover:underline">
                  Customer Service
                </a>
              </li>
            </ul>
            <ul className="text-gray-500  font-medium">
              <li className="mb-4">
                <a href="/career" className="hover:underline">
                  Career
                </a>
              </li>
              <li className="mb-4">
                <a href="/testimony" className="hover:underline">
                  Testimony
                </a>
              </li> */}
              <li className="mb-4">
                <a href="/order" className="hover:underline">
                  Order
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Login
                </a>
              </li>
            </ul>
          </div>
          <div className="px-10 md:px-14">
            <ul className="text-gray-500  font-medium">
              <li className="mb-4">
                <a
                  href="https://goo.gl/maps/GSyVWEmq6K3SJgRJ7"
                  className="hover:underline"
                >
                  <FaStoreAlt className="inline-block mr-2" size={20} />
                  Jln. Nusantara raya No.20
                </a>
              </li>
              <li className="mb-4">
                <AiFillInstagram className="inline-block mr-2" size={20} />
                <a
                  href="https://www.instagram.com/yolls.cake/"
                  className="hover:underline"
                >
                  @yolls.cake
                </a>
              </li>
              <li className="mb-4">
                <IoLogoWhatsapp className="inline-block mr-2" size={20} />
                <a
                  href="https://wa.me/6281380330388?text=Halo%20Yolls%20Cake!"
                  className="hover:underline"
                >
                  081380330388
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className=" py-6 bg-gray-100 text-center  w-full">
          <span className="text-sm text-gray-500 ">
            © 2023 <a href="/">Yolls Cake & Cookies</a>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
