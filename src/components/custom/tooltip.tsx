"use client";

import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Tooltip } from "../ui/tooltip";

interface Props {
  label: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  algin?: "start" | "center" | "end";
}

export default function CustomToolTip(props: Props) {
  const { label, children, ...tooltipProps } = props;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          {...tooltipProps}
          className="bg-black text-white border border-white/5 rounded-md px-2 py-1"
        >
          <p className="text-xs font-medium">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
