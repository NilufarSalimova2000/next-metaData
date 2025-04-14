"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { warehouseColumns } from "@/app/warehouse/models/columns";
import Table from "../../shared/ui/table";
import { WarehouseApi } from "@/redux/services/lis/warehouse";
import { ArrowRightIcon } from "@/assets/icons/arrow-right-icon";
import { ArrowLeftIcon } from "@/assets/icons/arrow-left-icon";

export const WarehouseList = () => {
  const [getMutation, result] = WarehouseApi.useGetWarehousesMutation();
  const [page, setPage] = useState(0);
  const limit = 8;

  useEffect(() => {
    getMutation({
      id: 15,
      page,
      limit,
      search: { value: "" },
    });
  }, [page]);

  const table = useReactTable({
    data: result.data?.data.list || [],
    columns: warehouseColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const isNextDisabled = (result.data?.data.list?.length ?? 0) < limit;

  return (
    <div>
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
    </div>
  );
};
