/* eslint-disable no-unused-vars */
import { TextInput } from "../../../atoms";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../../../../validationSchema";
import { UseLogin } from "../../../../hooks/auth/hooks";
import Swal from "sweetalert2";
import { supabase } from "../../../../config/supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = ({ role }) => {
  // const [error, setError] = useState(null);
  const navigate = useNavigate();
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

  const handleError = async (error) => {
    // console.log(`Register Error`, error);
    Swal.fire({
      toast: true,
      title: await error.message,
      icon: "error",
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleSuccess = async (data) => {
    // console.log(`Register Success`);
    reset();
    if (role === "ADMIN") {
      if (data?.data?.user.user_metadata.role === "ADMIN") {
        Swal.fire({
          toast: true,
          title: "Login Success!",
          icon: "success",
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/admin/menu-management");
        }, 1500);
      } else {
        Swal.fire({
          toast: true,
          title: "You are not an admin!",
          icon: "error",
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        toast: true,
        title: "Login Success!",
        icon: "success",
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/admin/menu-management");
      }, 1500);
    }
  };

  const { mutate, isLoading, isError, error, data } = UseLogin(
    handleError,
    handleSuccess
  );
  // console.log(`respDataNEW`, data);

  const onSubmit = async (data) => {
    try {
      await mutate(data);
    } catch (error) {
      Swal.fire({
        toast: true,
        title: await error,
        icon: "error",
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
      });
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
