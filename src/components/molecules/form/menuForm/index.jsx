import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { menuValidationSchema } from "../../../../validationSchema";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  TextAreaInput,
  DropDownInput,
  LinkButton,
  IconImagePlaceholder,
} from "../../../atoms";

export const MenuForm = ({
  isDisabled,
  isEdit,
  isAdd,
  menuDetail,
  onSubmit,
  imageURL,
  handleImageChange,
  resetForm,
}) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(menuValidationSchema),
    mode: "all",
  });

  useEffect(() => {
    if (menuDetail && !isAdd) {
      setValue("itemName", isDisabled || isEdit ? menuDetail.itemName : "");
      setValue("price", isDisabled || isEdit ? menuDetail.price : "");
      setValue(
        "description",
        isDisabled || isEdit ? menuDetail.description : ""
      );
      setValue("category", isDisabled || isEdit ? menuDetail.category : "");
      setValue(
        "status",
        isDisabled || isEdit
          ? menuDetail.status.charAt(0).toUpperCase() +
              menuDetail.status.slice(1)
          : ""
      );
    } else {
      // If menuDetail is null or isAdd is true, clear the input values
      setValue("itemName", "");
      setValue("price", "");
      setValue("description", "");
      setValue("category", "");
      setValue("status", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuDetail, isDisabled, isEdit, isAdd, setValue]);

  useEffect(() => {
    if (resetForm) {
      reset();
      console.log("Form reset called");
      setValue("itemName", "");
      setValue("price", "");
      setValue("description", "");
      setValue("category", "");
      setValue("status", "");
      imageURL = null;
    }
  }, [resetForm, reset]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-5 grid-cols-1 md:gap-20 gap-5"
      >
        {isAdd || isEdit ? (
          <div className="w-full col-span-2">
            <div className="bg-cover bg-center bg-no-repeat aspect-square rounded-2xl">
              {imageURL ? (
                <img
                  src={imageURL}
                  alt="Menu Item"
                  className="max-w-full mb-4 object-cover rounded-2xl aspect-square"
                />
              ) : (
                <div className="mb-4 ">
                  <div className="bg-gray-300 rounded-xl flex flex-col justify-center items-center mb-3 aspect-square">
                    <IconImagePlaceholder size={100} color={"#fff"} />
                    <p className="text-gray-600 font-bold">
                      Image Not Available
                    </p>
                  </div>
                </div>
              )}
            </div>
            <label
              htmlFor="image"
              className="block font-bold bg-theme-pink hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full text-sm px-5 py-2.5 text-center mr-2 my-5"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange} // Call handleImageChange on file selection
              disabled={isDisabled}
              className="hidden"
            />
          </div>
        ) : isDisabled && menuDetail?.imageURL ? (
          <div className="mb-4 col-span-2">
            <div className="bg-cover bg-center bg-no-repeat aspect-square rounded-2xl">
              <img
                src={`https://dedwkjaekevsyqqfyona.supabase.co/storage/v1/object/public/menu_image/${menuDetail?.imageURL}`}
                alt="Menu Item"
                className="max-w-full mb-4 object-cover rounded-2xl aspect-square"
              />
            </div>
            <p className="text-center font-bold">
              Menu ID : {menuDetail?.menuItem_id}
            </p>
          </div>
        ) : (
          <div className="mb-4 col-span-2">
            <div className="bg-gray-300 rounded-xl flex flex-col justify-center items-center mb-3 aspect-square">
              <IconImagePlaceholder size={100} color={"#fff"} />
              <p className="text-gray-600 font-bold">Image Not Available</p>
            </div>
          </div>
        )}
        <>
          <div className="w-full bg-theme-pink px-11 py-10 rounded-xl shadow-lg grid col-span-3">
            <div className="grid grid-cols-2 w-full gap-4">
              <TextInput
                type="text"
                label="Name"
                name="itemName"
                control={control}
                error={errors.itemName?.message}
                placeholder={"ex: Red Velvet Cake"}
                disabled={isDisabled}
              />
              <TextInput
                type="number"
                label="Price"
                name="price"
                control={control}
                error={errors.price?.message}
                placeholder={"ex: 10000"}
                disabled={isDisabled}
              />
            </div>

            <div className="my-4">
              <TextAreaInput
                label="Description"
                name="description"
                control={control}
                error={errors.description?.message}
                placeholder={"ex: 10000"}
                rows={4}
                disabled={isDisabled}
              />
            </div>

            <div className="grid grid-cols-2 w-full gap-4">
              <TextInput
                type="text"
                label="Category"
                name="category"
                control={control}
                error={errors.category?.message}
                placeholder={"ex: Cake, Cookies, etc"}
                disabled={isDisabled}
              />
              <DropDownInput
                options={["Available", "Paused"]}
                value={watch("status")}
                onChange={(value) => setValue("status", value)}
                {...(isDisabled && { disabled: true })}
              />
            </div>
            <div>
              {isDisabled ? (
                <div className="flex gap-3 justify-end">
                  <LinkButton
                    className="text-white bg-theme-red hover:bg-red-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full w-24 h-full  p-1.5"
                    size={"sm"}
                    text={"Edit"}
                    to={"/admin/menu-edit/" + menuDetail?.menuItem_id}
                  />

                  <button className="text-white bg-theme-error hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 w-24 mb-2">
                    Delete
                  </button>
                </div>
              ) : (
                <div className="flex gap-3 justify-end">
                  <button
                    className="text-white bg-theme-red hover:bg-red-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 w-24 mb-2"
                    type="submit"
                  >
                    Save
                  </button>
                  <div onClick={() => navigate(-1)} className="h-fit">
                    <LinkButton
                      className="text-gray-400 bg-transparent hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 border-2 border-gray-400 font-medium rounded-full w-24 h-full  p-1.5"
                      size={"sm"}
                      text={"Cancel"}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
        {!isAdd && !menuDetail && <p>Loading menu details...</p>}
      </form>
    </div>
  );
};
