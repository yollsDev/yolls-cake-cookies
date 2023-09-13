import {
  Sidebar,
  Footer,
  IconMenu,
  IconPayment,
  IconPerson,
} from "../components";
import { Outlet } from "react-router-dom";

export const Admin = () => {
  const menu = [
    {
      menu: "Menu Management",
      path: "/admin/menu-management",
      icon: <IconMenu size={25} />,
    },
    {
      menu: "Payment Management",
      path: "/admin/payment-management",
      icon: <IconPayment size={25} />,
    },
    {
      menu: "Member Data",
      path: "/admin/member-data",
      icon: <IconPerson size={25} />,
    },
  ];
  return (
    <div className="w-full min-h-screen flex ">
      <div className="w-fit">
        <Sidebar menu={menu} role={"ADMIN"} />
      </div>
      <div className="h-full w-full md:ml-64 ">
        <Outlet />
      </div>
    </div>
  );
};
