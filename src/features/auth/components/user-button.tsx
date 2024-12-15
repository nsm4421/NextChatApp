"use client";

import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useCurrentUser } from "../api/use-current-user";
import { Loader, LogOut } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useAuthActions } from "@convex-dev/auth/react";

export default function CurrentUserButton() {
  const { signOut } = useAuthActions();

  const { data, isLoading } = useCurrentUser();

  const handleSignOut = async () => {
    await signOut();
  };

  if (isLoading || data === undefined) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  } else if (data === null) {
    return <></>;
  } else {
    const { image, name } = data;
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="outline-none relative">
          <Avatar className="size-10 hover:opacity-70 transition">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback className="bg-neutral-800 text-white">
              {name?.charAt(0)?.toUpperCase() || "Hi"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          side="right"
          className="flex flex-col gap-y-2 pl-2"
        >
          <DropdownMenuItem
            onClick={handleSignOut}
            className="gap-x-2 px-2 py-2 w-full flex outline-none cursor-pointer items-center bg-neutral-200 rounded-md hover:bg-neutral-600 hover:text-white"
          >
            <LogOut className="size-4" />
            <span className="text-sm">Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
