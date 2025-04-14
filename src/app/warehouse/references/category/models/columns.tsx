import { useState, useRef, useEffect } from "react";
import { DeleteIcon } from "@/assets/icons/delete-icon";
import { EditIcon } from "@/assets/icons/edit-icon";
import { ICategory } from "@/shared/types/warehouse";
import { createColumnHelper } from "@tanstack/react-table";
import { MenuIcon } from "@/assets/icons/menu-icon";

const columnHelper = createColumnHelper<ICategory>();

export const categoryColumns = ({
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
    columnHelper.accessor("name", {
      header: () => "Name",
      cell: (info) => {
        const { name } = info.row.original;
        return `${name}`;
      },
    }),
    columnHelper.display({
      id: "menu",
      header: "Menu",
      cell: (info) => {
        const { id } = info.row.original;
        return (
          <div className="relative">
            <button
              onClick={() => setOpenModalId(openModalId === id ? null : id)}
            >
              <MenuIcon />
            </button>

            {openModalId === id && (
              <div
                ref={modalRef}
                className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded border p-2 z-10"
              >
                <button
                  onClick={() => {
                    onEdit(id);
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
