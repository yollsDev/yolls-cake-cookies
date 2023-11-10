import { supabase } from "../../config/supabaseClient";

export const MenuRequest = async () => {
  try {
    let { data: menuItems, error } = await supabase
      .from("menuItems")
      .select("*")
      .order("menuItem_id", { ascending: false });

    return { menuItems, error };
  } catch (error) {
    console.error("Menu Request error request:", error.message);
    return { error: error.message };
  }
};

export const MenuDetailRequest = async (id) => {
  try {
    let { data: menuDetail, error } = await supabase
      .from("menuItems")
      .select("*")
      .eq("menuItem_id", id)
      .single();

    return { menuDetail, error };
  } catch (error) {
    console.error("Menu Request error request:", error.message);
    return { error: error.message };
  }
};

export const UploadImageRequest = async (imageFile) => {
  const { data, error } = await supabase.storage
    .from("menu_image")
    .upload(`images/${imageFile.name}`, imageFile);

  if (error) {
    throw new Error("Error uploading image");
  }

  return data.path;
};

export const AddMenuRequest = async (menu) => {
  try {
    const menuData = {
      itemName: menu.itemName,
      description: menu.description,
      price: menu.price,
      status: menu.status,
      category: menu.category,
    };

    if (menu.imageURL) {
      menuData.imageURL = menu.imageURL; // Include the image URL if it exists
    }

    const { data, error } = await supabase.from("menuItems").insert([menuData]);

    return { data, error };
  } catch (error) {
    console.error("Add Menu error request:", error.message);
    return { error: error.message };
  }
};

export const EditMenuRequest = async (menuId, updatedMenuData) => {
  try {
    const { data, error } = await supabase
      .from("menuItems")
      .update({
        itemName: updatedMenuData.itemName,
        description: updatedMenuData.description,
        price: updatedMenuData.price,
        status: updatedMenuData.status,
        category: updatedMenuData.category,
        imageURL: updatedMenuData.imageURL,
      })
      .eq("menuItem_id", menuId);

    if (error) {
      throw new Error("Error editing menu item");
    }

    return data;
  } catch (error) {
    console.error("Edit Menu error request:", error.message);
    return { error: error.message };
  }
};

export const deleteMenuItemRequest = async (id) => {
  try {
    const { data, error } = await supabase
      .from("menuItems")
      .delete()
      .eq("menuItem_id", id);

    console.log("id", id);

    return { data, error };
  } catch (error) {
    console.error("Menu Delete error request:", error.message);
    return { error: error.message };
  }
};
