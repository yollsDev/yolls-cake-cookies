import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  MenuRequest,
  MenuDetailRequest,
  AddMenuRequest,
  UploadImageRequest,
  EditMenuRequest,
} from "./request";

export const GetMenuData = () =>
  useQuery({
    queryKey: ["menu-get"],
    queryFn: async () => await MenuRequest(),
  });

export const GetMenuDetail = (id) =>
  useQuery({
    queryKey: ["menu-detail-get"],
    queryFn: async () => await MenuDetailRequest(id),
  });

export const PostNewMenu = (menu) =>
  useQuery({
    queryKey: ["menu-post"],
    queryFn: async () => await AddMenuRequest(menu),
  });

export const UseImageUploadAndFormSubmit = () => {
  const queryClient = useQueryClient();

  // Define a mutation for uploading an image
  const uploadImageMutation = useMutation(async (imageFile) => {
    // Simulate image upload; replace this with your actual upload logic
    const imageUrl = await UploadImageRequest(imageFile);
    return imageUrl;
  });

  // Define a mutation for adding a menu item
  const addMenuMutation = useMutation(async (formData) => {
    // Use the image URL from the previous mutation or set to null if no image uploaded
    const image = uploadImageMutation.isSuccess
      ? uploadImageMutation.data
      : null;

    // Simulate adding a menu item; replace this with your actual request logic
    const { data, error } = await AddMenuRequest({ ...formData, image });

    if (error) {
      throw new Error("Error adding menu item");
    }

    return data;
  });
  const uploadImageAndFormSubmit = async (
    imageFile,
    formData,
    handleSuccess,
    handleError
  ) => {
    try {
      uploadImageMutation.reset();
      addMenuMutation.reset();
      console.log(imageFile);

      let imageUrl = null;

      if (imageFile) {
        imageUrl = await uploadImageMutation.mutateAsync(imageFile);
      }

      formData.imageURL = imageUrl;

      // Add the menu item
      await addMenuMutation.mutateAsync(formData);

      // Invalidate and refetch relevant queries (if needed)
      queryClient.invalidateQueries("menuItems");

      console.log("Menu item added successfully:", addMenuMutation.data);
      handleSuccess();

      return addMenuMutation.data;
    } catch (error) {
      // Handle any errors that occur during the process
      console.error(
        "Error uploading image and submitting form:",
        error.message
      );
      throw error; // Rethrow the error to be handled by the component
    }
  };

  return {
    uploadImageAndFormSubmit,
    isUploadingImage: uploadImageMutation.isLoading,
    isAddingMenuItem: addMenuMutation.isLoading,
  };
};

export const UseEditMenu = () => {
  const queryClient = useQueryClient();

  const editMenuMutation = useMutation(async ({ menuId, updatedMenuData }) => {
    // Simulate editing a menu item; replace this with your actual request logic
    const data = await EditMenuRequest(menuId, updatedMenuData);

    // Invalidate and refetch relevant queries (if needed)
    queryClient.invalidateQueries("menuItems");

    return data;
  });

  const uploadImageMutation = useMutation(async (imageFile) => {
    // Simulate image upload; replace this with your actual upload logic
    const imageUrl = await UploadImageRequest(imageFile);
    return imageUrl;
  });

  const editMenuItem = async (
    menuId,
    imageFile,
    updatedMenuData,
    handleSuccess,
    handleError
  ) => {
    try {
      uploadImageMutation.reset();
      editMenuMutation.reset();
      console.log(updatedMenuData);

      let imageUrl = updatedMenuData.imageUrl;
      if (imageFile) {
        imageUrl = await uploadImageMutation.mutateAsync(imageFile);
      }

      updatedMenuData.imageURL = imageUrl;

      // Edit the menu item
      await editMenuMutation.mutateAsync({ menuId, updatedMenuData });

      console.log("Menu item edited successfully:", editMenuMutation.data);
      handleSuccess();

      return editMenuMutation.data;
    } catch (error) {
      // Handle any errors that occur during the process
      handleError();
      console.error("Error editing menu item:", error.message);
      throw error; // Rethrow the error to be handled by the component
    }
  };

  return {
    editMenuItem,
    isEditingMenuItem: editMenuMutation.isLoading,
  };
};
