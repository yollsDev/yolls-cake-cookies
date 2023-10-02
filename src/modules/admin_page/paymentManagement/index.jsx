import React, { useEffect, useState } from "react";
import {
  DashboardHeader,
  LinkButton,
  SearchBar,
  IconPlus,
} from "../../../components";
import {
  UseGetInvoiceOrder,
  useConfirmPayment,
  useDeleteOrderPayment,
} from "../../../hooks/admin/payment-management/hooks";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Swal from "sweetalert2";

export const PaymentManagementModule = () => {
  const { data } = UseGetInvoiceOrder();
  const {
    data: deleteData,
    mutate: confirmPayment,
    isError,
    error,
  } = useConfirmPayment();
  const {
    mutate: deleteMutate,
    isError: isErrorDelete,
    error: errorDelete,
  } = useDeleteOrderPayment();
  const [MenuItems, setMenuItems] = useState(
    data && data.invoice ? data.invoice : []
  );
  // console.log("data", data);
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const confirmPaymentWithConfirmation = (invoiceId) => {
    Swal.fire({
      title: "Confirm Payment",
      text: "Are you sure you want to confirm this payment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Attempt to confirm payment
          await confirmPayment(invoiceId);
          // If successful, show a success notification
          Swal.fire({
            title: "Success!",
            text: "Payment has been confirmed successfully.",
            icon: "success",
          });
        } catch (error) {
          // Handle any errors that may occur during payment confirmation
          Swal.fire({
            title: "Error",
            text: "An error occurred while confirming the payment.",
            icon: "error",
          });
        }
      }
    });
  };

  const deleteOrderPayment = (orderId) => {
    Swal.fire({
      title: "Delete Payment",
      text: "Are you sure you want to delete this payment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Attempt to confirm payment
          await deleteMutate(orderId);
          // If successful, show a success notification
          Swal.fire({
            title: "Success!",
            text: "Payment has been deleted successfully.",
            icon: "success",
          });
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
      data && data.invoice ? setMenuItems(data.invoice) : [];
    }
  }, [data, MenuItems]);
  // const { deleteMenuItem, isDeleting } = useDeleteMenuItem();

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
        // deleteMenuItem(id);
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
      header: "Order ID",
      accessorKey: "order_id",
    },
    {
      header: "Price",
      accessorKey: "totalAmount",
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
      header: "Status",
      accessorKey: "paymentStatus",
      cell: ({ row }) => {
        return row.original.paymentStatus
          ? row.original.paymentStatus.charAt(0).toUpperCase() +
              row.original.paymentStatus.slice(1).toLowerCase()
          : "-";
      },
    },
    {
      header: "Actions",
      cell: (props) => (
        <div className="flex gap-5 justify-center">
          <button
            className={
              "text-white bg-theme-red hover:bg-red-950  focus:ring-4 focus:ring-red-300 font-medium r text-sm focus:outline-none rounded-full text-center items-center px-3 py-1.5 mb-2"
            }
            onClick={() =>
              confirmPaymentWithConfirmation(props.row.original.invoice_id)
            }
          >
            Confirm
          </button>
          <button
            className={
              "text-white bg-theme-error hover:bg-red-500  focus:ring-4 focus:ring-red-300 font-medium r text-sm focus:outline-none rounded-full text-center items-center px-3 py-1.5 mb-2"
            }
            onClick={() => deleteOrderPayment(props.row.original.order_id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setPaginatedData(
      MenuItems.slice(start, end).filter((item) => item.order_id)
    );
  }, [start, end, MenuItems]);

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
      <DashboardHeader title={"Payment Management"} />
      <div className="px-5 p-8">
        {errorDelete && errorDelete.message}
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
