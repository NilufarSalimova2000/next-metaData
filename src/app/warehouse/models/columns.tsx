import { MenuIcon } from "@/assets/icons/menu-icon";
import { IWarehouse } from "@/shared/types/warehouse";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";

const columnHelper = createColumnHelper<IWarehouse>();

export const warehouseColumns = [
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
  // columnHelper.accessor("itemDescription", {
  //   header: () => "Description",
  //   cell: (info) => {
  //     const { itemDescription } = info.row.original;
  //     return `${itemDescription}`;
  //   },
  // }),
  // columnHelper.accessor("", {
  //   header: () => "Date",
  //   cell: (info) => {
  //     const { date } = info.row.original;
  //     return date
  //     ? dayjs(date).format("MMMM D, YYYY")
  //     : "Noma'lum";;
  //   },
  // }),
  // columnHelper.accessor("notes", {
  //   header: () => "Notes",
  //   cell: (info) => {
  //     const { notes } = info.row.original;
  //     return `${notes}`;
  //   },
  // }),
  // columnHelper.display({
  //   id: "menu",
  //   header: "Menu",
  //   cell: (info) => {
  //     const { id } = info.row.original;
  //     return (
  //       <div>
  //         <button><MenuIcon /></button>
  //       </div>
  //     );
  //   },
  // }),
];
