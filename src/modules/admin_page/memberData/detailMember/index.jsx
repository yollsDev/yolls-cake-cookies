import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BackButton,
  DashboardHeader,
  MenuForm,
  IconImagePlaceholder,
  TextInput,
} from "../../../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "../../../../validationSchema";
import { useMemberByID } from "../../../../hooks/admin/member-management/hooks";
import { useUserByID } from "../../../../hooks/auth/hooks";

export const MemberDetailModule = () => {
  const { id } = useParams();

  const { data } = useMemberByID(id);
  const memberData = data?.member;
  // console.log(data);

  const { data: dataUser } = useUserByID(memberData?.user_id);
  // console.log(dataUser);

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
    if (memberData && dataUser) {
      setValue("name", memberData.name);
      setValue("email", dataUser.users?.email);
      setValue("birthdate", memberData.birthDate);
      // setValue("city", memberData.city);
      setValue("points", memberData.points);
      setValue("phone", memberData.phone);
      console.log("phone", memberData);
      //   setValue(
      //     "status",
      //     menuDetail.status.charAt(0).toUpperCase() + menuDetail.status.slice(1)
      //   );
    } else {
      // If menuDetail is null or isAdd is true, clear the input values
      setValue("name", "");
      setValue("email", "");
      setValue("birthdate", "");
      // setValue("city", "");
      setValue("points", "");
      setValue("phone", "");
      //   setValue("status", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberData, setValue]);

  return (
    <div>
      <DashboardHeader title={"Member Detail"} />
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
              error={errors.email?.email}
              placeholder={"admin@mail.com"}
            />
            <TextInput
              type="date"
              label="Birth Date"
              name="birthdate"
              control={control}
              error={errors.birthdate?.message}
              placeholder={"dd/mm/yyyy"}
            />
            {/* <TextInput
              type="text"
              label="City"
              name="city"
              control={control}
              error={errors.city?.message}
              placeholder={"Jakarta/Bogor/etc.."}
            /> */}
            <TextInput
              type="text"
              label="Phone Number"
              name="phone"
              control={control}
              error={errors.phone?.message}
              placeholder={"+123123123"}
            />
            <TextInput
              type="text"
              label="Points"
              name="points"
              control={control}
              error={errors.points?.message}
              placeholder={"Points"}
              disabled={true}
            />
            {/* <TextInput
              type="password"
              label="Password"
              name="password"
              control={control}
              error={errors.password?.message}
              placeholder={"password"}
            />
            <TextInput
              type="password"
              label=" Confirmation Password"
              name="confirmPassword"
              control={control}
              error={errors.confirmPassword?.message}
              placeholder={"[same as password]"}
            /> */}
          </form>
          {/* {isError && <p className="text-red-500">{error.message}</p>} */}
        </div>
      </div>
    </div>
  );
};
