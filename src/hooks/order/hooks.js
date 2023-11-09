import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CategoryRequest,
  MenuByCategoryRequest,
  addInvoiceRequest,
  addOrderItemRequest,
  addOrderRequest,
  pointTransactionRequest,
  updatePointRequest,
} from "./request";

export const GetCategoryData = () =>
  useQuery({
    queryKey: ["category-get"],
    queryFn: async () => await CategoryRequest(),
  });

export const useInsertOrder = () => {
  return useMutation({
    mutationKey: ["insert-order"],
    mutationFn: async (data) => await addOrderRequest(data),
  });
};

export const useInsertOrderItem = () => {
  return useMutation({
    mutationKey: ["insert-order-item"],
    mutationFn: async (data) => await addOrderItemRequest(data),
  });
};

export const useInsertInvoice = () => {
  return useMutation({
    mutationKey: ["insert-invoice"],
    mutationFn: async (data) => await addInvoiceRequest(data),
  });
};

export const useInsertPointTransaction = () => {
  return useMutation({
    mutationKey: ["insert-point-transaction"],
    mutationFn: async (data) => await pointTransactionRequest(data),
  });
};

export const useUpdatePoint = () => {
  return useMutation({
    mutationKey: ["update-point"],
    mutationFn: async (data) => await updatePointRequest(data),
  });
};

export const useMenuByCategory = (category) =>
  useQuery({
    queryKey: ["get-menu-by-category", category],
    queryFn: async () => await MenuByCategoryRequest(category),
  });
