import { useMutation } from "@tanstack/react-query";
import { loginRequest, signUpRequest } from "./request";

export const UseLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (params) => loginRequest(params),
  });
};

export const UseSignUp = () => {
  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: (params) => signUpRequest(params),
  });
};
