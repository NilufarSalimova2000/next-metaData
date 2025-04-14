import { authToken } from "@/shared/mock/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBaseResponse, IOrganization, IPagination } from "../../../../shared/types/common";

export const OrganizationApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "organization-id": "57b27e37-cd51-48c1-bcfc-e4e87c2435b1",
    },
  }),
  tagTypes: ["Organization"],
  endpoints: (builder) => ({
    getOrganization: builder.mutation<IBaseResponse<IOrganization>, any>({
      query: ({ ...data }) => ({
        url: `/organization/list-search`,
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const { useGetOrganizationMutation } = OrganizationApi;
