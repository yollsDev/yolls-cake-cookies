// import React from "react";
// import TopNavbar from "../components/molecules/TopNavbar";
import { Outlet } from "react-router-dom";
import { Footer, TopNavbar } from "../components";

function Guest() {
  return (
    <div className="w-full min-h-screen">
      <TopNavbar />
      <div className="">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Guest;
