import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useInvoice,
  useOrderById,
  useOrderItem,
} from "../../../hooks/member/orderHistory/hooks";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getMenuItem } from "../../../hooks/member/orderHistory/request";
import {
  IconImagePlaceholder,
  LinkButton,
  TextAreaInput,
} from "../../../components";
import Swal from "sweetalert2";
import { GetPointSettingsData } from "../../../hooks/point-settings/hooks";
import StarRatingInput from "../../../components/molecules/starRatingInput";

export const ReviewModule = () => {
  const { id } = useParams();
  const { data: invoiceData } = useInvoice(id);
  const { data: orderData } = useOrderById(id);
  const { data: orderItem, isLoading, isError, error } = useOrderItem(id);
  const navigate = useNavigate();
  const { data: pointSettingsData } = GetPointSettingsData();

  const [data, setData] = useState();
  console.log(data);
  const orderDate = new Date(data?.data[0]?.orderDate).toLocaleDateString();

  const handleGetItem = async (id) => {
    const item = await getMenuItem(id);
    const ItemName = item?.data[0]?.itemName;
    const ItemImage = item?.data[0]?.imageURL;
    const itemData = {
      itemNames: ItemName,
      itemImage: ItemImage,
    };
    return itemData;
  };
  const [itemData, setItemData] = useState([]); // Use state to store item names

  useEffect(() => {
    if (orderItem && orderItem.data) {
      const getItemNames = async () => {
        const itemMenuData = await Promise.all(
          orderItem.data.map((item) => handleGetItem(item.menuItem_id))
        );
        setItemData(itemMenuData);
      };
      getItemNames();
    }
    if (orderData && orderData.data) {
      setData(orderData);
    }
  }, [orderData, orderData?.data, orderItem, orderItem?.data]);

  const columns = [
    {
      header: "No.",
      cell: ({ row }) => {
        return row.index + 1;
      },
    },
    {
      header: "Items",
      accessorKey: "itemName",
      cell: ({ row }) => {
        return "Loading...";
      },
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
    },
    {
      header: "Price",
      accessorKey: "subtotal",
    },
  ];

  const table = useReactTable({
    data: orderItem?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const paymentConfirmation = () => {
    Swal.fire({
      html:
        `<p class='font-bold text-3xl my-2'>Thank You!</p>` +
        "<p>Please wait for your order!<p>",
      icon: "success",
      confirmButtonText: "Ok",
      confirmButtonColor: "#78002C",
    }).then((result) => {
      if (result.isConfirmed) {
        // navigate(`/order/invoice/${data?.data[0]?.order_id}`);
        navigate(`/order/menu`);
      }
    });
  };

  const handleRating = (index, rating) => {
    console.log(`Item ${index} rated: ${rating} stars`);
  };

  return (
    <div className=" px-5 md:px-28 gap-5 md:pt-32 pt-28 pb-10">
      <h1 className="font-bold text-4xl">REVIEW</h1>
      <hr className="h-0.5 my-4 bg-theme-brown border-0" />
      <div className="">
        <div className="w-full">
          <p className="text-xl mb-5">Add your review for us!</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-5 m-5 w-3/4 mx-auto">
          {data && data?.data ? (
            itemData.map((item, index) => (
              <div key={index}>
                <div className="flex gap-5 justify-between">
                  <div className="flex gap-5">
                    {item.imageURL !== null ? (
                      <img
                        src={`https://dedwkjaekevsyqqfyona.supabase.co/storage/v1/object/public/menu_image/${item.itemImage}`}
                        alt={item.itemName}
                        className="w-24 object-cover rounded-lg aspect-square"
                      />
                    ) : (
                      <div className="bg-gray-300 rounded-lg flex flex-col justify-center items-center aspect-square w-24">
                        <IconImagePlaceholder size={100} color={"#fff"} />
                        <p className="text-gray-600 font-bold text-center">
                          Image Not Available
                        </p>
                      </div>
                    )}

                    <div>
                      <p className="text-lg font-bold mb-2">{item.itemNames}</p>
                      <StarRatingInput
                        onRate={(rating) => handleRating(index, rating)}
                      />
                    </div>
                  </div>

                  <textarea
                    id={"review-comment"}
                    placeholder={"comments"}
                    rows="4"
                    className="bg-white border border-theme-pink text-gray-900 text-sm rounded-lg focus:ring-theme-pink focus:border-2 focus:border-theme-peach block w-1/2 p-2.5"
                  />
                </div>
                <hr className="h-0.5 my-4 bg-theme-brown border-0 w-full" />
              </div>
            ))
          ) : (
            <p>loading</p>
          )}
        </div>

        <div className="bg-white shadow-lg rounded-xl p-5 m-5 w-3/4 mx-auto">
          <div>
            <div className="flex gap-5 flex-col justify-center items-center">
              <p className="text-lg font-bold mb-2">
                Review for Yolls Cake & Cookies
              </p>
              <StarRatingInput onRate={(rating) => console.log(rating)} />
              <textarea
                id={"review-comment"}
                placeholder={"comments"}
                rows="4"
                className="bg-white border border-theme-pink text-gray-900 text-sm rounded-lg focus:ring-theme-pink focus:border-2 focus:border-theme-peach block w-1/2 p-2.5"
              />
            </div>
            <hr className="h-0.5 my-4 bg-theme-brown border-0 w-full" />
          </div>
        </div>
      </div>

      <div className=" w-full flex justify-center items-center flex-col py-5 gap-5">
        {/* <div className="w-[80%] md:w-1/2 bg-theme-peach text-white text-center rounded-2xl py-5">
          <p>Please remember your ORDER ID to pay at the cashier</p>
        </div> */}
        <button
          className="bg-theme-red text-white hover:bg-white hover:text-theme-red hover:border-theme-red border-2 border-theme-red rounded-full px-5 py-2"
          onClick={paymentConfirmation}
        >
          Submit Review
        </button>
        {/* <LinkButton
          size="md"
          text={"Back to Order Page"}
          withIcon={false}
          to={"/order/menu"}
          className={
            "bg-theme-red text-white hover:bg-white hover:text-theme-red hover:border-theme-red border-2 border-theme-red rounded-full"
          }
        /> */}
      </div>
    </div>
  );
};
