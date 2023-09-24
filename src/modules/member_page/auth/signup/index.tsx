import React from "react";
import { LinkButton, RegisterForm } from "../../../../components";

export const SignUpMemberModule = () => {
  return (
    <div className="flex items-center justify-items-center flex-col py-10 md:py-14">
      <div className="w-full px-3 md:px-0 md:w-2/5 ">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-3">Welcome!</h1>
          <p>Let’s create your account!</p>
        </div>
        <div className="w-full bg-theme-pink p-10 rounded-xl">
          <h2 className="text-center text-3xl font-bold mb-8">Sign Up</h2>
          <RegisterForm type={"MEMBER"} />
          <div className="text-center">
            <span>Already have an account?</span>
            <LinkButton
              text={"Login"}
              to={"/auth/member/login"}
              className={"font-extrabold hover:underline px-1.5"}
              withIcon={false}
              icon={undefined}
              size={undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
