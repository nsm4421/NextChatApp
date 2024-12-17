import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";

interface Props {
  children: React.ReactNode;
  label: string;
  onNew?: () => void;
}

export default function ChannelMenuWrapper({ children, label, onNew }: Props) {
  return (
    <div className="flex flex-col mt-3 px-2">
      <div className="flex items-center px-3.5 group">
        <Button
          variant="ghost"
          className="p-0.5 text-sm text-sky-100 shrink-0 size-6"
        >
          <FaCaretDown className="size-4 " />
        </Button>
        <Button
          variant="ghost"
          className="group px-1.5 text-sm text-sky-100"
          size="sm"
        >
          <span>{label}</span>
        </Button>
        {onNew && (
          <Button
            onClick={onNew}
            variant="ghost"
            size="icon"
            className="text-sky-100 ml-auto p-0.5 text-sm"
          >
            <PlusIcon className="size-5 p-0" />
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}
