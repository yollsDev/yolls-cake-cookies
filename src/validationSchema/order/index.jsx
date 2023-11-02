import * as Yup from "yup";

export const orderValidationSchema = Yup.object().shape({
  tableNumber: Yup.string().required("Table Number is required"),
  name: Yup.string().required("Nam e is required").min(3, "Name is too short"),
  member: Yup.boolean().optional(),
  emailMember: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  useMemberPoint: Yup.boolean().optional(),
});
