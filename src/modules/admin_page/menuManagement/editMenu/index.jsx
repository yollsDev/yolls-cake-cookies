import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  BackButton,
  DashboardHeader,
  MenuForm,
  IconImagePlaceholder,
} from "../../../../components";
import { GetMenuDetail, UseEditMenu } from "../../../../hooks/admin/hooks";
import Swal from "sweetalert2";

export const MenuEditModule = () => {
  const { id } = useParams();
  const [resetForm, setResetForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const { editMenuItem, errorEditingMenuItem, errorUploadingImage } =
    UseEditMenu();

  const { data } = GetMenuDetail(id);
  const menuDetail = data?.menuDetail;
  // console.log(menuDetail);

  const handleSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Menu Edited Successfully",
      timer: 2000,
    });

    setResetForm(true);
  };

  const handleError = (error) => {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: error,
      timer: 2000,
    });
  };

  const onSubmit = async (data) => {
    try {
      let imageUrl = null;

      if (selectedImage) {
        imageUrl = await editMenuItem(
          id,
          selectedImage,
          data,
          handleSuccess,
          handleError("Error editing menu item, Try Again with other image")
        );
      } else {
        imageUrl = await editMenuItem(
          id,
          menuDetail.imageUrl,
          data,
          handleSuccess
        );
      }

      data.imageURL = imageUrl;
      // Handle form submission success
      setResetForm(true);
      navigate(`/admin/menu-detail/${id}`);
    } catch (error) {
      // Handle form submission error
      console.error(
        "Error uploading image and submitting form:",
        error.message
      );
    }
  };

  // Define imageUrl based on whether an image is selected in MenuForm
  const imageURL = selectedImage ? URL.createObjectURL(selectedImage) : "";

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Extract the original file extension
    const originalFileName = file.name;
    const originalFileExtension = originalFileName.slice(
      ((originalFileName.lastIndexOf(".") - 1) >>> 0) + 2
    );

    // Generate a unique identifier (e.g., timestamp or random string)
    const uniqueIdentifier = Date.now(); // You can use a more robust method for production

    // Construct the new unique file name
    const newFileName = `newFileName_${uniqueIdentifier}.${originalFileExtension}`;
    const renamedFile = new File([file], newFileName, { type: file.type });

    setSelectedImage(renamedFile);
  };

  return (
    <div>
      <DashboardHeader title={"Menu Edit"} />
      <div className="px-10 py-5 grid grid-cols-1 gap-6">
        <BackButton />

        <h1 className="text-2xl font-bold">{menuDetail?.itemName}</h1>
        <div className="flex gap-10">
          <div className="w-full">
            <MenuForm
              isEdit={true}
              menuDetail={menuDetail}
              imageURL={imageURL}
              handleImageChange={handleImageChange}
              resetForm={resetForm}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
