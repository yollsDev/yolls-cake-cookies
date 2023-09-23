import React from "react";
import { IconBackArrow } from "../../icons";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(-1);
      }}
      className="cursor-pointer w-fit"
    >
      <IconBackArrow size={25} />
    </div>
  );
};
