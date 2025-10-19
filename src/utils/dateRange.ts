import {
  startOfDay,
  endOfDay,
  subDays,
  startOfMonth,
  endOfMonth,
  subMonths,
} from "date-fns";

export type DateRangePreset =
  | "today"
  | "last7days"
  | "thisMonth"
  | "last3months"
  | "custom";

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export const getDateRangeFromPreset = (preset: DateRangePreset): DateRange => {
  const now = new Date();

  switch (preset) {
    case "today":
      return {
        from: startOfDay(now),
        to: endOfDay(now),
      };

    case "last7days":
      return {
        from: startOfDay(subDays(now, 6)),
        to: endOfDay(now),
      };

    case "thisMonth":
      return {
        from: startOfMonth(now),
        to: endOfMonth(now),
      };

    case "last3months":
      return {
        from: startOfMonth(subMonths(now, 2)),
        to: endOfMonth(now),
      };

    default:
      return {
        from: undefined,
        to: undefined,
      };
  }
};

export const formatDateForInput = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const parseDateFromInput = (dateString: string): Date => {
  return new Date(dateString);
};
