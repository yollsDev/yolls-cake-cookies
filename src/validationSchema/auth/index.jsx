import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(3, "Name is too short"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  city: Yup.string().required("City is required").min(3, "City is too short"),
  birthdate: Yup.string().required("Birthdate is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match"
  ),
});

export const profileValidation = Yup.object().shape({
  name: Yup.string().required("Name is required").min(3, "Name is too short"),
  city: Yup.string().required("City is required").min(3, "City is too short"),
  birthDate: Yup.string().required("Birthdate is required"),
});
