import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { pointSettingsValidationSchema } from "../../../../validationSchema/pointSettings";
import { LinkButton, TextAreaInput, TextInput } from "../../../atoms";

export const PointSettingForm = ({
  isDisabled,
  pointSettingData,
  onSubmit,
  resetForm,
  toggleEdit,
}) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(pointSettingsValidationSchema),
    mode: "all",
  });

  useEffect(() => {
    if (pointSettingData) {
      setValue(
        "points_per_amount",
        isDisabled ? pointSettingData.data[0].points_per_amount : ""
      );
      setValue(
        "amount_for_points",
        isDisabled ? pointSettingData.data[0].amount_for_points : ""
      );
      setValue("notes", isDisabled ? pointSettingData.data[0].notes : "");
    } else {
      // If menuDetail is null or isAdd is true, clear the input values
      setValue("points_per_amount", "");
      setValue("amount_for_points", "");
      setValue("notes", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointSettingData, isDisabled, setValue]);

  useEffect(() => {
    if (resetForm) {
      reset();
      console.log("Form reset called");
      setValue("points_per_amount", "");
      setValue("amount_for_points", "");
      setValue("notes", "");
    }
  }, [resetForm, reset]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <>
          <div className="w-full bg-theme-pink px-11 py-10 rounded-xl shadow-lg grid col-span-3">
            <div className="grid grid-cols-2 w-full gap-4">
              <TextInput
                type="number"
                label="Points per Amount"
                name="points_per_amount"
                control={control}
                error={errors.points_per_amount?.message}
                placeholder={""}
                disabled={isDisabled}
              />
              <TextInput
                type="number"
                label="Amount for Points"
                name="amount_for_points"
                control={control}
                error={errors.amount_for_points?.message}
                placeholder={""}
                disabled={isDisabled}
              />
            </div>

            <div className="my-4">
              <TextAreaInput
                label="Notes"
                name="notes"
                control={control}
                error={errors.notes?.message}
                placeholder={""}
                rows={4}
                disabled={isDisabled}
              />
            </div>
            <div>
              {isDisabled ? (
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleEdit();
                    }}
                    className="text-white bg-theme-error hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 w-24 mb-2"
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <div className="flex gap-3 justify-end">
                  <button
                    className="text-white bg-theme-red hover:bg-red-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 w-24 mb-2"
                    type="submit"
                  >
                    Save
                  </button>
                  <div onClick={toggleEdit} className="h-fit">
                    <LinkButton
                      className="text-gray-400 bg-transparent hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 border-2 border-gray-400 font-medium rounded-full w-24 h-full  p-1.5"
                      size={"sm"}
                      text={"Cancel"}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
        {isDisabled && !pointSettingData && <p>Loading point details...</p>}
      </form>
    </div>
  );
};
