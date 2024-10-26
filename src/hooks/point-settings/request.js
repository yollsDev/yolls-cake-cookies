import { supabase } from "../../config/supabaseClient";

export const pointRequest = async () => {
  try {
    let { data, error } = await supabase
      .from("point_settings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    return { data, error };
  } catch (error) {
    console.error("Point Request error request:", error.message);
    return { error: error.message };
  }
};

export const insertPointSetting = async (data) => {
  try {
    const pointSetting = {
      amount_for_points: data.amount_for_points,
      points_per_amount: data.points_per_amount,
      notes: data.notes,
    };

    let { data: insertData, error } = await supabase
      .from("point_settings")
      .insert([pointSetting])
      .select();

    return { data: insertData, error };
  } catch (error) {
    console.error("Order Request error request:", error.message);
    return { error: error.message };
  }
};
