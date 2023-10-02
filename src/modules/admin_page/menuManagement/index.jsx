import React, { useEffect, useState } from "react";
import {
  DashboardHeader,
  LinkButton,
  SearchBar,
  IconPlus,
} from "../../../components";
import { GetMenuData, useDeleteMenuItem } from "../../../hooks/admin/hooks";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Swal from "sweetalert2";

export const MenuManagementModule = () => {
  const { data } = GetMenuData();
  const [MenuItems, setMenuItems] = useState(
    data && data.menuItems ? data.menuItems : []
  );
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  useEffect(() => {
    {
      data && data.menuItems ? setMenuItems(data.menuItems) : [];
    }
  }, [data, MenuItems]);
  const { deleteMenuItem, isDeleting } = useDeleteMenuItem();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this menu item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMenuItem(id);
      }
    });
  };

  const columns = [
    {
      header: "No.",
      cell: ({ row }) => {
        return row.index + 1 + start;
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
        return row.original.created_at ? dateAdded.toLocaleDateString() : "-";
      },
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Actions",
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
          <button
            className={
              "text-white bg-theme-error hover:bg-red-500  focus:ring-4 focus:ring-red-300 font-medium r text-sm focus:outline-none rounded-full text-center items-center px-3 py-1.5 mb-2"
            }
            onClick={() => handleDelete(props.row.original.menuItem_id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setPaginatedData(
      MenuItems.slice(start, end).filter((item) =>
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [start, end, MenuItems, searchQuery]);

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalPages = Math.ceil(MenuItems.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <DashboardHeader title={"Menu Management"} />
      <div className="px-5 p-8">
        <div className="px-4 flex justify-between">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
        <hr className="h-0.5 my-8 bg-theme-brown border-0" />
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
          <div className="flex items-center gap-5 h-8 text-sm mt-5 justify-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700"
            >
              Previous
            </button>
            <div>
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
