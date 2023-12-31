import { useQuery } from "@tanstack/react-query";
import { getInvoices, getOrder, getOrderItem, getOrderbyId } from "./request";

export const useOrder = (id) =>
  useQuery({
    queryKey: ["get-order", id],
    queryFn: async () => await getOrder(id),
  });

export const useOrderById = (id) =>
  useQuery({
    queryKey: ["get-order-by-id", id],
    queryFn: async () => await getOrderbyId(id),
  });

export const useOrderItem = (id) =>
  useQuery({
    queryKey: ["get-order-item"],
    queryFn: async () => await getOrderItem(id),
  });

export const useInvoice = (id) =>
  useQuery({
    queryKey: ["get-invoice", id],
    queryFn: async () => await getInvoices(id),
  });
