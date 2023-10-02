import React, { useEffect, useState } from "react";
import { DashboardHeader, LinkButton } from "../../../components";
import { usePoints } from "../../../hooks/member/points/hooks";
import { UseUser } from "../../../hooks/auth/hooks";
import { useMemberByID } from "../../../hooks/admin/member-management/hooks";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useInvoice, useOrder } from "../../../hooks/member/orderHistory/hooks";
import { getInvoices } from "../../../hooks/member/orderHistory/request";

export const OrderHistoryModule = () => {
  const [pointData, setPointData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const queryClient = useQueryClient();
  const { data: user } = UseUser();

  const { data: memberData, isSuccess } = useMemberByID(user?.user.id);

  isSuccess &&
    queryClient.invalidateQueries(["get-order", memberData?.member?.member_id]);

  const { data, error } = useOrder(memberData?.member?.member_id);

  //   console.log(data);

  useEffect(() => {
    if (data?.data) {
      // Map over the order data and fetch invoices for each order
      Promise.all(
        data.data.map(async (item) => {
          const invoices = await getInvoices(item.order_id);
          return invoices?.data;
        })
      ).then((resolvedInvoices) => {
        const flattenedInvoices = resolvedInvoices.flat();
        setInvoiceData(flattenedInvoices);
      });
    }
  }, [data?.data]);

  //   const { data: invoiceData } = useInvoice(order_id);

  useEffect(() => {
    {
      data && data.data ? setPointData(data.data) : [];
    }
  }, [data, pointData]);

  const columns = [
    {
      header: "No.",
      cell: ({ row }) => {
        return row.index + 1;
      },
    },
    {
      header: "Order ID",
      accessorKey: "order_id",
    },
    {
      header: "Date",
      accessorKey: "invoiceDate",
      cell: ({ row }) => {
        const dateAdded = new Date(row.original.invoiceDate);
        return row.original.invoiceDate ? dateAdded.toLocaleDateString() : "-";
      },
    },
    {
      header: "Points",
      accessorKey: "totalAmount",
      cell: ({ row }) => {
        return row.original.totalAmount
          ? (row.original.totalAmount / 5000) * 100
          : "-";
      },
    },
    {
      header: "Total Price",
      accessorKey: "totalAmount",
    },
    {
      header: "Actions",
      cell: (props) => (
        <div className="flex gap-5 justify-center items-center">
          <LinkButton
            to={"/member/order-detail/" + props.row.original.order_id}
            size={"sm"}
            className={
              "text-white bg-theme-red hover:bg-red-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm"
            }
            text={"Detail"}
          />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: invoiceData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <DashboardHeader title={"Order History"} />
      {console.log(invoiceData)}{" "}
      <div className="px-5 p-8">
        <table className="w-full text-left text-sm sm:text-md bg-white shadow-lg rounded-xl">
          <thead className="font-bold">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b-4 border-theme-peach"
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-4 last:text-center">
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
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
