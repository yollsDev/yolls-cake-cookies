import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  BackButton,
  DashboardHeader,
  MenuForm,
  IconImagePlaceholder,
  TextInput,
  LinkButton,
} from "../../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  profileValidation,
  registerValidationSchema,
} from "../../../validationSchema";
import { useMemberByID } from "../../../hooks/admin/member-management/hooks";
import { UseUser, useUserByID } from "../../../hooks/auth/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../config/supabaseClient";

export const ProfileEditModule = () => {
  const { id } = useParams();
  const { data: user } = UseUser();

  const { data, isSuccess } = useMemberByID(user?.user.id);

  const memberData = data?.member;

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(profileValidation),
    mode: "all",
  });

  useEffect(() => {
    if (memberData && user) {
      setValue("name", memberData.name);
      setValue("email", user.user.email);
      setValue("birthDate", memberData.birthDate);
      setValue("city", memberData.city);
      //   setValue(
      //     "status",
      //     menuDetail.status.charAt(0).toUpperCase() + menuDetail.status.slice(1)
      //   );
    } else {
      // If menuDetail is null or isAdd is true, clear the input values
      setValue("name", "");
      setValue("email", "");
      setValue("birthdate", "");
      setValue("city", "");
      //   setValue("status", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberData, setValue]);
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    console.log("data", data);
    try {
      const { name, birthDate, city } = data;

      // Update the user's profile in your Supabase table
      const { data: updatedProfile, error } = await supabase
        .from("members")
        .update({
          name,
          birthDate,
          city,
        })
        .eq("user_id", user.user.id); // You need to specify a condition to identify the user

      if (error) {
        console.error("Error updating profile:", error.message);
      } else {
        console.log("Profile updated successfully:", updatedProfile);
        navigate(`/member/profile`);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  });

  return (
    <div>
      <DashboardHeader title={"Profile Edit"} />
      <div className="px-10 py-5 grid grid-cols-1 gap-6">
        <BackButton />

        <h1 className="text-2xl font-bold">{memberData?.name}</h1>
        <div className="w-full">
          <form onSubmit={onSubmit} className="grid grid-cols-2 gap-5">
            <TextInput
              type="text"
              label="Name"
              name="name"
              control={control}
              error={errors.name?.message}
              placeholder={"John Doe"}
            />
            <TextInput
              type="email"
              label="Email"
              name="email"
              control={control}
              error={errors.email?.message}
              placeholder={"user@mail.com"}
              disabled={true}
            />
            <TextInput
              type="date"
              label="Birth Date"
              name="birthDate"
              control={control}
              error={errors.birthDate?.message}
              placeholder={"dd/mm/yyyy"}
            />
            <TextInput
              type="text"
              label="City"
              name="city"
              control={control}
              error={errors.city?.message}
              placeholder={"Jakarta/Bogor/etc.."}
            />
            <div className="flex gap-5">
              <button
                className="text-white bg-theme-red hover:bg-red-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 w-24 mb-2"
                type="submit"
              >
                Save
              </button>
              <div className=" h-fit">
                {" "}
                <LinkButton
                  className="text-gray-400 bg-transparent hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 border-2 border-gray-400 font-medium rounded-full w-24 h-full  p-1"
                  text={"Cancel"}
                  to={"/member/profile/"}
                />
              </div>
            </div>
          </form>
          {/* {isError && <p className="text-red-500">{error.message}</p>} */}
        </div>
      </div>
    </div>
  );
};
