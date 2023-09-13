// import React from 'react'

import { LinkButton } from "../../../../components";
import { RegisterForm } from "../../../../components/molecules";

export const RegisterModule = () => {
  return (
    <div className="flex items-center justify-items-center flex-col py-10 md:py-14">
      <div className="w-full px-3 md:px-0 md:w-2/5 ">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-3">Welcome!</h1>
          <p>Let’s create your account!</p>
        </div>
        <div className="w-full bg-theme-pink p-10 rounded-xl">
          <h2 className="text-center text-3xl font-bold mb-8">Admin Sign Up</h2>
          <RegisterForm type={"ADMIN"} />
          <div className="text-center">
            <span>Already have an account?</span>
            <LinkButton
              text={"Login"}
              to={"/auth/admin/login"}
              className={"font-extrabold hover:underline px-1.5"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
