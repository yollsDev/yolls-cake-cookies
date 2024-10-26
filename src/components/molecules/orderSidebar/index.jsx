import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { supabase } from "../../../config/supabaseClient";
import { UseLogin } from "../../../hooks/auth/hooks";
import {
  useInsertInvoice,
  useInsertOrder,
  useInsertOrderItem,
  useInsertPointTransaction,
  useUpdatePoint,
} from "../../../hooks/order/hooks";
import {
  loginValidationSchema,
  orderValidationSchema,
} from "../../../validationSchema";
import { IconImagePlaceholder, LinkButton, TextInput } from "../../atoms";
import { GetPointSettingsData } from "../../../hooks/point-settings/hooks";

export const OrderSidebar = ({ selectedMenu, addToCart, subtractFromCart }) => {
  const [isMember, setIsMember] = useState(false);
  const [useMemberPoint, setUseMemberPoint] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState("");
  const [member, setMember] = useState(null);
  const navigate = useNavigate();
  const { data: pointSettingsData } = GetPointSettingsData();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
    mode: "all",
  });

  const {
    control: orderControl,
    formState: { errors: orderErrors },
    handleSubmit: orderHandleSubmit,
    reset: orderReset,
  } = useForm({
    resolver: yupResolver(orderValidationSchema),
    mode: "all",
  });

  const handleCheckboxChange = (event) => {
    setIsMember(event.target.checked);
  };

  const handleUseMemberPointToggle = (event) => {
    setUseMemberPoint(event.target.checked);
    console.log(member);
  };

  useEffect(() => {
    !isMember && setUseMemberPoint(false);
  }, [isMember]);

  let totalPrice = 0;
  selectedMenu.forEach((item) => {
    const itemPrice = item.price * item.quantity;
    totalPrice += itemPrice;
  });

  const handleError = async (error) => {
    setVerifyMessage({ error: error.message });
    setIsMember(false);
  };

  const handleSuccess = async (data) => {
    reset();
    console.log("loginData", data?.data?.user.id);
    setMember(await fetchMember(data?.data?.user.id));
    if (data?.data?.user.user_metadata.role === "MEMBER") {
      setVerifyMessage("You are a Member!");
      setIsMember(true);
    } else {
      setVerifyMessage("You are not a Member");
      setIsMember(false);
    }
  };

  const {
    mutate,
    isLoading,
    isError,
    error,
    data: loginData,
  } = UseLogin(handleError, handleSuccess);

  const fetchMember = async (id) => {
    let { data: member, error } = await supabase
      .from("members")
      .select("*")
      .eq("user_id", id)
      .single();

    return { member, error };
  };

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

  const { mutate: insertOrderMutate } = useInsertOrder();

  const { mutate: insertOrderItemMutate } = useInsertOrderItem();

  const { mutate: insertInvoiceMutate } = useInsertInvoice();

  const { mutate: insertPointTransactionMutate } = useInsertPointTransaction();

  const { mutate: updatePointMutate } = useUpdatePoint();

  const onPlaceOrder = async (data) => {
    const orderData = {
      tableNumber: data.tableNumber,
      name: isMember ? member?.member?.name : data.name,
      user_id: isMember ? member?.member?.user_id : null,
      member_id: member?.member?.member_id || null,
      redeemPoints: useMemberPoint ? member?.member?.points : 0,
    };
    // console.log("orderData", orderData);
    try {
      // console.log(data);
      await insertOrderMutate(orderData, {
        onSuccess: (data) => {
          selectedMenu.forEach((item) => {
            const orderItemData = {
              order_id: data?.data[0]?.order_id,
              menuItem_id: item.menuItem_id,
              quantity: item.quantity,
              subtotal: item.price * item.quantity,
            };
            insertOrderItemMutate(orderItemData, {
              onSuccess: () => {
                orderReset();
              },
            });
          });
          const invoiceData = {
            order_id: data?.data[0]?.order_id,
            totalAmount: useMemberPoint
              ? totalPrice - member?.member?.points
              : totalPrice,
            paymentStatus: "UNCONFIRMED",
          };
          insertInvoiceMutate(invoiceData);

          if (totalPrice > 5000 && isMember) {
            if (pointSettingsData) {
              const pointTransactionData = {
                member_id: member?.member?.member_id,
                pointsChange:
                  (totalPrice / pointSettingsData.data[0].amount_for_points) *
                  pointSettingsData.data[0].points_per_amount,
                type: "EARN",
              };
              insertPointTransactionMutate(pointTransactionData);
            } else {
              const pointTransactionData = {
                member_id: member?.member?.member_id,
                pointsChange: (totalPrice / 5000) * 100,
                type: "EARN",
              };
              insertPointTransactionMutate(pointTransactionData);
            }
          }

          if (useMemberPoint) {
            const pointTransactionData = {
              member_id: member?.member?.member_id,
              pointsChange: member?.member?.points,
              type: "REDEEM",
            };
            insertPointTransactionMutate(pointTransactionData);
          }

          if (isMember) {
            if (pointSettingsData) {
              const pointData = {
                points:
                  (totalPrice / pointSettingsData.data[0].amount_for_points) *
                  pointSettingsData.data[0].points_per_amount,
                member_id: member?.member?.member_id,
              };
              updatePointMutate(pointData);
            } else {
              const pointData = {
                points: (totalPrice / 5000) * 100,
                member_id: member?.member?.member_id,
              };
              updatePointMutate(pointData);
            }
          }
          Swal.fire({
            html:
              "<p class='font-bold text-sm'>ORDER ID<p>" +
              `<p class='font-bold text-3xl my-2'>#${data?.data[0]?.order_id}</p>` +
              "<p class='font-bold text-xl my-2'>Order Success!<p>" +
              "<p>Please wait, your food will be delivered to your tabel!<p>",
            icon: "success",
            confirmButtonText: "See your receipt",
            confirmButtonColor: "#78002C",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(`/order/invoice/${data?.data[0]?.order_id}`);
            }
          });
        },
      });
      localStorage.removeItem("selectedMenu");
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
    <div className={`w-full h-screen min-h-screen fixed z-20 bottom-0`}>
      <aside
        id="logo-sidebar"
        className={` w-full transition-transform sm:translate-x-0 bg-theme-pink px-5 pt-24 md:pt-5 h-screen fixed overflow-y-scroll  min-h-screen `}
        aria-label="Sidebar"
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">My Order</h1>
          <LinkButton
            to="/auth/member/login"
            text="Login"
            className={
              "bg-transparent text-theme-brown border-2 border-[#AE4E38] hover:bg-[#AE4E38] hover:text-white"
            }
          />
        </div>
        <hr className="h-0.5 my-4 bg-theme-brown border-0" />
        <div>
          <div>
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
                Order as Member
              </label>
            </div>
          </div>
          {isMember && (
            <form onSubmit={handleSubmit(onVerifyMembership)}>
              <TextInput
                type="email"
                label="Email"
                name="email"
                control={control}
                error={errors.email?.message}
                placeholder={"john.doe@#gmail.com"}
                // disabled={isDisabled}
              />

              <TextInput
                type="password"
                label="Password"
                name="password"
                control={control}
                error={errors.password?.message}
                placeholder={"Password..."}
                // disabled={isDisabled}
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-white bg-theme-red focus:ring-theme-peach focus:ring-2 font-medium rounded-full text-sm px-5 py-1.5 text-center my-2 inline-block  hover:bg-white hover:text-theme-red hover:border-theme-red border-2 border-theme-red"
                >
                  Verify Membership
                  {/* {isLoading ? "Logging In..." : "Login"} */}
                </button>
              </div>
            </form>
          )}
          <div className="bg-white text-center font-bold text-red-500 mx-5 rounded-xl py-3 my-5">
            <span>{verifyMessage && verifyMessage}</span>
          </div>
          {isMember && (
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
          )}
        </div>
        <form
          onSubmit={orderHandleSubmit(onPlaceOrder)}
          className="flex flex-col gap-3"
        >
          <TextInput
            type="text"
            label="Table Number"
            name="tableNumber"
            control={orderControl}
            error={orderErrors.tableNumber?.message}
            placeholder={"Ex. 1, 3,"}
          />

          <TextInput
            type="text"
            label="Name"
            name="name"
            control={orderControl}
            error={orderErrors.name?.message}
            placeholder={"Bambang Martono..."}
          />

          <hr className="h-0.5 my-4 bg-theme-brown border-0" />
          <div className="">
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
                {member && (
                  <p>
                    {member.member?.points?.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                )}
              </div>
              <hr className="h-0.5 my-4 bg-theme-brown border-0" />
              <div className="grid grid-cols-2 text-right gap-3 font-bold">
                <p>Total</p>
                <p>
                  {(totalPrice - member?.member?.points).toLocaleString(
                    "id-ID",
                    {
                      style: "currency",
                      currency: "IDR",
                    }
                  )}
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
          <div className="w-full my-5 pb-24">
            <button
              type="submit"
              className="text-white bg-theme-red hover:bg-red-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full w-full text-sm p-1.5 mb-2"
            >
              Order
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
};
