import * as Yup from "yup";

export const menuValidationSchema = Yup.object().shape({
  itemName: Yup.string()
    .required("Name is required")
    .min(3, "Name is too short"),
  price: Yup.number().required("price is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description is too short"),
  category: Yup.string().required("Category is required"),
  status: Yup.string().required("Status is required"),
});
