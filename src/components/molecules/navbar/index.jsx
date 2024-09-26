import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { LinkButton } from "../../atoms";

export const TopNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to toggle mobile nav
  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  // Function to close mobile nav when clicking outside
  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsMobileNavOpen(false);
    }
  };

  useEffect(() => {
    // Attach the click event listener when the mobile nav is open
    if (isMobileNavOpen) {
      window.addEventListener("click", handleClickOutside);
    } else {
      // Remove the event listener when the mobile nav is closed
      window.removeEventListener("click", handleClickOutside);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileNavOpen]);
  return (
    <nav
      ref={navbarRef}
      className={`${
        scrolled ? "bg-white shadow-md" : "bg-white md:bg-transparent"
      }  fixed w-full z-20 top-0 left-0 `}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="" className="flex items-center">
          <img src="./logo.svg" className="mr-3 h-12" alt="Logo" />
        </a>
        <div className="flex md:none">
          <button
            onClick={toggleMobileNav}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            isMobileNavOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  ">
            <li>
              <NavLink
                onClick={toggleMobileNav}
                to="/"
                className={({ isActive }) =>
                  [
                    "block py-2 pl-3 pr-4 font-bold md:bg-transparent text-[#AE4E38]",
                    isActive ? "border-b-2 border-theme-brown" : null,
                  ]
                    .filter(Boolean)
                    .join(" ")
                }
                // className={`block py-2 pl-3 pr-4 font-bold md:bg-transparent ${({
                //   isActive,
                // }) => (isActive ? "text-green" : "text-white")}`}
              >
                Home
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                onClick={toggleMobileNav}
                to="/about-us"
                className={({ isActive }) =>
                  [
                    "block py-2 pl-3 pr-4 font-bold md:bg-transparent text-[#AE4E38]",
                    isActive ? "border-b-2 border-theme-brown" : null,
                  ]
                    .filter(Boolean)
                    .join(" ")
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={toggleMobileNav}
                to="/menu"
                className={({ isActive }) =>
                  [
                    "block py-2 pl-3 pr-4 font-bold md:bg-transparent text-[#AE4E38]",
                    isActive ? "border-b-2 border-theme-brown" : null,
                  ]
                    .filter(Boolean)
                    .join(" ")
                }
              >
                Menu
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                onClick={toggleMobileNav}
                to="/customer-service"
                className={({ isActive }) =>
                  [
                    "block py-2 pl-3 pr-4 font-bold md:bg-transparent text-[#AE4E38]",
                    isActive ? "border-b-2 border-theme-brown" : null,
                  ]
                    .filter(Boolean)
                    .join(" ")
                }
              >
                Customer Service
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                onClick={toggleMobileNav}
                to="/testimony"
                className={({ isActive }) =>
                  [
                    "block py-2 pl-3 pr-4 font-bold md:bg-transparent text-[#AE4E38]",
                    isActive ? "border-b-2 border-theme-brown" : null,
                  ]
                    .filter(Boolean)
                    .join(" ")
                }
              >
                Testimony
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                onClick={toggleMobileNav}
                to="/career"
                className={({ isActive }) =>
                  [
                    "block py-2 pl-3 pr-4 font-bold md:bg-transparent text-[#AE4E38]",
                    isActive ? "border-b-2 border-theme-brown" : null,
                  ]
                    .filter(Boolean)
                    .join(" ")
                }
              >
                Career
              </NavLink>
            </li> */}
            <li onClick={toggleMobileNav}>
              <LinkButton
                to="/order/menu"
                text="Order"
                className={
                  "bg-theme-brown text-white hover:border-2 hover:border-theme-brown hover:bg-transparent hover:text-[#AE4E38]"
                }
              />
            </li>
            <li onClick={toggleMobileNav}>
              <LinkButton
                to="/auth/member/login"
                text="Login"
                className={
                  "bg-transparent text-theme-brown border-2 border-[#AE4E38] hover:bg-[#AE4E38] hover:text-white"
                }
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
