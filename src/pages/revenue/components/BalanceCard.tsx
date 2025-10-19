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
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        <h2
          className={cn(
            "font-bold",
            textSize === "sm" && "text-lg",
            textSize === "md" && "text-[28px]",
            textSize === "lg" && "text-[32px]"
          )}
        >
          {currency} {formatAmount(amount)}
        </h2>
      </div>
      {tooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-3.5 w-3.5 text-muted-foreground" />
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
