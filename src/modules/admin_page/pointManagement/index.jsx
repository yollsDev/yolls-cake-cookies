import { useState } from "react";
import { DashboardHeader } from "../../../components";
import { PointSettingForm } from "../../../components/molecules/form/pointSettingForm";
import { GetPointSettingsData } from "../../../hooks/point-settings/hooks";

export const PointManagementModule = () => {
  const { data: pointSettingsData } = GetPointSettingsData();
  const [isDisabled, setIsDisabled] = useState(true);

  console.log("pointSettingsData", pointSettingsData);

  return (
    <div>
      <DashboardHeader title={"Point Management"} />
      <div className="px-5 p-8">
        {/* {errorDelete && errorDelete.message} */}
        <div className="px-4 ">
          <PointSettingForm
            isDisabled={isDisabled}
            pointSettingData={pointSettingsData}
          />
        </div>
      </div>
    </div>
  );
};
