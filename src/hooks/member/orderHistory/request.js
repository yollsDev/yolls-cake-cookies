import { supabase } from "../../../config/supabaseClient";

export const getInvoices = async (order_id) => {
  try {
    let { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("order_id", order_id);

    return { data, error };
  } catch (error) {
    console.error("Invoice Request error request:", error.message);
    return { error: error.message };
  }
};

export const getOrder = async (member_id) => {
  try {
    let { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("member_id", member_id);

    return { data, error };
  } catch (error) {
    console.error("Order Request error request:", error.message);
    return { error: error.message };
  }
};

export const getOrderbyId = async (id) => {
  try {
    let { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("order_id", id);

    return { data, error };
  } catch (error) {
    console.error("Order Request error request:", error.message);
    return { error: error.message };
  }
};

export const getOrderItem = async (order_id) => {
  try {
    let { data, error } = await supabase
      .from("orderItem")
      .select("*")
      .eq("order_id", order_id);

    return { data, error };
  } catch (error) {
    console.error("Order Item error request:", error.message);
    return { error: error.message };
  }
};

export const getMenuItem = async (menuItem_id) => {
  try {
    let { data, error } = await supabase
      .from("menuItems")
      .select("*")
      .eq("menuItem_id", menuItem_id);

    return { data, error };
  } catch (error) {
    console.error("Menu Item error request:", error.message);
    return { error: error.message };
  }
};
