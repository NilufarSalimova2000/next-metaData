import { authToken } from "@/shared/mock/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBaseResponse } from "../../../../shared/types/common";
import { RegionsType } from "@/shared/types/users";

export const RegionsApi = createApi({
  reducerPath: "RegionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "organization-id": "57b27e37-cd51-48c1-bcfc-e4e87c2435b1",
    },
  }),
  endpoints: (builder) => ({
    getRegions: builder.mutation<IBaseResponse<RegionsType>, any>({
      query: ({ ...data }) => ({
        url: `/regions/list-search`,
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const { useGetRegionsMutation } = RegionsApi;
