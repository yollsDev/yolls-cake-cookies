import { Footer } from "../components";
import { Outlet } from "react-router-dom";

export const Auth = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="h-full">
        <Outlet />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};
