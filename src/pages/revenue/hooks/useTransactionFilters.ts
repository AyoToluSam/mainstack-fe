import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import type { DateRangePreset } from "@/utils/dateRange";
import { getDateRangeFromPreset, parseDateFromInput } from "@/utils/dateRange";

export interface TransactionFilters {
  datePreset?: DateRangePreset;
  dateFrom?: string;
  dateTo?: string;
  transactionTypes: string[];
  transactionStatuses: string[];
}

export const useTransactionFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: TransactionFilters = useMemo(() => {
    const datePreset =
      (searchParams.get("datePreset") as DateRangePreset) || undefined;
    const dateFrom = searchParams.get("dateFrom") || undefined;
    const dateTo = searchParams.get("dateTo") || undefined;
    const transactionTypes =
      searchParams.get("transactionTypes")?.split(",").filter(Boolean) || [];
    const transactionStatuses =
      searchParams.get("transactionStatuses")?.split(",").filter(Boolean) || [];

    return {
      datePreset,
      dateFrom,
      dateTo,
      transactionTypes,
      transactionStatuses,
    };
  }, [searchParams]);

  const hasFilters = useMemo(() => {
    return Object.values(filters).some(
      (value) =>
        value !== undefined &&
        value !== "" &&
        (Array.isArray(value) ? value.length > 0 : true)
    );
  }, [filters]);

  const updateFilters = useCallback(
    (updates: Partial<TransactionFilters>) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);

        if (updates.datePreset !== undefined) {
          newParams.set("datePreset", updates.datePreset);

          if (updates.datePreset !== "custom") {
            newParams.delete("dateFrom");
            newParams.delete("dateTo");
          }
        }

        if (updates.dateFrom !== undefined) {
          if (updates.dateFrom) {
            newParams.set("dateFrom", updates.dateFrom);
            newParams.set("datePreset", "custom");
          } else {
            newParams.delete("dateFrom");
          }
        }

        if (updates.dateTo !== undefined) {
          if (updates.dateTo) {
            newParams.set("dateTo", updates.dateTo);
            newParams.set("datePreset", "custom");
          } else {
            newParams.delete("dateTo");
          }
        }

        if (updates.transactionTypes !== undefined) {
          if (updates.transactionTypes.length > 0) {
            newParams.set(
              "transactionTypes",
              updates.transactionTypes.join(",")
            );
          } else {
            newParams.delete("transactionTypes");
          }
        }

        if (updates.transactionStatuses !== undefined) {
          if (updates.transactionStatuses.length > 0) {
            newParams.set(
              "transactionStatuses",
              updates.transactionStatuses.join(",")
            );
          } else {
            newParams.delete("transactionStatuses");
          }
        }

        return newParams;
      });
    },
    [setSearchParams]
  );

  const clearFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const getDateRange = useCallback(() => {
    if (filters.datePreset === "custom" && filters.dateFrom && filters.dateTo) {
      return {
        from: parseDateFromInput(filters.dateFrom),
        to: parseDateFromInput(filters.dateTo),
      };
    }

    if (filters.datePreset) {
      return getDateRangeFromPreset(filters.datePreset);
    }

    return {
      from: undefined,
      to: undefined,
    };
  }, [filters]);

  return {
    filters,
    hasFilters,
    updateFilters,
    clearFilters,
    getDateRange,
  };
};
