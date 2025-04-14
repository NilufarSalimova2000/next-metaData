import { authToken } from "@/shared/mock/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IController,
  IControllerCreate,
} from "../../../../shared/types/warehouse";
import { IBaseResponse, IPagination } from "../../../../shared/types/common";

export const ControllerApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "organization-id": "57b27e37-cd51-48c1-bcfc-e4e87c2435b1",
    },
  }),
  tagTypes: ["Controller"],
  endpoints: (builder) => ({
    getSingleController: builder.query<IController, number>({
      query: (id) => `/warehouse/requirements/${id}`,
    }),
    getController: builder.mutation<
      IBaseResponse<IController>,
      { departmentId: number } & IPagination
    >({
      query: ({ departmentId, ...data }) => ({
        url: `/warehouse/requirements/list-search/${departmentId}`,
        method: "POST",
        body: { ...data },
      }),
    }),

    createController: builder.mutation<
      IBaseResponse<IController>,
      { departmentId: number } & IControllerCreate
    >({
      query: ({ departmentId, ...data }) => ({
        url: `/warehouse/requirements/${departmentId}`,
        method: "POST",
        body: data,
      }),
    }),

    updateController: builder.mutation<
      IBaseResponse<IController>,
      { id: number; departmentId: number } & IControllerCreate
    >({
      query: ({ id, departmentId, ...data }) => ({
        url: `/warehouse/requirements/${id}/${departmentId}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateControllerMutation,
  useGetControllerMutation,
  useUpdateControllerMutation,
  useGetSingleControllerQuery,
  useLazyGetSingleControllerQuery,
} = ControllerApi;
