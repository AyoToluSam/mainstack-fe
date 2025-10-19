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
    <div className="container mx-auto px-4 md:px-16 py-8 space-y-8">
      <div className="flex gap-12">
        <div className="flex-1 space-y-6">
          {isWalletLoading ? (
            <>
              <div className="flex items-center gap-16">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-40" />
                </div>
                <Skeleton className="h-12 w-32 rounded-lg" />
              </div>
              <Skeleton className="h-[280px] rounded-lg" />
            </>
          ) : (
            <>
              <div className="flex items-center gap-16">
                <BalanceCard
                  label="Available Balance"
                  amount={wallet?.balance || 0}
                  textSize="lg"
                />
                <Button
                  size="lg"
                  className="bg-black hover:bg-black/90 text-white min-w-[132px]"
                >
                  Withdraw
                </Button>
              </div>
              <RevenueChart data={chartData} />
            </>
          )}
        </div>

        <div className="flex flex-col gap-5">
          {isWalletLoading ? (
            <>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-8 w-36" />
                </div>
              ))}
            </>
          ) : (
            <>
              <BalanceCard
                label="Ledger Balance"
                amount={wallet?.ledger_balance || 0}
                tooltip="Your ledger balance"
                className="gap-20"
              />
              <BalanceCard
                label="Total Payout"
                amount={wallet?.total_payout || 0}
                tooltip="Total amount paid out"
                className="gap-20"
              />
              <BalanceCard
                label="Total Revenue"
                amount={wallet?.total_revenue || 0}
                tooltip="Your total revenue"
                className="gap-20"
              />
              <BalanceCard
                label="Pending Payout"
                amount={wallet?.pending_payout || 0}
                tooltip="Amount pending for payout"
                className="gap-20"
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
