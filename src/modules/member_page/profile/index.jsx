import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { registerValidationSchema } from "../../../validationSchema";
import { useMemberByID } from "../../../hooks/admin/member-management/hooks";
import { UseUser, useUserByID } from "../../../hooks/auth/hooks";
import { useQueryClient } from "@tanstack/react-query";

export const ProfileModule = () => {
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
    resolver: yupResolver(registerValidationSchema),
    mode: "all",
  });

  useEffect(() => {
    if (memberData && user) {
      setValue("name", memberData.name);
      setValue("email", user.user.email);
      setValue("birthdate", memberData.birthDate);
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

  return (
    <div>
      <DashboardHeader title={"Profile"} />
      <div className="px-10 py-5 grid grid-cols-1 gap-6">
        <BackButton />

        <h1 className="text-2xl font-bold">{memberData?.name}</h1>
        <div className="w-full">
          <form
            // onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-5"
          >
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
              placeholder={"admin@mail.com"}
              disabled={true}
            />
            <TextInput
              type="date"
              label="Birth Date"
              name="birthdate"
              control={control}
              error={errors.birthdate?.message}
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
            <LinkButton
              className="text-white bg-theme-red hover:bg-red-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 w-24 mb-2"
              type="submit"
              text={"Edit"}
              to={"/member/profile-edit/" + user?.user.id}
            />
          </form>
          {/* {isError && <p className="text-red-500">{error.message}</p>} */}
        </div>
      </div>
    </div>
  );
};
