import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useGetGroups = () => {
  const data = useQuery(api.features.groups.get);
  const isLoading = data === undefined;
  return { data, isLoading };
};
