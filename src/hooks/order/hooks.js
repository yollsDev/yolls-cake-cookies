import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CategoryRequest,
  addInvoiceRequest,
  addOrderItemRequest,
  addOrderRequest,
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
