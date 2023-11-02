import React, { useEffect, useState } from "react";
import { IconImagePlaceholder, TextInput } from "../../atoms";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { orderValidationSchema } from "../../../validationSchema";

export const OrderSidebar = ({ selectedMenu, addToCart, subtractFromCart }) => {
  const [isMember, setIsMember] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(orderValidationSchema),
    mode: "all",
  });

  const handleCheckboxChange = (event) => {
    setIsMember(event.target.checked);
    console.log("isMember", isMember);
  };

  return (
    <div className="w-full h-full min-h-screen">
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden "
      >
        <span className="sr-only">Open sidebar</span>
        <a href="/" className="flex items-center">
          <img src="/logo.svg" className="mr-3 h-12" alt="Logo" />
        </a>
      </button>

      <aside
        id="logo-sidebar"
        className="top-0 right-0 w-full transition-transform -translate-x-full sm:translate-x-0 bg-theme-pink px-5 pt-3 pb-6 h-full  min-h-screen"
        aria-label="Sidebar"
      >
        <h1 className="text-2xl font-bold">My Order</h1>
        <hr className="h-0.5 my-4 bg-theme-brown border-0" />
        <div>
          <form action="" className="flex flex-col gap-3">
            <TextInput
              type="text"
              label="Table Number"
              name="tableNumber"
              control={control}
              error={errors.category?.tableNumber}
              placeholder={"Ex. 1, 3,"}
              // disabled={isDisabled}
            />
            <TextInput
              type="text"
              label="Name"
              name="name"
              control={control}
              error={errors.category?.name}
              placeholder={"Bambang Martono..."}
              // disabled={isDisabled}
            />
            <div className="flex items-center mb-4 ml-2">
              <input
                id="isMember"
                type="checkbox"
                value="member"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 outline-none"
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="isMember"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                Member
              </label>
            </div>
            {isMember && (
              <>
                {" "}
                <TextInput
                  type="email"
                  label="Email Number"
                  name="emailMember"
                  control={control}
                  error={errors.category?.emailMember}
                  placeholder={"john.doe@#gmail.com"}
                  // disabled={isDisabled}
                />
                <TextInput
                  type="password"
                  label="Password"
                  name="password"
                  control={control}
                  error={errors.category?.password}
                  placeholder={"Password..."}
                  // disabled={isDisabled}
                />
                <div className="flex items-center mb-4 ml-2">
                  <input
                    id="useMemberPoint"
                    type="checkbox"
                    value="useMemberPoint"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 outline-none"
                  />
                  <label
                    htmlFor="useMemberPoint"
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    Use Member Point
                  </label>
                </div>
              </>
            )}
          </form>
        </div>
        <hr className="h-0.5 my-4 bg-theme-brown border-0" />
        <div>
          {selectedMenu &&
            selectedMenu?.map((item, index) => {
              return (
                <div className="flex gap-5" key={index}>
                  <div className="w-1/3">
                    {item.imageURL !== null ? (
                      <img
                        src={`https://dedwkjaekevsyqqfyona.supabase.co/storage/v1/object/public/menu_image/${item.imageURL}`}
                        alt={item.itemName}
                        className="w-full mb-4 object-cover rounded-lg aspect-[3/2]"
                      />
                    ) : (
                      <div className="bg-gray-300 rounded-lg flex flex-col justify-center items-center mb-3 aspect-[3/2] px-2 text-center w-full">
                        <IconImagePlaceholder size={20} color={"#fff"} />
                        <p className="text-gray-600 font-bold text-xs">
                          Image Not Available
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="">
                      <p>{item.itemName}</p>
                      <div className="flex gap-2 mt-2 text-xs">
                        <button
                          className="px-2 py-0.5 bg-white rounded-md"
                          onClick={() => subtractFromCart(item, index)}
                        >
                          -
                        </button>
                        <button className="px-2 py-0.5 bg-white rounded-md">
                          {item.quantity}
                        </button>
                        <button
                          className="px-2 py-0.5 bg-white rounded-md"
                          onClick={() => addToCart(item, index)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p>{item.price}</p>
                  </div>
                </div>
              );
            })}
        </div>
        <hr className="h-0.5 my-4 bg-theme-brown border-0" />
        <div>
          <h1>Sub Total and Member Point Discount</h1>
        </div>
        <hr className="h-0.5 my-4 bg-theme-brown border-0" />
        <div>
          <h1>Total</h1>
        </div>
        <div className="w-full my-5">
          <button className="text-white bg-theme-red hover:bg-red-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full w-full text-sm p-1.5 mb-2">
            Order
          </button>
        </div>
      </aside>
    </div>
  );
};
