import { authToken } from "@/shared/mock/common";
import { RegionsType } from "@/shared/types/users";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DistrictApi = createApi({
  reducerPath: "DistrictApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "organization-id": "57b27e37-cd51-48c1-bcfc-e4e87c2435b1",
    },
  }),
  endpoints: (builder) => ({
    getDistrict: builder.query<RegionsType[], { id: number }>({
      query: ({ id }) => `/district/get-by-region/${id}`,
    }),
  }),
});

export const { useGetDistrictQuery, useLazyGetDistrictQuery } = DistrictApi;
