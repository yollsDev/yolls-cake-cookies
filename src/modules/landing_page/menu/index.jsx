import { LinkButton, MenuCard } from "../../../components";

// import React from "react";

export const MenuModule = () => {
  return (
    <div>
      <section className="bg-theme-cream px-5 md:px-28 pt-28 pb-10 md:pb-14">
        <h1 className="font-extrabold text-6xl text-[#78002C] mb-10 text-center">
          Our Menu
        </h1>
        <div>
          <h2 className="font-bold font-theme-red text-4xl pb-2 border-b-4 border-theme-brown max-w-fit">
            Cake
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 md:gap-8 gap-2 mt-8">
            <MenuCard
              img={"/menu/menu_1.png"}
              name={"Red Velvet"}
              desc={
                "Lorem ipsum dolor sit amet consectetur. Lobortis sem magna nisi aliquet fermentum cursus sit. Quis egestas ut vitae risus a"
              }
            />
            <MenuCard
              img={"/menu/menu_1.png"}
              name={"Red Velvet"}
              desc={
                "Lorem ipsum dolor sit amet consectetur. Lobortis sem magna nisi aliquet fermentum cursus sit. Quis egestas ut vitae risus a"
              }
            />
            <MenuCard
              img={"/menu/menu_1.png"}
              name={"Red Velvet"}
              desc={
                "Lorem ipsum dolor sit amet consectetur. Lobortis sem magna nisi aliquet fermentum cursus sit. Quis egestas ut vitae risus a"
              }
            />
            <MenuCard
              img={"/menu/menu_1.png"}
              name={"Red Velvet"}
              desc={
                "Lorem ipsum dolor sit amet consectetur. Lobortis sem magna nisi aliquet fermentum cursus sit. Quis egestas ut vitae risus a"
              }
            />
          </div>
        </div>
      </section>
      <section className=" bg-theme-peach grid grid-cols-1 px-5 md:px-28 py-10 md:py-24 gap-10 text-center">
        <h2 className="font-bold text-3xl text-red">Want to Order Now?</h2>
        <div className="flex justify-center">
          <LinkButton
            text={"Order Now!"}
            to={"/menu"}
            className={
              "bg-theme-brown text-white hover:bg-white hover:text-theme-brown min-w-[150px]"
            }
          />
        </div>
      </section>
    </div>
  );
};
