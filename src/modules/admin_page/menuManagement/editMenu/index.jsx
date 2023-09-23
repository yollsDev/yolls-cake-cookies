import React from "react";
import { useParams } from "react-router-dom";
import {
  BackButton,
  DashboardHeader,
  MenuForm,
  IconImagePlaceholder,
} from "../../../../components";
import { GetMenuDetail } from "../../../../hooks/admin/hooks";

export const MenuEditModule = () => {
  const { id } = useParams();

  const { data } = GetMenuDetail(id);
  const menuDetail = data?.menuDetail;
  console.log(menuDetail);
  return (
    <div>
      <DashboardHeader title={"Menu Edit"} />
      <div className="px-10 py-5 grid grid-cols-1 gap-6">
        <BackButton />

        <h1 className="text-2xl font-bold">{menuDetail?.itemName}</h1>
        <div className="flex gap-10">
          <div className="w-full">
            <MenuForm isEdit={true} menuDetail={menuDetail} />
          </div>
        </div>
      </div>
    </div>
  );
};
