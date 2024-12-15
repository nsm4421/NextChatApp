"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CurrentUserButton from "@/features/auth/components/user-button";
import { useGroupIdParam } from "@/hooks/use-table-id";
import { useGetGroups } from "../api/use-get-groups";
import { useGetGroupById } from "../api/use-get-group-by-id";
import {
  BellIcon,
  HomeIcon,
  Loader,
  MessageSquare,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";
import { useCreateGroupModal } from "../store/use-create-group-modal";
import SidebarButton from "./sidebar-buttons";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const router = useRouter();
  const currentGroupId = useGroupIdParam();
  const [_, setIsModalVisible] = useCreateGroupModal();
  const { data: currentGroup, isLoading: isFetchingCurrentGroup } =
    useGetGroupById({ groupId: currentGroupId });
  const { data: groups, isLoading: isFetchingGroups } = useGetGroups();

  const handleNavigate = (id: Id<"groups">) => () => {
    router.push(`/group/${id}`);
  };

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  return (
    <aside className="w-[70px] h-full bg-slate-500 flex flex-col gap-y-4 items-center pt-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* current group icon */}
          <Button className="size-8 relative overflow-hidden bg-slate-400 hover:bg-slate-400/80 text-slate-800 font-semibold text-xl rounded-md">
            {isFetchingCurrentGroup ? (
              <Loader className="size-5 animate-spin absolute" />
            ) : (
              <b>{currentGroup?.title.charAt(0).toUpperCase()}</b>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className="w-64">
          {/* current group menu item */}
          {currentGroup && (
            <DropdownMenuItem className="cursor-pointer flex-col justify-start items-start capitalize overflow-hidden">
              <p className="font-bold truncate text-ellipsis w-full">
                {currentGroup?.title}
              </p>
              <span className="text-xs">Active Workspace</span>
            </DropdownMenuItem>
          )}
          {/* other groups  menu item */}
          {groups &&
            groups
              .filter((item) => item._id != currentGroup?._id)
              .map((item) => (
                <DropdownMenuItem
                  key={item._id}
                  onClick={handleNavigate(item._id)}
                  className="cursor-pointer flex justify-start capitalize items-center overflow-hidden"
                >
                  <span className="size-8 shrink-0 relative overflow-hidden bg-slate-500 text-white text-lg rounded-md flex justify-center items-center mr-2 p-2">
                    {item.title.charAt(0).toUpperCase()}
                  </span>
                  <span className="font-bold truncate">{item?.title}</span>
                </DropdownMenuItem>
              ))}

          <DropdownMenuItem onClick={handleShowModal}>
            <i className="size-8 relative overflow-hidden bg-slate-500 text-white text-lg rounded-md flex justify-center items-center mr-2 p-2">
              <Plus />
            </i>
            <span>Create Group</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* TODO : isActive값 동적으로 할당하기 */}
      <SidebarButton icon={HomeIcon} isActive label={"home"} />
      <SidebarButton icon={MessageSquare} isActive label={"Chat"} />
      <SidebarButton icon={BellIcon} isActive label={"Activity"} />
      <SidebarButton icon={MoreHorizontal} isActive label={"More"} />
      {/* current user button */}
      <div className="flex flex-col items-center mt-auto gap-y-2 pb-5">
        <CurrentUserButton />
      </div>
    </aside>
  );
}
