import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { IoReceiptOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";

interface EmptyDataProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonOnClick?: () => void;
}

const DataTable = <T,>({
  data,
  columns,
  search,
  columnFilters,
  showHeader = false,
  showBorders = false,
  showPagination = true,
  emptyData,
  isLoading = false,
}: {
  data: T[];
  columns: ColumnDef<T>[];
  search?: string;
  columnFilters?: ColumnFiltersState;
  showHeader?: boolean;
  showBorders?: boolean;
  showPagination?: boolean;
  emptyData?: EmptyDataProps;
  isLoading?: boolean;
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: search,
      columnFilters,
    },
  });

  const EmptyState = () => {
    if (!emptyData) {
      return (
        <TableRow className={showBorders ? "" : "border-0"}>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      );
    }

    return (
      <TableRow className={showBorders ? "" : "border-0"}>
        <TableCell colSpan={columns.length} className="h-[400px] border-0">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="space-y-2 py-12 max-w-xs">
              <div className="flex h-16 w-16 mb-4 items-center justify-center rounded-3xl bg-[#F5F5F5]">
                <IoReceiptOutline className="h-6 w-6 text-[#56616B]" />
              </div>
              <h3 className="text-2xl font-bold text-foreground whitespace-pre-wrap">
                {emptyData.title}
              </h3>
              <p className="text-base text-[#56616B]">
                {emptyData.description}
              </p>
              {emptyData.buttonText && emptyData.buttonOnClick && (
                <Button
                  onClick={emptyData.buttonOnClick}
                  variant="outline"
                  className="max-w-max mt-6 cursor-pointer rounded-full px-8 py-5 text-sm font-medium bg-[#EFF1F6] hover:bg-[#E5E7EB] border-0"
                >
                  {emptyData.buttonText}
                </Button>
              )}
            </div>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  const LoadingSkeleton = () => {
    return (
      <>
        {[...Array(5)].map((_, i) => (
          <TableRow key={i} className={showBorders ? "" : "border-0"}>
            <TableCell className={showBorders ? "" : "border-0"}>
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </TableCell>
            <TableCell
              className={`${showBorders ? "" : "border-0"} text-right`}
            >
              <div className="flex flex-col items-end gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  };

  const isFetching = isLoading && table.getRowModel().rows?.length > 0;
  const isLoadingWithNoData =
    isLoading && table.getRowModel().rows?.length === 0;

  return (
    <div className="w-full">
      <div
        className={`relative overflow-hidden ${
          showBorders ? "rounded-md border" : ""
        }`}
      >
        {isFetching && (
          <div className="w-full h-1 bg-gray-100 overflow-hidden relative">
            <div className="h-full w-2/5 bg-gray-600 rounded-sm absolute top-0 left-0 animate-loading-bar" />
          </div>
        )}

        <Table className="relative">
          {showHeader && (
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
          )}
          <TableBody className={cn(isFetching && "opacity-50")}>
            {isLoadingWithNoData ? (
              <LoadingSkeleton />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={showBorders ? "" : "border-0"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={showBorders ? "" : "border-0"}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <EmptyState />
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && table.getRowModel().rows?.length > 0 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex items-center gap-1 text-muted-foreground flex-1 text-sm">
            Showing Page
            <b>{table.getState().pagination.pageIndex + 1}</b>
            of <b>{table.getPageCount()}</b>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="w-22"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-22"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
