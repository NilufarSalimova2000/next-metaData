import { authToken } from "@/shared/mock/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateCategoryRequest,
  ICategory,
} from "../../../../shared/types/warehouse";
import { IBaseResponse, IPagination } from "../../../../shared/types/common";

export const CategoryApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "organization-id": "57b27e37-cd51-48c1-bcfc-e4e87c2435b1",
    },
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategory: builder.mutation<
      IBaseResponse<ICategory>,
      { id: number } & IPagination
    >({
      query: ({ id, ...data }) => ({
        url: "/warehouse/category/list-search/15",
        method: "POST",
        body: { ...data },
      }),
    }),

    createCategory: builder.mutation<
      IBaseResponse<ICategory>,
      { departmentId: number } & CreateCategoryRequest
    >({
      query: ({ departmentId, ...data }) => ({
        url: `/warehouse/category/${departmentId}`,
        method: "POST",
        body: data,
      }),
    }),

    updateCategory: builder.mutation<
      IBaseResponse<ICategory>,
      { id: number } & CreateCategoryRequest
    >({
      query: ({ id, ...data }) => ({
        url: `/warehouse/category/${id}/15`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteCategory: builder.mutation<IBaseResponse<ICategory>, number>({
      query: (id) => ({
        url: `/warehouse/category/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryMutation,
  useUpdateCategoryMutation,
} = CategoryApi;
