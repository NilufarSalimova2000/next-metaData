import { authToken } from "@/shared/mock/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IWarehouse } from "../../../../shared/types/warehouse";
import { IBaseResponse, IPagination } from "../../../../shared/types/common";

export const WarehouseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "organization-id": "57b27e37-cd51-48c1-bcfc-e4e87c2435b1",
    },
  }),
  tagTypes: ["Warehouse"],
  endpoints: (builder) => ({
    getWarehouses: builder.mutation<
      IBaseResponse<IWarehouse>,
      { id: number } & IPagination
    >({
      query: ({ id, ...data }) => ({
        url: `/warehouse/item/list-search/${id}`,
        method: "POST",
        body: { ...data },
      }),
    }),

    getWarehouse: builder.query<IWarehouse, number>({
      query: (id) => `/warehouse/item/${id}`,
      providesTags: ["Warehouse"],
    }),

    createWarehouse: builder.mutation<IBaseResponse<IWarehouse>, any>({
      query: (data) => ({
        url: "/warehouse/item/15",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Warehouse"],
    }),

    updateWarehouse: builder.mutation<
      IBaseResponse<IWarehouse>,
      { id: number; data: IWarehouse }
    >({
      query: ({ id, data }) => ({
        url: `/warehouse/item/${id}/15`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Warehouse"],
    }),

    deleteWarehouse: builder.mutation<IBaseResponse<IWarehouse>, number>({
      query: (id) => ({
        url: `/warehouse/item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Warehouse"],
    }),
  }),
});

export const {
  useGetWarehousesMutation,
  useCreateWarehouseMutation,
  useDeleteWarehouseMutation,
  useGetWarehouseQuery,
  useUpdateWarehouseMutation,
} = WarehouseApi;
