import { authToken } from "@/shared/mock/common";
import {
  AnalyseCreateT,
  AnalyseResponseT,
  ApplicationType,
  BiomaterialType,
  LoincType,
} from "@/shared/types/analyse";
import { IBaseResponse, IPagination } from "@/shared/types/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AnalyseApi = createApi({
  reducerPath: "AnalyseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "organization-id": "57b27e37-cd51-48c1-bcfc-e4e87c2435b1",
    },
  }),
  endpoints: (builder) => ({
    getLoinc: builder.query<
      IBaseResponse<LoincType>,
      { id: number } & IPagination
    >({
      query: ({ id, ...data }) => ({
        url: `/loinc/list-search/${id ?? 1}`,
        method: "POST",
        body: { ...data },
      }),
    }),

    getBiomaterial: builder.query<IBaseResponse<BiomaterialType>, IPagination>({
      query: ({ ...data }) => ({
        url: `/type-biomaterial/list-search`,
        method: "POST",
        body: { ...data },
      }),
    }),

    getAnalyse: builder.query<IBaseResponse<BiomaterialType>, IPagination>({
      query: ({ ...data }) => ({
        url: `/analyse-type/list-search`,
        method: "POST",
        body: { ...data },
      }),
    }),

    getMeasurementUnit: builder.query<
      IBaseResponse<BiomaterialType>,
      IPagination
    >({
      query: ({ ...data }) => ({
        url: `/measurement-unit/list-search`,
        method: "POST",
        body: { ...data },
      }),
    }),

    getApplication: builder.query<
      IBaseResponse<ApplicationType>,
      IPagination
    >({
      query: ({ ...data }) => ({
        url: `/application-type/list-search`,
        method: "POST",
        body: { ...data },
      }),
    }),

    createAnalyse: builder.mutation<AnalyseResponseT, AnalyseCreateT>({
      query: (data) => ({
        url: "/analyse",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAnalyseQuery,
  useGetApplicationQuery,
  useGetBiomaterialQuery,
  useGetLoincQuery,
  useGetMeasurementUnitQuery,
  useCreateAnalyseMutation,
} = AnalyseApi;
