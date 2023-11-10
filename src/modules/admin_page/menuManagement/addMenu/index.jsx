import React, { useRef, useState } from "react";
import { BackButton, DashboardHeader, MenuForm } from "../../../../components";
import { UseImageUploadAndFormSubmit } from "../../../../hooks/admin/hooks";
import { set, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const MenuAddModule = () => {
  // Define selectedImage state
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [resetForm, setResetForm] = useState(false);

  const { uploadImageAndFormSubmit } = UseImageUploadAndFormSubmit();

  const menuFormRef = useRef();

  const handleSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Menu Added Successfully",
      timer: 2000,
    });

    setResetForm(true);
    navigate(`/admin/menu-management`);
  };
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let imageUrl = null;

      if (selectedImage) {
        imageUrl = await uploadImageAndFormSubmit(
          selectedImage,
          data,
          handleSuccess
        );
      } else {
        imageUrl = await uploadImageAndFormSubmit(null, data, handleSuccess);
      }

      data.imageURL = imageUrl;
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

  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div>
      <DashboardHeader title={"Add Menu"} />
      <div className="px-10 py-5 grid grid-cols-1 gap-6">
        <BackButton />

        <div className="w-full">
          <MenuForm
            isAdd={true}
            onSubmit={onSubmit}
            imageURL={imageURL}
            handleImageChange={handleImageChange}
            // formRef={menuFormRef}
            resetForm={resetForm}
          />
        </div>
      </div>
    </div>
  );
};
