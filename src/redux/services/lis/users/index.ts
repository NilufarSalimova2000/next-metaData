import { authToken } from "@/shared/mock/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UsersType } from "../../../../shared/types/warehouse";
import { IBaseResponse, IPagination } from "../../../../shared/types/common";

export const UsersApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "organization-id": "57b27e37-cd51-48c1-bcfc-e4e87c2435b1",
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.mutation<IBaseResponse<UsersType>, { id: number } & IPagination>({
      query: ({ id, ...data }) => ({
        url: `/user/list-search/${id ?? 1}`,
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const { useGetUsersMutation } = UsersApi;
