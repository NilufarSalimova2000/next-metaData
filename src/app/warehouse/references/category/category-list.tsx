"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import Table from "../../../../shared/ui/table";
import { CategoryApi } from "@/redux/services/lis/warehouse/category";
import { categoryColumns } from "./models/columns";
import { ArrowLeftIcon } from "@/assets/icons/arrow-left-icon";
import { ArrowRightIcon } from "@/assets/icons/arrow-right-icon";
import { Modal } from "@/shared/ui/modal";

export const CategoryList = () => {
  const [getMutation, result] = CategoryApi.useGetCategoryMutation();
  const [createMutation] = CategoryApi.useCreateCategoryMutation();
  const [updateMutation] = CategoryApi.useUpdateCategoryMutation();
  const [deleteMutation] = CategoryApi.useDeleteCategoryMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [defaultValues, setDefaultValues] = useState<
    { name: string } | undefined
  >(undefined);
  const [page, setPage] = useState(0);
  const limit = 8;

  const handleCreateOrUpdateCategory = async (data: { name: string }) => {
    try {
      if (editId) {
        await updateMutation({ id: editId, ...data });
      } else {
        await createMutation({ departmentId: 15, ...data });
      }
      setIsModalOpen(false);
      setEditId(null);
      setDefaultValues(undefined);
      getMutation({ id: 15, page, limit, search: { value: "" } });
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  useEffect(() => {
    getMutation({
      id: 15,
      page,
      limit,
      search: { value: "" },
    });
  }, [page]);

  const handleEditCategory = (id: number) => {
    const category = result.data?.data.list.find((item: any) => item.id === id);
    if (category) {
      setEditId(id);
      setDefaultValues({ name: category.name });
      setIsModalOpen(true);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteMutation(id);
      getMutation({ id: 15, page, limit, search: { value: "" } });
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const table = useReactTable({
    data: result.data?.data.list || [],
    columns: categoryColumns({
      onEdit: handleEditCategory,
      onDelete: handleDeleteCategory,
    }),
    getCoreRowModel: getCoreRowModel(),
  });

  const isNextDisabled = (result.data?.data.list?.length ?? 0) < limit;

  return (
    <div>
      <div className="pb-[15px] text-end">
        <button
          onClick={() => {
            setEditId(null);
            setDefaultValues(undefined);
            setIsModalOpen(true);
          }}
          className="rounded bg-[#1814f3] py-[8px] px-[17px] text-[#fff] font-[600]"
        >
          Create
        </button>
      </div>
      <Table table={table} />

      <div className="flex justify-end gap-4 mt-4 items-center">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          <ArrowLeftIcon />
        </button>
        <span>Page {page + 1}</span>
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={isNextDisabled}
        >
          <ArrowRightIcon />
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditId(null);
          setDefaultValues(undefined);
        }}
        onSubmit={handleCreateOrUpdateCategory}
        defaultValues={defaultValues}
      />
    </div>
  );
};
