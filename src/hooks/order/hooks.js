import { useQuery } from "@tanstack/react-query";
import { CategoryRequest } from "./request";

export const GetCategoryData = () =>
  useQuery({
    queryKey: ["category-get"],
    queryFn: async () => await CategoryRequest(),
  });
