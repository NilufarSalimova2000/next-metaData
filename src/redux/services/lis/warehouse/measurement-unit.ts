import { authToken } from "@/shared/mock/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IWarehouseReference } from "../../../../shared/types/warehouse";
import { IBaseResponse } from "../../../../shared/types/common";

export const MeasurementApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "organization-id": "57b27e37-cd51-48c1-bcfc-e4e87c2435b1",
    },
  }),
  tagTypes: ["Measurement"],
  endpoints: (builder) => ({
    getMeasurement: builder.mutation<
      IBaseResponse<IWarehouseReference>,
      IWarehouseReference
    >({
      query: () => ({
        url: "/warehouse/measurement-unit/list-search",
        method: "POST",
        body: {
          page: 0,
          limit: 25,
          search: { value: "" },
        },
      }),
      // providesTags: ["Measurement"],
    }),

    createMeasurement: builder.mutation<
      IBaseResponse<IWarehouseReference>,
      IWarehouseReference
    >({
      query: (data) => ({
        url: "/warehouse/measurement-unit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Measurement"],
    }),

    updateMeasurement: builder.mutation<
      IBaseResponse<IWarehouseReference>,
      { id: number; data: IWarehouseReference }
    >({
      query: ({ id, data }) => ({
        url: `/warehouse/measurement-unit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Measurement"],
    }),

    deleteMeasurement: builder.mutation<
      IBaseResponse<IWarehouseReference>,
      number
    >({
      query: (id) => ({
        url: `/warehouse/measurement-unit/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Measurement"],
    }),
  }),
});

export const {
  useCreateMeasurementMutation,
  useDeleteMeasurementMutation,
  useGetMeasurementMutation,
  useUpdateMeasurementMutation,
} = MeasurementApi;
