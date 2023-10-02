import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useInvoice,
  useOrder,
  useOrderItem,
} from "../../../hooks/member/orderHistory/hooks";
import { BackButton, DashboardHeader } from "../../../components";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getMenuItem } from "../../../hooks/member/orderHistory/request";

export const OrderDetailModule = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useOrderItem(id);
  const { data: invoiceData } = useInvoice(id);
  const { data: orderData } = useOrder(id);
  console.log(orderData);
  const orderDate = new Date(orderData?.data[0].orderDate).toLocaleDateString();

  const handleGetItem = async (id) => {
    const item = await getMenuItem(id);
    const ItemName = item?.data[0].itemName;
    return ItemName;
  };
  const [itemNames, setItemNames] = useState([]); // Use state to store item names

  useEffect(() => {
    // Fetch item names when data is available
    if (data && data.data) {
      const getItemNames = async () => {
        const names = await Promise.all(
          data.data.map((item) => handleGetItem(item.menuItem_id))
        );
        setItemNames(names);
      };
      getItemNames();
    }
    console.log(itemNames);
  }, [data, data?.data]);

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
    data: data?.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <DashboardHeader title={"Order Detail"} />
      <div className="px-5 p-8">
        <BackButton />

        <div className="mt-5">
          <h3 className="text-xl font-bold">Order ID : {id}</h3>
          <p className="text-xl font-bold">Date : {orderDate}</p>
        </div>
      </div>
      <div className="p-8">
        <p className="text-xl font-bold">Your Order</p>
        <div className="text-left text-sm sm:text-md bg-white shadow-lg rounded-xl flex flex-col items-end">
          {data && data?.data ? (
            <table className="w-full ">
              <thead className="font-bold">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-4 last:text-center"
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
                      <td key={cell.id} className="px-6 py-4 last:text-center">
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
          <div className="p-5 grid grid-cols-2 mx-5 w-3/5 text-right">
            <span className="font-bold text-lg">Total Price :</span>
            <span className="font-bold text-lg">
              {invoiceData?.data[0].totalAmount}
            </span>
            <span className="font-bold text-lg mt-5">Points Earned :</span>
            <span className="font-bold text-lg mt-5">
              {(invoiceData?.data[0].totalAmount / 5000) * 100}
            </span>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <div>
    //     <h3>Order ID : {id}</h3>
    //     <p>Date : {orderDate}</p>
    //   </div>
    // </div>
  );
};
