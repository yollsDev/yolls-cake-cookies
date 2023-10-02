import { supabase } from "../../../config/supabaseClient";

export const GetInvoiceOrder = async () => {
  try {
    let { data: invoice, error } = await supabase.from("invoices").select("*");

    return { invoice, error };
  } catch (error) {
    console.error("invoice Request error request:", error.message);
    return { error: error.message };
  }
};

export const ConfirmPaymentRequest = async (invoiceId) => {
  try {
    const { data, error } = await supabase
      .from("invoices")
      .update({
        paymentStatus: "CONFIRMED",
      })
      .eq("invoice_id", invoiceId);

    if (error) {
      throw new Error("Error confirming payment");
    }

    return data;
  } catch (error) {
    console.error("Error confirming payment request:", error.message);
    return { error: error.message };
  }
};

export const DeleteOrderPayment = async (orderId) => {
  try {
    const { data, error } = await supabase
      .from("invoices")
      .delete()
      .eq("order_id", orderId);

    if (error) {
      throw new Error("Error delete invoices");
    } else {
      const { data, error } = await supabase
        .from("orders")
        .delete()
        .eq("order_id", orderId);
      if (error) {
        throw new Error("Error delete order");
      } else {
        const { data, error } = await supabase
          .from("orderItem")
          .delete()
          .eq("order_id", orderId);
        if (error) {
          throw new Error("Error delete orderItem");
        }
        // return data;
      }
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error Delete order request:", error.message);
    return { error: error.message };
  }
};
