import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";

export const useGroupIdParam = () => {
  const params = useParams();
  return params.groupId as Id<"groups">;
};
