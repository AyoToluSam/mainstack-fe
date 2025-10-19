import { baseApi } from "@/store/api/baseApi";
import type { Wallet } from "./types";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWallet: builder.query<Wallet, void>({
      query: () => "/wallet",
      providesTags: ["wallet"],
    }),
  }),
});

export const { useGetWalletQuery } = walletApi;
