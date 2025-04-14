import { createColumnHelper } from "@tanstack/react-table";
import { MenuIcon } from "@/assets/icons/menu-icon";
import { IController } from "@/shared/types/warehouse";
import { useEffect, useRef, useState } from "react";
import { DeleteIcon } from "@/assets/icons/delete-icon";
import { EditIcon } from "@/assets/icons/edit-icon";

const columnHelper = createColumnHelper<IController>();

export const controllerColumns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}) => {
  const [openModalId, setOpenModalId] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenModalId(null);
      }
    };

    if (openModalId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModalId]);

  return [
    columnHelper.accessor("id", {
      header: () => "Id",
      cell: (info) => {
        const { id } = info.row.original;
        return `${id}`;
      },
    }),

    columnHelper.accessor("receiver", {
      header: () => "receiver",
      cell: (info) => {
        const { receiver } = info.row.original;
        return receiver?.name || "N/A";
      },
    }),
    columnHelper.accessor("executionPriority", {
      header: () => "executionPriority",
      cell: (info) => {
        const { executionPriority } = info.row.original;
        return `${executionPriority}`;
      },
    }),
    columnHelper.accessor("docNumber", {
      header: () => "docNumber",
      cell: (info) => {
        const { docNumber } = info.row.original;
        return `${docNumber}`;
      },
    }),
    columnHelper.accessor("deliveryDate", {
      header: () => "deliveryDate",
      cell: (info) => {
        const { deliveryDate } = info.row.original;
        return `${deliveryDate}`;
      },
    }),
    columnHelper.display({
      id: "menu",
      header: "Menu",
      cell: (info) => {
        const { id } = info.row.original;
        return (
          <div className="relative">
            <button onClick={() => setOpenModalId(id ?? null)}>
              <MenuIcon />
            </button>

            {openModalId === id && (
              <div
                ref={modalRef}
                className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded border p-2 z-10"
              >
                <button
                  onClick={() => {
                    onEdit(info.row.original);
                    setOpenModalId(null);
                  }}
                  className="flex items-center gap-2 w-full px-2 py-1 hover:bg-gray-100"
                >
                  <EditIcon /> Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(id);
                    setOpenModalId(null);
                  }}
                  className="flex items-center gap-2 w-full px-2 py-1 hover:bg-gray-100"
                >
                  <DeleteIcon /> Delete
                </button>
              </div>
            )}
          </div>
        );
      },
    }),
  ];
};
