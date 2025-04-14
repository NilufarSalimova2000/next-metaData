"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import Table from "../../../../shared/ui/table";
import { controllerColumns } from "./models/columns";
import { UniversalModal } from "@/shared/ui/universal-modal";
import { ControllerApi } from "@/redux/services/lis/warehouse/requirement-controller";
import { ControllerForm } from "@/shared/ui/controller-form";

export const ControllerList = () => {
  const [getMutation, result] = ControllerApi.useGetControllerMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const table = useReactTable({
    data: result.data?.data.list || [],
    columns: controllerColumns({
      onEdit: (row) => {
        setSelectedRowData(row);
        setIsModalOpen(true);
      },
      onDelete: (id) => console.log("Delete ID:", id),
    }),
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    getMutation({ departmentId: 15, page: 0, limit: 8, search: { value: "" } });
  }, []);

  return (
    <div>
      <div className="pb-[15px] text-end">
        <button
          className="rounded bg-[#1814f3] py-[8px] px-[17px] text-[#fff] font-[600]"
          onClick={() => {
            setSelectedRowData(null);
            setIsModalOpen(true);
          }}
        >
          Create
        </button>
      </div>

      <Table table={table} />

      <UniversalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedRowData ? "Edit Controller" : "Create Controller"}
      >
        <ControllerForm
          defaultValues={selectedRowData}
          onClose={() => setIsModalOpen(false)}
        />
      </UniversalModal>
    </div>
  );
};
