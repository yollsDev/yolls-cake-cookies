import React from "react";

export const DashboardHeader = ({ title }) => {
  return (
    <div className="bg-theme-pink px-10 py-10">
      <h1 className="font-bold text-4xl">{title}</h1>
    </div>
  );
};
