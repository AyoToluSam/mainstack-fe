import { useGetWalletQuery } from "@/store/app/wallet/api";
import { useGetTransactionsQuery } from "@/store/app/transactions/api";
import { useMemo } from "react";
import { useTransactionFilters } from "./useTransactionFilters";
import type {
  DepositType,
  TransactionType,
} from "@/store/app/transactions/types";

export const useRevenueData = () => {
  const {
    data: wallet,
    isLoading: isWalletLoading,
    error: walletError,
  } = useGetWalletQuery();

  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    error: transactionsError,
  } = useGetTransactionsQuery();

  const { filters, hasFilters, updateFilters, clearFilters, getDateRange } =
    useTransactionFilters();

  const filteredTransactions = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    let filtered = [...transactions];

    const dateRange = getDateRange();
    if (dateRange.from && dateRange.to) {
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate >= dateRange.from! && transactionDate <= dateRange.to!
        );
      });
    }

    if (filters.transactionTypes.length > 0) {
      filtered = filtered.filter((transaction) => {
        const typeMapping: Record<string, (DepositType | TransactionType)[]> = {
          store_transactions: ["digital_product", "webinar"],
          get_tipped: ["coffee"],
          withdrawal: ["withdrawal"],
          chargeback: ["chargeback"],
          cashback: ["cashback"],
          refer_and_earn: ["refer_and_earn"],
        };

        if (
          filters.transactionTypes.includes("withdrawal") &&
          transaction.type === "withdrawal"
        ) {
          return true;
        }

        const metadataType = transaction.metadata?.type;
        if (metadataType) {
          return filters.transactionTypes.some((filterType) => {
            const mappedType = typeMapping[filterType] || [];
            return mappedType.includes(metadataType);
          });
        }

        return false;
      });
    }

    if (filters.transactionStatuses.length > 0) {
      filtered = filtered.filter((transaction) =>
        filters.transactionStatuses.includes(transaction.status.toLowerCase())
      );
    }

    return filtered;
  }, [transactions, filters, getDateRange]);

  const chartData = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    const sortedTransactions = [...transactions].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    const balanceByDate: Array<{ date: string; amount: number }> = [];
    let runningBalance = 0;

    sortedTransactions.forEach((transaction, index) => {
      const date = new Date(transaction.date);

      if (index === 0) {
        runningBalance = transaction.amount;
      } else {
        if (transaction.status === "successful") {
          if (transaction.type === "deposit") {
            runningBalance += transaction.amount;
          } else if (transaction.type === "withdrawal") {
            runningBalance -= transaction.amount;
          }
        }
      }

      balanceByDate.push({
        date: date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        amount: runningBalance,
      });
    });

    return balanceByDate;
  }, [transactions]);

  return {
    wallet,
    transactions: filteredTransactions,
    chartData,
    isWalletLoading,
    isTransactionsLoading,
    error: walletError || transactionsError,
    filters,
    hasFilters,
    updateFilters,
    clearFilters,
    getDateRange,
  };
};
