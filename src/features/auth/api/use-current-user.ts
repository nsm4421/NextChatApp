import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useCurrentUser = () => {
  const data = useQuery(api.features.users.current);
  // data is undefined while fetching (Rerefence : https://docs.convex.dev/functions/query-functions)
  const isLoading = data === undefined;
  return { data, isLoading };
};
