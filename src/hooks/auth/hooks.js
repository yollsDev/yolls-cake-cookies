import { useMutation, useQuery } from "@tanstack/react-query";
import { loginRequest, signUpRequest, getUser } from "./request";
import { useEffect, useRef } from "react";
import { get } from "react-hook-form";

export const UseLogin = (handleError, handleSuccess) => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (params) => loginRequest(params),
    onError: (error) => {
      handleError(error);
      // console.log(`error`, error);
    },
    onSuccess: (data) => {
      handleSuccess(data);
    },
  });
};

export const UseSignUp = (handleError, handleSuccess) => {
  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: (params) => signUpRequest(params),
    onError: (error) => {
      handleError(error);
      // console.log(`error`, error);
    },
    onSuccess: (data) => {
      handleSuccess(data);
      // console.log(`data`, data);
    },
  });
};

export const UseUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    retry: false,
  });
};
