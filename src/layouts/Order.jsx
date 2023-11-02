import { Outlet } from "react-router-dom";
import { OrderTopBar, OrderSidebar } from "../components";

export const Order = () => {
  return (
    <div className="w-full min-h-screen">
      <OrderTopBar />
      <Outlet />
    </div>
  );
};
