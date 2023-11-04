import * as Yup from "yup";

export const orderValidationSchema = Yup.object().shape({
  tableNumber: Yup.string().required("Table Number is required"),
  name: Yup.string().required("Name is required").min(3, "Name is too short"),
});
