"use client";

import { useGetCurrentMember } from "@/features/members/api/use-get-members";
import { useGroupIdParam } from "@/hooks/use-table-id";
import { useGetGroupById } from "../api/use-get-group-by-id";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageCircle,
  MessageSquare,
  SendHorizonal,
} from "lucide-react";
import ChannelListHeader from "./channel-list-header";
import SidebarItem from "./sidebar-item";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import ChannelMenuWrapper from "./channel-menu-wrapper";

export default function ChannelList() {
  const groupId = useGroupIdParam();
  const { data: group, isLoading: isFetchingGroup } = useGetGroupById({
    groupId,
  });
  const { data: currentMember, isLoading: isFetchingMemeber } =
    useGetCurrentMember({
      groupId,
    });
  const { data: channels, isLoading: isFetchingChannels } = useGetChannels({
    groupId,
  });

  if (isFetchingGroup || isFetchingMemeber || isFetchingChannels) {
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
      <div className="flex flex-col px-2 mt-3 gap-y-1">
        <SidebarItem id={"message"} label="Messages" icon={MessageSquare} />
        <SidebarItem id={"draft"} label="Draft&Send" icon={SendHorizonal} />
        <ChannelMenuWrapper label={"test"}>
          {channels &&
            channels.map((item) => (
              <SidebarItem
                key={item._id}
                id={item._id}
                label={item.title}
                icon={HashIcon}
              />
            ))}
        </ChannelMenuWrapper>
      </div>
    </div>
  );
}
