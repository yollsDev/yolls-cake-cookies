import { supabase } from "../../../config/supabaseClient";

export const getPoints = async (id) => {
  try {
    let { data, error } = await supabase
      .from("pointTransaction")
      .select("*")
      .eq("member_id", id);

    return { data, error };
  } catch (error) {
    console.error("Menu Request error request:", error.message);
    return { error: error.message };
  }
};
