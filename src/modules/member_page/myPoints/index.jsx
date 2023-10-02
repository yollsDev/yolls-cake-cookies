import React, { useEffect, useState } from "react";
import { DashboardHeader } from "../../../components";
import { usePoints } from "../../../hooks/member/points/hooks";
import { UseUser } from "../../../hooks/auth/hooks";
import { useMemberByID } from "../../../hooks/admin/member-management/hooks";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQueryClient } from "@tanstack/react-query";

export const MyPointsModule = () => {
  const [pointData, setPointData] = useState([]);
  const queryClient = useQueryClient();
  const { data: user } = UseUser();

  const { data: memberData, isSuccess } = useMemberByID(user?.user.id);

  isSuccess &&
    queryClient.invalidateQueries([
      "get-points",
      memberData?.member?.member_id,
    ]);

  const { data, error } = usePoints(memberData?.member?.member_id);
  // console.log(data);
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
      header: "Points",
      accessorKey: "pointsChange",
    },
    {
      header: "Status",
      accessorKey: "type",
      cell: ({ row }) => {
        return row.original.type
          ? row.original.type.charAt(0).toUpperCase() +
              row.original.type.slice(1).toLowerCase()
          : "-";
      },
    },
    {
      header: "Date",
      accessorKey: "transactionDate",
      cell: ({ row }) => {
        const dateAdded = new Date(row.original.transactionDate);
        return row.original.transactionDate
          ? dateAdded.toLocaleDateString()
          : "-";
      },
    },
  ];

  const table = useReactTable({
    data: pointData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <DashboardHeader title={"My Points"} />
      <div className="px-5 p-8">
        <div className="grid grid-cols-4  gap-8">
          <div className="bg-theme-peach py-8 mx-6 flex flex-col justify-center items-center text-white rounded-xl">
            <p className="text-4xl font-bold">4200</p>
            <p className="text-xl">Points</p>
          </div>
          <div className="col-span-3 rounded-xl bg-theme-pink py-5 px-8">
            <p className="font-bold mb-2">Notes</p>
            <p>Get 100 points for every Rp 5000,00 transaction in our outlet</p>
            <p>Use this points to get discount for your transaction</p>
            <p>Enjoy!</p>
          </div>
        </div>
        <hr className="h-0.5 my-8 bg-theme-brown border-0" />

        <table className="w-full text-left text-sm sm:text-md bg-white shadow-lg rounded-xl">
          <thead className="font-bold">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b-4 border-theme-peach"
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-4">
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
