import React from "react";
import { useDeleteMenuItem } from "../../../../hooks/admin/hooks";

export const DeleteMenuButton = ({ id }) => {
  const { deleteMenuItem, isDeleting } = useDeleteMenuItem();

  const handleDelete = () => {
    deleteMenuItem(id);
  };

  return (
    <button onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Deleting..." : "Delete Menu Item"}
    </button>
  );
};
