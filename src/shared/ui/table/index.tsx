import { flexRender } from "@tanstack/react-table";

const Table = (props) => {
  const { table } = props;

  return (
    <div className="py-[20px] px-[30px] w-[1200px]  bg-[#fff] rounded-[25px]">
      <table className=" w-[1150px]">
        <thead className="border-b-[#e6eff5] border-b-[1px]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              className="text-[#718ebf] text-[16px] font-[500] h-[35px]"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-center ">
          {table.getRowModel().rows.map((row) => (
            <tr
              className="border-b-[#e6eff5] border-b-[1px] h-[45px] text-[#232323] text-[16px] font-normal"
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <td className="" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
    </div>
  );
};

export default Table;
