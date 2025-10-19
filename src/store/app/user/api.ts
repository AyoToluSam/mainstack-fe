import { baseApi } from "@/store/api/baseApi";
import type { User } from "./types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => "/user",
      providesTags: ["user"],
    }),
  }),
});

export const { useGetUserQuery } = userApi;
