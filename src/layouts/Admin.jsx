import {
  Sidebar,
  Footer,
  IconMenu,
  IconPayment,
  IconPerson,
} from "../components";
import { Outlet, useNavigate } from "react-router-dom";
import { UseUser } from "../hooks/auth/hooks";
import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import { set } from "react-hook-form";

export const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
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

  const { data, isLoading } = UseUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (
        data?.user &&
        data?.user.user_metadata &&
        data?.user.user_metadata.role === "ADMIN"
      ) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        console.log("Redirecting to login page...");
        navigate("/auth/admin/login");
      }
    }
  }, [data, isLoading, navigate]);

  return isLoading ? (
    <div>Loading...</div>
  ) : isAdmin ? (
    <div className="w-full min-h-screen flex ">
      <div className="w-fit">
        <Sidebar menu={menu} role={"ADMIN"} />
      </div>
      <div className="h-full w-full md:ml-64 bg-[url('/admin_bg.svg')] bg-cover bg-top min-h-screen">
        <Outlet />
      </div>
    </div>
  ) : null;
};
