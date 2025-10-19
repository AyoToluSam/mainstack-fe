import { baseApi } from "@/store/api/baseApi";
import type { Transaction } from "./types";

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], void>({
      query: () => "/transactions",
      providesTags: ["transactions"],
    }),
  }),
});

export const { useGetTransactionsQuery } = transactionsApi;
