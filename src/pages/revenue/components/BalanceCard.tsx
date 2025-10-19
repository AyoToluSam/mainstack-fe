import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatAmount } from "@/utils/formatAmount";
import { cn } from "@/lib/utils";

interface BalanceCardProps {
  label: string;
  amount: number;
  currency?: string;
  tooltip?: string;
  textSize?: "sm" | "md" | "lg";
  className?: string;
}

export const BalanceCard = ({
  label,
  amount,
  currency = "USD",
  tooltip,
  textSize = "md",
  className,
}: BalanceCardProps) => {
  return (
    <div className={cn("flex justify-between gap-2", className)}>
      <div className="flex flex-col gap-1.5 md:gap-2 min-w-0">
        <span className="text-xs md:text-sm text-muted-foreground">
          {label}
        </span>
        <h2
          className={cn(
            "font-bold min-w-max",
            textSize === "sm" && "text-base md:text-lg",
            textSize === "md" && "text-lg md:text-[28px]",
            textSize === "lg" && "text-xl md:text-[32px]"
          )}
        >
          {currency} {formatAmount(amount)}
        </h2>
      </div>
      {tooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-3 w-3 md:h-3.5 md:w-3.5 text-muted-foreground flex-shrink-0" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
