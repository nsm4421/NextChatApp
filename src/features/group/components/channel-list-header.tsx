import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Doc } from "../../../../convex/_generated/dataModel";
import { ChevronDown } from "lucide-react";

interface Props {
  group: Doc<"groups">;
  isHost: boolean;
}

export default function ChannelListHeader({ group, isHost }: Props) {
  return (
    <div className="flex items-center justify-between px-4 h-[50px] gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
          >
            <span className="truncate">{group.title}</span>
            <i>
              <ChevronDown className="size-4 ml-1 shrink-0" />
            </i>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="start"
          className="w-64 bg-slate-200 rounded-md px-3 py-2 flex flex-col gap-y-2"
        >
          <DropdownMenuItem className="cursor-pointer capitalize flex justify-start items-center">
            <div className="size-9 relative overflow-hidden bg-slate-600 rounded-md text-white text-lg flex items-center justify-center">
              {group.title.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3 flex flex-col items-start truncate text-ellipsis">
              <p className="text-md font-semibold"> {group.title}</p>
              <span className="text-xs">Active Group</span>
            </div>
          </DropdownMenuItem>
          {isHost && (
            <DropdownMenuItem className="cursor-pointer capitalize flex justify-start items-center bg-slate-200 rounded-lg px-1 py-1">
              <p className="text-md"> Invite People</p>
            </DropdownMenuItem>
          )}
          {isHost && (
            <DropdownMenuItem className="cursor-pointer capitalize flex justify-start items-center bg-slate-200 rounded-lg px-1 py-1">
              <p className="text-md"> Pereference</p>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
