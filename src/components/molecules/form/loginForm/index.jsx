/* eslint-disable no-unused-vars */
import { TextInput } from "../../../atoms";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../../../../validationSchema";
import { UseLogin } from "../../../../hooks/auth/hooks";
import Swal from "sweetalert2";
import { supabase } from "../../../../config/supabaseClient";
import { useState } from "react";

export const LoginForm = () => {
  const [error, setError] = useState(null);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // const { mutate, isLoading, isError, error, data: respData } = useLogin();

  // console.log(`respDataNEW`, respData);

  const onSubmit = async (data) => {
    try {
      // const response = await mutate(data);
      // console.log(`response`, respData);

      let { data: resp, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      // if (error) {
      //   setError(error);
      //   throw new Error(error.message);
      // }

      // return resp;
      if (error) {
        // Handle the login error here
        console.log(`Login Error`, error);
        Swal.fire({
          toast: true,
          title: error,
          icon: "error",
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
        setError(error);
      } else {
        // Login was successful
        console.log(`Login Success`, data);
        reset();
        Swal.fire({
          toast: true,
          title: "Login Success!",
          icon: "success",
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
        setError(null);
        // You can handle success here (e.g., redirect)
      }
    } catch (error) {
      setError(error);
      console.error("Login Error Form:", error);
      // Handle any unexpected errors
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5"
      >
        <TextInput
          type="email"
          label="Email"
          name="email"
          control={control}
          error={errors.email?.message}
          placeholder={"admin@mail.com"}
        />
        <TextInput
          type="password"
          label="Password"
          name="password"
          control={control}
          error={errors.password?.message}
          placeholder={"password"}
        />
        <button
          type="submit"
          className="text-white bg-theme-red focus:ring-theme-peach focus:ring-2 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 inline-block w-full hover:bg-white hover:text-theme-red hover:border-theme-red border-2 border-theme-red"
        >
          Login
          {/* {isLoading ? "Logging In..." : "Login"} */}
        </button>
      </form>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};
