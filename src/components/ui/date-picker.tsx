import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export function DatePicker({
  label,
  value,
  onChange,
  dateDisplayType = "readable",
  popoverAlign = "start",
  placeholder = "Select date...",
}: {
  label?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  dateDisplayType?: "readable" | "raw";
  popoverAlign?: "start" | "center" | "end";
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <Label htmlFor="date" className="px-1">
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal bg-[#EFF1F6] border-0 rounded-lg cursor-pointer"
          >
            {value
              ? dateDisplayType === "raw"
                ? value.toISOString().split("T")[0]
                : value.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
              : placeholder}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align={popoverAlign}
        >
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
