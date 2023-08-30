import React from "react";
// import TopNavbar from "../components/molecules/TopNavbar";
import { Outlet } from "react-router-dom";

function Guest() {
  return (
    <div>
      {/* <TopNavbar type={"guest"} /> */}
      <div className="pt-5">
        <Outlet />
      </div>
    </div>
  );
}

export default Guest;
