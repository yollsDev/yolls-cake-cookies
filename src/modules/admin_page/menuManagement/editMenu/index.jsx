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

  const { editMenuItem } = UseEditMenu();

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

  const onSubmit = async (data) => {
    try {
      let imageUrl = null;

      if (selectedImage) {
        imageUrl = await editMenuItem(id, selectedImage, data, handleSuccess);
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

  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
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
