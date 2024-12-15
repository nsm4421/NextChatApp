import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

interface Props {
  icon: LucideIcon | IconType;
  isActive: boolean;
  label: string;
}

export default function SidebarButton({ icon: Icon, isActive, label }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-y-0.5 group cursor-pointer">
      <Button
        variant="ghost"
        className={cn(
          "size-9 p-2 group-hover:bg-accent/20",
          isActive && "bg-accent/20"
        )}
      >
        <Icon className="size-5 text-white group-hover:scale-110 transition-all" />
      </Button>
      <label className="text-xs text-white group-hover:text-accent">
        {label}
      </label>
    </div>
  );
}
