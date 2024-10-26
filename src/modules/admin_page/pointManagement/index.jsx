import { useState } from "react";
import { DashboardHeader } from "../../../components";
import { PointSettingForm } from "../../../components/molecules/form/pointSettingForm";
import {
  GetPointSettingsData,
  useInsertPointSettings,
} from "../../../hooks/point-settings/hooks";
import Swal from "sweetalert2";

export const PointManagementModule = () => {
  const { data: pointSettingsData, refetch } = GetPointSettingsData();
  const [isDisabled, setIsDisabled] = useState(true);
  const [resetForm, setResetForm] = useState(false);

  const { mutate: insertPointSettings } = useInsertPointSettings();
  const toggleEdit = () => setIsDisabled((prev) => !prev);

  const onSubmitNewSettings = async (data) => {
    const pointSettings = {
      amount_for_points: data.amount_for_points,
      points_per_amount: data.points_per_amount,
      notes: data.notes,
    };

    try {
      await insertPointSettings(pointSettings, {
        onSuccess: (data) => {
          Swal.fire({
            html:
              "<p class='font-bold text-sm'>Point Settings<p>" +
              "<p class='font-bold text-xl my-2'>Change Success!<p>" +
              "<p>Successfully change the point settings!<p>",
            icon: "success",
          });
          toggleEdit();
          refetch();
        },
      });
    } catch (error) {
      Swal.fire({
        toast: true,
        title: await error,
        icon: "error",
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <DashboardHeader title={"Point Management"} />
      <div className="px-5 p-8">
        <div className="px-4 ">
          <PointSettingForm
            isDisabled={isDisabled}
            pointSettingData={pointSettingsData}
            onSubmit={onSubmitNewSettings}
            resetForm={resetForm}
            toggleEdit={toggleEdit}
          />
        </div>
      </div>
    </div>
  );
};
