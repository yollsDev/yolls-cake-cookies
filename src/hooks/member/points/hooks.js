import { useQuery } from "@tanstack/react-query";
import { getPoints } from "./request";

export const usePoints = (id) =>
  useQuery({
    queryKey: ["get-points", id],
    queryFn: async () => await getPoints(id),
  });
