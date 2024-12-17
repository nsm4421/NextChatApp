import { Button } from "@/components/ui/button";
import { useGroupIdParam } from "@/hooks/use-table-id";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons/lib";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sidebarItemVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-[15px] text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-sky-100",
        active: "text-sky-800 bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface Props {
  id: string;
  label: string;
  icon: LucideIcon | IconType;
  variant?: VariantProps<typeof sidebarItemVariants>["variant"];
}

export default function SidebarItem({ id, label, icon: Icon, variant }: Props) {
  const groupId = useGroupIdParam();

  return (
    <Button
      variant="ghost"
      size="sm"
      asChild
      className={cn(sidebarItemVariants({ variant }))}
    >
      <Link href={`gorup/${groupId}`}>
        <Icon className="size-3 mr-2 shrink-0" />
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
}
