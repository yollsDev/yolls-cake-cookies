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
