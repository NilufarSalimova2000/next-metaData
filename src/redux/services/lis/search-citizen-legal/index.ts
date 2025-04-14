import { authToken } from "@/shared/mock/common";
import { CitizenRootT, LegalRootT } from "@/shared/types/users";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const SearchApi = createApi({
  reducerPath: "SearchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SEARCH_API_URL,
    headers: {
        Authorization: `Bearer ${authToken}`,
        "organization-id": "57b27e37-cd51-48c1-bcfc-e4e87c2435b1",
      },
  }),
  endpoints: (builder) => ({
    getCitizenByPNFL: builder.query<CitizenRootT, { nnuzb: string; photo: string }>({
        query: ({ nnuzb, photo }) => `/Citizen?nnuzb=${nnuzb}&photo=${photo}`,
    }),

    getLegalByINN: builder.query<LegalRootT, { tin: string }>({
        query: ({ tin }) => `/LegalEntity?tin=${tin}`,
    }),
  }),
});

export const {useGetCitizenByPNFLQuery, useLazyGetCitizenByPNFLQuery, useGetLegalByINNQuery, useLazyGetLegalByINNQuery } = SearchApi;

