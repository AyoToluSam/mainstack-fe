import { BalanceCard } from "./components/BalanceCard";
import { RevenueChart } from "./components/RevenueChart";
import { TransactionsList } from "./components/TransactionsList";
import { useRevenueData } from "./hooks/useRevenueData";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Revenue = () => {
  const {
    wallet,
    transactions,
    chartData,
    isWalletLoading,
    isTransactionsLoading,
    filters,
    hasFilters,
    updateFilters,
    clearFilters,
    getDateRange,
  } = useRevenueData();

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-16 py-6 md:py-8 space-y-6 md:space-y-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
        <div className="flex-1 space-y-4 md:space-y-6">
          {isWalletLoading ? (
            <>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 lg:gap-16 max-w-fit">
                <div className="space-y-3 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-40" />
                </div>
                <Skeleton className="h-10 sm:h-12 w-full sm:w-32 rounded-lg" />
              </div>
              <Skeleton className="h-[200px] sm:h-[240px] md:h-[280px] rounded-lg" />
            </>
          ) : (
            <>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 lg:gap-16 max-w-fit">
                <BalanceCard
                  label="Available Balance"
                  amount={wallet?.balance || 0}
                  textSize="lg"
                />
                <Button
                  size="lg"
                  className="bg-black hover:bg-black/90 text-white w-full sm:w-auto min-w-[132px]"
                >
                  Withdraw
                </Button>
              </div>
              <RevenueChart data={chartData} />
            </>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:flex lg:flex-col gap-4 lg:gap-5">
          {isWalletLoading ? (
            <>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 md:h-8 w-28" />
                </div>
              ))}
            </>
          ) : (
            <>
              <BalanceCard
                label="Ledger Balance"
                amount={wallet?.ledger_balance || 0}
                tooltip="Your ledger balance"
                className="gap-8 md:gap-22"
              />
              <BalanceCard
                label="Total Payout"
                amount={wallet?.total_payout || 0}
                tooltip="Total amount paid out"
                className="gap-8 md:gap-22"
              />
              <BalanceCard
                label="Total Revenue"
                amount={wallet?.total_revenue || 0}
                tooltip="Your total revenue"
                className="gap-8 md:gap-22"
              />
              <BalanceCard
                label="Pending Payout"
                amount={wallet?.pending_payout || 0}
                tooltip="Amount pending for payout"
                className="gap-8 md:gap-22"
              />
            </>
          )}
        </div>
      </div>

      <TransactionsList
        transactions={transactions}
        totalCount={transactions.length}
        filters={filters}
        hasFilters={hasFilters}
        updateFilters={updateFilters}
        clearFilters={clearFilters}
        getDateRange={getDateRange}
        isLoading={isTransactionsLoading}
      />
    </div>
  );
};

export default Revenue;
