import React, { useEffect, useState } from "react";
import {
  DashboardHeader,
  LinkButton,
  SearchBar,
  IconPlus,
} from "../../../components";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Swal from "sweetalert2";
import {
  useAllMembers,
  useDeleteMember,
} from "../../../hooks/admin/member-management/hooks";
import { UseUser, useUserByID } from "../../../hooks/auth/hooks";
import { useQueryClient } from "@tanstack/react-query";

export const MemberDataModule = () => {
  const { data, error } = useAllMembers();
  const [MemberItem, setMemberItem] = useState(
    data && data.members ? data.members : []
  );
  const itemsPerPage = 10;

  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useDeleteMember();

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Member",
      text: "Are you sure you want to delete this member?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Attempt to confirm payment
          await mutate(id, {
            onError: (error) => {
              Swal.fire({
                title: "Error",
                text: { error },
                icon: "error",
              });
            },
            onSuccess: () => {
              queryClient.invalidateQueries(["all-member-get"]);
              Swal.fire({
                title: "Success!",
                text: "Member has been deleted successfully.",
                icon: "success",
              });
            },
          });
          // If successful, show a success notification
        } catch (error) {
          // Handle any errors that may occur during payment confirmation
          Swal.fire({
            title: "Error",
            text: "An error occurred while deleting the payment.",
            icon: "error",
          });
        }
      }
    });
  };

  useEffect(() => {
    {
      data && data.members ? setMemberItem(data.members) : [];
    }
  }, [data, MemberItem]);
  // const { deleteMenuItem, isDeleting } = useDeleteMenuItem();

  // const handleDelete = (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You will not be able to recover this menu item!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, delete it!",
  //     cancelButtonText: "Cancel",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // deleteMenuItem(id);
  //     }
  //   });
  // };

  const columns = [
    {
      header: "No.",
      cell: ({ row }) => {
        return row.index + 1 + start;
      },
    },
    {
      header: "Member ID",
      accessorKey: "member_id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      cell: ({ row }) => {
        return data ? data.userEmails[row.index] : "-";
      },
    },
    {
      header: "Points",
      accessorKey: "points",
    },
    {
      header: "Actions",
      cell: (props) => (
        <div className="flex gap-5 justify-center">
          <LinkButton
            to={"/admin/member-detail/" + props.row.original.user_id}
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
            onClick={() => handleDelete(props.row.original.member_id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setPaginatedData(
      MemberItem.slice(start, end).filter((item) => item.member_id)
    );
  }, [start, end, MemberItem]);

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalPages = Math.ceil(MemberItem.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <DashboardHeader title={"Member Data"} />
      <div className="px-5 p-8">
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
