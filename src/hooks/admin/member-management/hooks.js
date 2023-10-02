import { useMutation, useQuery } from "@tanstack/react-query";
import { GetAllMember, deleteMemberRequest, getMemberByID } from "./request";

export const useAllMembers = () =>
  useQuery({
    queryKey: ["all-member-get"],
    queryFn: async () => await GetAllMember(),
  });

export const useMemberByID = (id) =>
  useQuery({
    queryKey: ["member-byID"],
    queryFn: async () => await getMemberByID(id),
  });

export const useDeleteMember = () => {
  return useMutation({
    mutationKey: ["delete-member"],
    mutationFn: async (id) => await deleteMemberRequest(id),
  });
};
