import React, { useEffect, useState } from "react";
import { IconImagePlaceholder, TextInput } from "../../atoms";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { orderValidationSchema } from "../../../validationSchema";
import { UseLogin } from "../../../hooks/auth/hooks";
import Swal from "sweetalert2";

export const OrderSidebar = ({ selectedMenu, addToCart, subtractFromCart }) => {
  const [isMember, setIsMember] = useState(false);
  const [useMemberPoint, setUseMemberPoint] = useState(false);

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
  };

  const handleUseMemberPointToggle = (event) => {
    setUseMemberPoint(event.target.checked);
  };

  let totalPrice = 0;
  selectedMenu.forEach((item) => {
    const itemPrice = item.price * item.quantity;
    totalPrice += itemPrice;
  });

  const handleError = async (error) => {
    // console.log(`Register Error`, error);
    Swal.fire({
      toast: true,
      title: await error.message,
      icon: "error",
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleSuccess = async (data) => {
    // console.log(`Register Success`);
    reset();
    if (data?.data?.user.user_metadata.role === "MEMBER") {
      Swal.fire({
        toast: true,
        title: "Login Success!",
        icon: "success",
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        toast: true,
        title: "You are not a Member!",
        text: "Please register as a member",
        icon: "error",
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const { mutate, isLoading, isError, error, data } = UseLogin(
    handleError,
    handleSuccess
  );

  const onVerifyMembership = async (data) => {
    try {
      await mutate(data);
    } catch (error) {
      Swal.fire({
        toast: true,
        title: await error,
        icon: "error",
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
      });
    }
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
                  label="Email"
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
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="text-white bg-theme-red focus:ring-theme-peach focus:ring-2 font-medium rounded-full text-sm px-5 py-1.5 text-center mb-2 inline-block  hover:bg-white hover:text-theme-red hover:border-theme-red border-2 border-theme-red"
                  >
                    Verify Membership
                    {/* {isLoading ? "Logging In..." : "Login"} */}
                  </button>
                </div>
                <div className="flex items-center mb-4 ml-2">
                  <input
                    id="useMemberPoint"
                    type="checkbox"
                    value="useMemberPoint"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 outline-none"
                    onChange={handleUseMemberPointToggle}
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
              const formattedPrice = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(item.price * item.quantity);
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
                  <div className="flex justify-between w-full font-bold">
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
                    <p>{formattedPrice}</p>
                  </div>
                </div>
              );
            })}
        </div>
        {useMemberPoint ? (
          <div className="w-full">
            <hr className="h-0.5 my-4 bg-theme-brown border-0" />
            <div className="grid grid-cols-2 text-right w-full gap-3">
              <p>SubTotal </p>
              <p>
                {totalPrice.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
              <p>Member Point Discount</p>
            </div>
            <hr className="h-0.5 my-4 bg-theme-brown border-0" />
            <div className="grid grid-cols-2 text-right gap-3 font-bold">
              <p>Total</p>
              <p>
                {totalPrice.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full font-bold">
            <hr className="h-0.5 my-4 bg-theme-brown border-0" />
            <div className="grid grid-cols-2 text-right gap-3 font-bold">
              <p>Total</p>
              <p>
                {totalPrice.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
          </div>
        )}
        <div className="w-full my-5">
          <button className="text-white bg-theme-red hover:bg-red-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full w-full text-sm p-1.5 mb-2">
            Order
          </button>
        </div>
      </aside>
    </div>
  );
};
