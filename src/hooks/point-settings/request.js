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
