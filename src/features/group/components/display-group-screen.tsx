"use client";

import { useGroupIdParam } from "@/hooks/use-table-id";
import { useGetGroupById } from "../api/use-get-group-by-id";

export default function DisplayGroupScreen() {
  const groupId = useGroupIdParam();
  const { data, isLoading } = useGetGroupById({ groupId });

  if (isLoading) {
    return (
      <div className="h-auto w-auto">
        <h1>Loadings...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Id:{groupId}</h1>
    </div>
  );
}
