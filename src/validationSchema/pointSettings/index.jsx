import * as Yup from "yup";

export const pointSettingsValidationSchema = Yup.object().shape({
  points_per_amount: Yup.number().required("Points per amount is required"),
  amount_for_points: Yup.number().required("Amount for points is required"),
  notes: Yup.string()
    .required("Notes is required")
    .min(10, "Notes is too short"),
});
