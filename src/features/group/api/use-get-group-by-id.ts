import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface Props {
  groupId: Id<"groups">;
}

export const useGetGroupById = ({ groupId }: Props) => {
  const data = useQuery(api.features.groups.getById, { groupId });
  const isLoading = data === undefined;
  return { data, isLoading };
};
