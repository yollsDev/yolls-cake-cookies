import { useMutation, useQuery } from "@tanstack/react-query";
import { insertPointSetting, pointRequest } from "./request";

export const GetPointSettingsData = () =>
  useQuery({
    queryKey: ["point-get"],
    queryFn: async () => await pointRequest(),
  });

export const useInsertPointSettings = () => {
  return useMutation({
    mutationKey: ["insert-point-settings"],
    mutationFn: async (data) => await insertPointSetting(data),
  });
};
