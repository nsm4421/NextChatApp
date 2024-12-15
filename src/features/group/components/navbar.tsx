import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <div className="bg-slate-600 flex items-center justify-between h-full p-2">
      <div className="flex-1" />
      <div className="min-w-[280px] max-[642px] grow-[2] shrink">
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2"
        >
          <Search className="size-4 text-white mr-2" />
          <span>Search Group</span>
        </Button>
      </div>
    </div>
  );
}
