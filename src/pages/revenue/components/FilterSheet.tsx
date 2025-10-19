import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { type TransactionFilters } from "../hooks/useTransactionFilters";
import type { DateRangePreset } from "@/utils/dateRange";
import { XIcon } from "lucide-react";
import { Select, type SelectOption } from "@/components/ui/select-input";
import { DatePicker } from "@/components/ui/date-picker";
import { useState, useEffect } from "react";
import { getDateRangeFromPreset } from "@/utils/dateRange";

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: TransactionFilters;
  updateFilters: (filters: Partial<TransactionFilters>) => void;
  clearFilters: () => void;
  getDateRange: () => { from: Date | undefined; to: Date | undefined };
  setIsFiltering: (isFiltering: boolean) => void;
}

export const FilterSheet = ({
  open,
  onOpenChange,
  filters,
  updateFilters,
  clearFilters,
  getDateRange,
  setIsFiltering,
}: FilterSheetProps) => {
  const [draftDatePreset, setDraftDatePreset] = useState<
    DateRangePreset | undefined
  >(filters.datePreset);
  const [draftDateFrom, setDraftDateFrom] = useState<string | undefined>(
    filters.dateFrom
  );
  const [draftDateTo, setDraftDateTo] = useState<string | undefined>(
    filters.dateTo
  );
  const [draftTransactionTypes, setDraftTransactionTypes] = useState<string[]>(
    filters.transactionTypes
  );
  const [draftTransactionStatuses, setDraftTransactionStatuses] = useState<
    string[]
  >(filters.transactionStatuses);

  const displayDateRange = () => {
    if (draftDatePreset === "custom" && draftDateFrom && draftDateTo) {
      return {
        from: new Date(draftDateFrom),
        to: new Date(draftDateTo),
      };
    }
    if (draftDatePreset) {
      return getDateRangeFromPreset(draftDatePreset);
    }
    return getDateRange();
  };

  const dateRange = displayDateRange();

  const handleDatePresetChange = (preset: DateRangePreset) => {
    setDraftDatePreset(preset);
    if (preset !== "custom") {
      setDraftDateFrom(undefined);
      setDraftDateTo(undefined);
    }
  };

  const handleDateFromChange = (date: Date | undefined) => {
    if (date) {
      setDraftDateFrom(date.toISOString().split("T")[0]);
      setDraftDatePreset("custom");
    }
  };

  const handleDateToChange = (date: Date | undefined) => {
    if (date) {
      setDraftDateTo(date.toISOString().split("T")[0]);
      setDraftDatePreset("custom");
    }
  };

  const handleTransactionTypesChange = (values: string[] | string | null) => {
    setDraftTransactionTypes(Array.isArray(values) ? values : []);
  };

  const handleTransactionStatusesChange = (
    values: string[] | string | null
  ) => {
    setDraftTransactionStatuses(Array.isArray(values) ? values : []);
  };

  const handleApply = () => {
    setIsFiltering(true);
    onOpenChange(false);
    setTimeout(() => {
      updateFilters({
        datePreset: draftDatePreset,
        dateFrom: draftDateFrom,
        dateTo: draftDateTo,
        transactionTypes: draftTransactionTypes,
        transactionStatuses: draftTransactionStatuses,
      });
      setIsFiltering(false);
    }, 1000);
  };

  const handleClear = () => {
    setDraftDatePreset(undefined);
    setDraftDateFrom(undefined);
    setDraftDateTo(undefined);
    setDraftTransactionTypes([]);
    setDraftTransactionStatuses([]);
    clearFilters();
  };

  useEffect(() => {
    if (open) {
      setDraftDatePreset(filters.datePreset);
      setDraftDateFrom(filters.dateFrom);
      setDraftDateTo(filters.dateTo);
      setDraftTransactionTypes(filters.transactionTypes);
      setDraftTransactionStatuses(filters.transactionStatuses);
    }
  }, [open, filters]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md py-4 px-6">
        <SheetHeader className="flex flex-row items-center justify-between p-0">
          <SheetTitle className="text-xl font-bold">Filter</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <XIcon size={16} />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            {datePresets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => handleDatePresetChange(preset.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  draftDatePreset === preset.value
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-secondary/80 border border-muted"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Date Range</p>
            <div className="grid grid-cols-2 gap-3">
              <DatePicker
                value={draftDateFrom ? new Date(draftDateFrom) : dateRange.from}
                onChange={handleDateFromChange}
                placeholder="Select start date..."
              />
              <DatePicker
                value={draftDateTo ? new Date(draftDateTo) : dateRange.to}
                onChange={handleDateToChange}
                popoverAlign="end"
                placeholder="Select end date..."
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Transaction Type</p>
            <Select
              isMulti
              options={transactionTypeOptions}
              value={transactionTypeOptions.filter((option) =>
                draftTransactionTypes.includes(option.value)
              )}
              onChange={handleTransactionTypesChange}
              placeholder="Select transaction type..."
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Transaction Status</p>
            <Select
              isMulti
              options={transactionStatusOptions}
              value={transactionStatusOptions.filter((option) =>
                draftTransactionStatuses.includes(option.value)
              )}
              onChange={handleTransactionStatusesChange}
              placeholder="Select transaction status..."
            />
          </div>
        </div>

        <SheetFooter className="flex-row gap-3">
          <Button
            variant="outline"
            onClick={handleClear}
            className="flex-1 cursor-pointer"
          >
            Clear
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1 bg-black hover:bg-black/90 text-white cursor-pointer"
          >
            Apply
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const datePresets: { value: DateRangePreset; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "last7days", label: "Last 7 days" },
  { value: "thisMonth", label: "This month" },
  { value: "last3months", label: "Last 3 months" },
];

const transactionTypeOptions: SelectOption[] = [
  { value: "store_transactions", label: "Store Transactions" },
  { value: "get_tipped", label: "Get Tipped" },
  { value: "withdrawal", label: "Withdrawals" },
  { value: "chargeback", label: "Chargebacks" },
  { value: "cashback", label: "Cashbacks" },
  { value: "refer_and_earn", label: "Refer & Earn" },
];

const transactionStatusOptions: SelectOption[] = [
  { value: "successful", label: "Successful" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
];
