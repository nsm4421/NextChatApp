import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

interface Props {
  groupId: Id<"groups">;
}

export const useGetChannels = ({ groupId }: Props) => {
  const data = useQuery(api.features.channels.get, { groupId });
  const isLoading = data === undefined;
  return { data, isLoading };
};
