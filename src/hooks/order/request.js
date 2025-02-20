import { supabase } from "../../config/supabaseClient";

export const CategoryRequest = async () => {
  try {
    let { data: category, error } = await supabase.from("category").select("*");

    return { category, error };
  } catch (error) {
    console.error("Category Request error request:", error.message);
    return { error: error.message };
  }
};

export const addOrderRequest = async (data) => {
  try {
    const orderData = {
      user_id: data.user_id,
      member_id: data.member_id,
      redeemedPoints: data.redeemPoints,
      name: data.name,
      tableNumber: data.tableNumber,
    };

    let { data: insertData, error } = await supabase
      .from("orders")
      .insert([orderData])
      .select();

    return { data: insertData, error };
  } catch (error) {
    console.error("Order Request error request:", error.message);
    return { error: error.message };
  }
};

export const addOrderItemRequest = async (data) => {
  try {
    const orderItemData = {
      order_id: data.order_id,
      menuItem_id: data.menuItem_id,
      quantity: data.quantity,
      subtotal: data.subtotal,
    };

    let { data: orderItem, error } = await supabase
      .from("orderItem")
      .insert([orderItemData]);

    return { orderItem, error };
  } catch (error) {
    console.error("Order Request error request:", error.message);
    return { error: error.message };
  }
};

export const addInvoiceRequest = async (data) => {
  try {
    const invoiceData = {
      order_id: data.order_id,
      totalAmount: data.totalAmount,
      paymentStatus: data.paymentStatus,
    };

    let { data: invoice, error } = await supabase
      .from("invoices")
      .insert([invoiceData])
      .select();

    return { invoice, error };
  } catch (error) {
    console.error("Invoice Request error request:", error.message);
    return { error: error.message };
  }
};

export const pointTransactionRequest = async (data) => {
  try {
    const pointTransactionData = {
      member_id: data.member_id,
      pointsChange: data.pointsChange,
      type: data.type,
    };

    let { data: pointTransaction, error } = await supabase
      .from("pointTransaction")
      .insert([pointTransactionData])
      .select();

    return { pointTransaction, error };
  } catch (error) {
    console.error("Point Transaction Request error request:", error.message);
    return { error: error.message };
  }
};

export const updatePointRequest = async (data) => {
  try {
    const { data: member, error } = await supabase
      .from("members")
      .update({
        points: data.points,
      })
      .eq("member_id", data.member_id);

    return { member, error };
  } catch (error) {
    console.error("Point Transaction Request error request:", error.message);
    return { error: error.message };
  }
};

export const MenuByCategoryRequest = async (category) => {
  try {
    let { data: menuItems, error } = await supabase
      .from("menuItems")
      .select("*")
      .ilike("category", category);

    return { menuItems, error };
  } catch (error) {
    console.error("Menu Request error request:", error.message);
    return { error: error.message };
  }
};

// Review
export const addReviewRequest = async (data) => {
  try {
    const reviewData = {
      menuItem_id: data.menuItem_id,
      rating: data.rating,
      comment: data.comment,
      user_id: data.user_id,
    };

    let { data: review, error } = await supabase
      .from("reviews")
      .insert([reviewData])
      .select();

    return { review, error };
  } catch (error) {
    console.error("Add Review Request error request:", error.message);
    return { error: error.message };
  }
};

export const getRestoReview = async () => {
  try {
    let { data, error } = await supabase
      .from("reviews")
      .select("*")
      .is("menuItem_id", null);

    return { data, error };
  } catch (error) {
    console.error("Get Resto Review Request error request:", error.message);
    return { error: error.message };
  }
};
