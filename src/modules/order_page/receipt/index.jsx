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
import { LinkButton } from "../../../components";
import Swal from "sweetalert2";
import { GetPointSettingsData } from "../../../hooks/point-settings/hooks";

export const ReceiptModule = () => {
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
    return ItemName;
  };
  const [itemNames, setItemNames] = useState([]); // Use state to store item names

  useEffect(() => {
    if (orderItem && orderItem.data) {
      const getItemNames = async () => {
        const names = await Promise.all(
          orderItem.data.map((item) => handleGetItem(item.menuItem_id))
        );
        setItemNames(names);
      };
      getItemNames();
    }
    if (orderData && orderData.data) {
      setData(orderData);
    }
    console.log(itemNames);
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
        return itemNames[row.index] || "Loading...";
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
        navigate(`/order/review/${data?.data[0]?.order_id}`);
      }
    });
  };

  return (
    <div className=" px-5 md:px-28 gap-5 md:pt-32 pt-28 pb-10">
      <h1 className="font-bold text-4xl">PAYMENT</h1>
      <hr className="h-0.5 my-4 bg-theme-brown border-0" />
      <div className="flex gap-10 justify-center items-center">
        <div className="w-1/3">
          <p className="text-xl text-center mb-5">
            Please scan this QR to pay!
          </p>
          <img src="/qrYola.png" alt="" className="w-2/3 mx-auto" />{" "}
        </div>
        <div className="bg-white shadow-lg rounded-xl p-5 m-5 w-full">
          <div>
            <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-2">
              <h3 className="md:text-xl font-bold">Order ID : {id}</h3>
              <p className="md:text-xl font-bold">Date : {orderDate}</p>
              {data?.data[0]?.member_id && (
                <h3 className="md:text-xl font-bold">
                  Member ID : {data.data[0]?.member_id}
                </h3>
              )}
              {data?.data[0]?.member_id && (
                <h3 className="md:text-xl font-bold">
                  Member Name : {data?.data[0]?.name}
                </h3>
              )}
            </div>
          </div>
          <p className="text-xl font-bold">Your Order</p>
          <div className="text-left text-sm sm:text-md  flex flex-col items-end">
            {data && data?.data ? (
              <table className="w-full">
                <thead className="font-bold">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="md:px-6 px-2 py-4 last:text-center"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 border-b">
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="md:px-6 px-2 py-4 last:text-center"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>loading</p>
            )}
            <hr className="h-0.5 my-3 bg-theme-brown border-0 w-full" />
            <div className="p-5 grid grid-cols-2 mx-5 w-full md:w-3/5 text-right">
              <span className="font-bold md:text-lg">Total Price :</span>
              <span className="font-bold md:text-lg">
                {invoiceData?.data[0].totalAmount}
              </span>
              {data?.data[0]?.member_id && (
                <>
                  <span className="font-bold md:text-lg mt-5">
                    Points Earned :
                  </span>
                  {pointSettingsData ? (
                    <span className="font-bold md:text-lg mt-5">
                      {(invoiceData?.data[0].totalAmount /
                        pointSettingsData.data[0].amount_for_points) *
                        pointSettingsData.data[0].points_per_amount}
                    </span>
                  ) : (
                    <span className="font-bold md:text-lg mt-5">
                      {(invoiceData?.data[0].totalAmount / 5000) * 100}
                    </span>
                  )}
                </>
              )}
            </div>
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
          Confirm Payment
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
