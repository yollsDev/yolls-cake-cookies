import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ConfirmPaymentRequest,
  DeleteOrderPayment,
  GetInvoiceOrder,
} from "./request";

export const UseGetInvoiceOrder = () =>
  useQuery({
    queryKey: ["get-invoice-order"],
    queryFn: async () => await GetInvoiceOrder(),
  });

export const useConfirmPayment = () => {
  return useMutation({
    mutationKey: ["confirm-payment"],
    mutationFn: async (invoiceId) => await ConfirmPaymentRequest(invoiceId),
  });
};

export const useDeleteOrderPayment = () => {
  return useMutation({
    mutationKey: ["delete-order-payment"],
    mutationFn: async (orderId) => await DeleteOrderPayment(orderId),
  });
};
