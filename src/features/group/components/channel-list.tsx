"use client";

import { useGetCurrentMember } from "@/features/members/api/use-get-members";
import { useGroupIdParam } from "@/hooks/use-table-id";
import { useGetGroupById } from "../api/use-get-group-by-id";
import { AlertTriangle, Loader } from "lucide-react";
import ChannelListHeader from "./channel-list-header";

export default function ChannelList() {
  const groupId = useGroupIdParam();
  const { data: group, isLoading: isFetchingGroup } = useGetGroupById({
    groupId,
  });

  const { data: currentMember, isLoading: isFetchingMemeber } =
    useGetCurrentMember({
      groupId,
    });

  if (isFetchingGroup || isFetchingMemeber) {
    return (
      <div className="flex flex-col bg-slate-700 h-full items-center justify-center">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  } else if (!group || !currentMember) {
    return (
      <div className="flex flex-col bg-slate-700 h-full items-center justify-center">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-md text-white">Group Not Found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-slate-400 h-full">
      <ChannelListHeader group={group} isHost={currentMember.role === "host"} />
    </div>
  );
}
