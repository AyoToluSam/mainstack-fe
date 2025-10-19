import { ChevronDown, Download, MoveDownLeft, MoveUpRight } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { type Transaction } from "@/store/app/transactions/types";
import { Badge } from "@/components/ui/badge";
import { formatAmountWithCurrency } from "@/utils/formatAmount";
import { formatDate } from "@/utils/formatDate";
import DataTable from "@/components/shared/DataTable";
import { Separator } from "@/components/ui/separator";
import { startCase } from "lodash";
import { FilterSheet } from "./FilterSheet";
import { useMemo, useState } from "react";
import type { TransactionFilters } from "../hooks/useTransactionFilters";
import { useDataExport } from "@/hooks/useDataExport";

interface TransactionsListProps {
  transactions: Transaction[];
  totalCount: number;
  filters: TransactionFilters;
  hasFilters: boolean;
  updateFilters: (filters: Partial<TransactionFilters>) => void;
  clearFilters: () => void;
  getDateRange: () => { from: Date | undefined; to: Date | undefined };
  isLoading?: boolean;
}

export const TransactionsList = ({
  transactions,
  totalCount,
  filters,
  hasFilters,
  updateFilters,
  clearFilters,
  getDateRange,
  isLoading,
}: TransactionsListProps) => {
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const dataExport = useMemo(() => {
    return transactions.map((transaction) => ({
      date: formatDate(transaction.date),
      "Transaction Type": transaction.metadata?.type
        ? startCase(transaction.metadata?.type)
        : transaction.type,
      Amount: formatAmountWithCurrency(transaction.amount),
      Status: transaction.status,
      "Payment Reference": transaction.payment_reference || "",
      "Product Name": transaction.metadata?.product_name || "",
      Name: transaction.metadata?.name || "",
      Email: transaction.metadata?.email || "",
      Quantity: transaction.metadata?.quantity?.toString() || "",
      Country: transaction.metadata?.country || "",
    }));
  }, [transactions]);

  const { handleDownloadData, isExporting } = useDataExport({
    data: dataExport,
    headers: dataExportHeaders,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{totalCount} Transactions</h2>
          <p className="text-sm text-muted-foreground">
            {filters.datePreset
              ? filters.datePreset === "custom"
                ? `Your transactions for ${formatDate(
                    filters.dateFrom!
                  )} to ${formatDate(filters.dateTo!)}`
                : `Your transactions for ${startCase(
                    filters.datePreset
                  ).toLowerCase()}`
              : `All your transactions`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterSheetOpen(true)}
            className="flex items-center gap-2 p-2 px-6 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-4xl cursor-pointer"
          >
            Filter
            <ChevronDown size={14} />
          </button>
          <button
            onClick={handleDownloadData}
            className="flex items-center gap-2 p-2 px-6 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-4xl cursor-pointer"
          >
            {isExporting ? "Exporting..." : "Export list"}
            <Download size={12} />
          </button>
        </div>
      </div>

      {!isFiltering && <Separator />}

      <DataTable<Transaction>
        data={transactions}
        columns={columns}
        emptyData={{
          title: hasFilters
            ? "No matching transactions found for the selected filters"
            : "No transactions found",
          description: hasFilters
            ? "Please try different filters to see more results"
            : "Add a new product to see more results",
          buttonText: hasFilters ? "Clear filters" : "Add a new product",
          buttonOnClick: hasFilters ? clearFilters : () => {},
        }}
        isLoading={isFiltering || isLoading}
      />

      <FilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        filters={filters}
        updateFilters={updateFilters}
        clearFilters={clearFilters}
        getDateRange={getDateRange}
        setIsFiltering={setIsFiltering}
      />
    </div>
  );
};

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "type",
    cell: ({ row }) => {
      const transaction = row.original;
      const status = row.original.status;
      const isWithdrawal = transaction.type === "withdrawal";

      if (isWithdrawal) {
        return (
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F9E3E0]">
              <MoveUpRight className="h-5 w-5 text-[#961100]" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium">Cash Withdrawal</p>
              <Badge
                className={`${getStatusStyles(
                  status
                )} bg-transparent border-0 p-0 font-medium capitalize`}
              >
                {status}
              </Badge>
            </div>
          </div>
        );
      }

      return (
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E3FCF2]">
            <MoveDownLeft className="h-5 w-5 text-[#075132]" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium">
              {transaction.metadata?.product_name ||
                startCase(transaction.metadata?.type)}
            </p>
            <p className="text-sm text-muted-foreground">
              {transaction.metadata?.name}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <div className="text-right">
          <p className="font-semibold">
            {formatAmountWithCurrency(transaction.amount)}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatDate(transaction.date)}
          </p>
        </div>
      );
    },
  },
];

const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case "successful":
      return "text-[#0EA163]";
    case "pending":
      return "text-[#A77A07]";
    case "failed":
      return "text-[#961100]";
    default:
      return "";
  }
};

const dataExportHeaders = [
  "Date",
  "Transaction Type",
  "Amount",
  "Status",
  "Payment Reference",
  "Product Name",
  "Name",
  "Email",
  "Quantity",
  "Country",
];
