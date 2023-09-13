/* eslint-disable no-unused-vars */
import { TextInput } from "../../../atoms";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "../../../../validationSchema";
import { UseSignUp } from "../../../../hooks/auth/hooks";
import { useState } from "react";

export const RegisterForm = ({ type }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
    mode: "all",
    defaultValues: {
      name: "",
      city: "",
      birthdate: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: { type },
    },
  });

  const { mutate, isLoading, isError, error } = UseSignUp();

  const onSubmit = async (data) => {
    try {
      await mutate(data);
      console.log(`Register Success`, data);
      reset();
      // Registration successful, you can handle success here (e.g., redirect)
    } catch (error) {
      console.log(`Register Error`, error);
      // Registration failed, error contains the error message
    }
  };
  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
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
        <TextInput
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
        />

        <button
          type="submit"
          className="text-white bg-theme-red focus:ring-theme-peach focus:ring-2 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 inline-block w-full hover:bg-white hover:text-theme-red hover:border-theme-red border-2 border-theme-red col-span-2"
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      {isError && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};
