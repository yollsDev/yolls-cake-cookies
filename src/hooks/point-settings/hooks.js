import { useMutation, useQuery } from "@tanstack/react-query";
import { pointRequest } from "./request";

export const GetPointSettingsData = () =>
  useQuery({
    queryKey: ["point-get"],
    queryFn: async () => await pointRequest(),
  });
