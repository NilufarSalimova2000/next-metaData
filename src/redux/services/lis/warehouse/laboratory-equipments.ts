import { authToken } from "@/shared/mock/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILaboratory } from "../../../../shared/types/warehouse";
import { IBaseResponse } from "../../../../shared/types/common";

export const LaboratoryApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "organization-id": "57b27e37-cd51-48c1-bcfc-e4e87c2435b1",
    },
  }),
  tagTypes: ["Laboratory"],
  endpoints: (builder) => ({
    getLaboratory: builder.mutation<IBaseResponse<ILaboratory>, ILaboratory>({
      query: () => ({
        url: "/labaratory-equipments/list-search",
        method: "POST",
        body: {
          page: 0,
          limit: 25,
          search: { value: "" },
        },
      }),
    }),

    createLaboratory: builder.mutation<IBaseResponse<ILaboratory>, ILaboratory>(
      {
        query: (data) => ({
          url: "/labaratory-equipments",
          method: "POST",
          body: data,
        }),
      }
    ),

    updateLaboratory: builder.mutation<
      IBaseResponse<ILaboratory>,
      { id: number; data: ILaboratory }
    >({
      query: ({ id, data }) => ({
        url: `/labaratory-equipments/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteLaboratory: builder.mutation<IBaseResponse<ILaboratory>, number>({
      query: (id) => ({
        url: `/labaratory-equipments/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateLaboratoryMutation,
  useDeleteLaboratoryMutation,
  useGetLaboratoryMutation,
  useUpdateLaboratoryMutation,
} = LaboratoryApi;
