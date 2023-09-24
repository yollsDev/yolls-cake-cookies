import {
  Sidebar,
  Footer,
  IconGift,
  IconHistory,
  IconPerson,
} from "../components";
import { Outlet, useNavigate } from "react-router-dom";
import { UseUser } from "../hooks/auth/hooks";
import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import { set } from "react-hook-form";

export const Member = () => {
  const [isMember, setIsMember] = useState(false);
  const menu = [
    {
      menu: "My Points",
      path: "/member/my-points",
      icon: <IconGift size={25} />,
    },
    {
      menu: "Order History",
      path: "/member/order-history",
      icon: <IconHistory size={25} />,
    },
    {
      menu: "Profile",
      path: "/member/profile",
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
        data?.user.user_metadata.role === "MEMBER"
      ) {
        setIsMember(true);
      } else {
        setIsMember(false);
        console.log("Redirecting to login page...");
        navigate("/auth/member/login");
      }
    }
  }, [data, isLoading, navigate]);

  return isLoading ? (
    <div>Loading...</div>
  ) : isMember ? (
    <div className="w-full min-h-screen flex ">
      <div className="w-fit">
        <Sidebar menu={menu} role={"MEMBER"} />
      </div>
      <div className="h-full w-full md:ml-64 bg-[url('/admin_bg.svg')] bg-cover bg-top min-h-screen">
        <Outlet />
      </div>
    </div>
  ) : null;
};
