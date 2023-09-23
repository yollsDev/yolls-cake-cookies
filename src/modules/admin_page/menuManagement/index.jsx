import React from "react";
import {
  DashboardHeader,
  LinkButton,
  SearchBar,
  IconPlus,
} from "../../../components";
import { GetMenuData } from "../../../hooks/admin/hooks";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

export const MenuManagementModule = () => {
  const { data } = GetMenuData();

  const MenuItems = data && data.menuItems ? data.menuItems : [];

  const columns = [
    {
      header: "No.",
      cell: ({ row }) => {
        return row.index + 1;
      },
    },
    {
      header: "ID",
      accessorKey: "menuItem_id",
    },
    {
      header: "Name",
      accessorKey: "itemName",
    },
    {
      header: "Harga",
      accessorKey: "price",
    },
    {
      header: "Date Added",
      accessorKey: "created_at",
      cell: ({ row }) => {
        const dateAdded = new Date(row.original.created_at);
        return row.original.created_at ? dateAdded.toLocaleDateString() : "-"; // Format the date
      },
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Actions",
      // Define the button element here (You can customize the button as needed)
      cell: (props) => (
        <div className="flex gap-5 justify-center">
          <LinkButton
            to={"/admin/menu-detail/" + props.row.original.menuItem_id}
            size={"sm"}
            className={
              "text-white bg-theme-red hover:bg-red-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm"
            }
            text={"Detail"}
          />

          <LinkButton
            to={"/admin/menu-add"}
            size={"sm"}
            className={
              "text-white bg-theme-error hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm"
            }
            text={"Delete"}
          />
        </div>
      ),
    },
  ];
  const table = useReactTable({
    data: MenuItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <DashboardHeader title={"Menu Management"} />
      <div className="px-5 p-8">
        <div className="px-4 flex justify-between">
          <SearchBar />
          <LinkButton
            withIcon={true}
            to={"/admin/menu-add"}
            className={
              "text-white bg-theme-red hover:bg-red-950 focus:ring-2 focus:outline-none focus:ring-theme-pink font-medium rounded-lg text-sm m-1.5"
            }
            text={"Add New Menu"}
            icon={<IconPlus size={20} />}
          />
        </div>
        <hr className=" h-0.5 my-8 bg-theme-brown border-0" />
        <div className="px-4 ">
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
        </div>
      </div>
    </div>
  );
};
