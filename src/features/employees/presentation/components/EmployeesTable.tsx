import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Employee } from "../../domain/employee.types.ts";

const columnHelper = createColumnHelper<Employee>();

const columns = [
  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: "name",
    header: "Name",
  }),
  columnHelper.accessor("position", { header: "Position" }),
  columnHelper.accessor("department", { header: "Department" }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      const isActive = status === "active";
      return (
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
            isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${isActive ? "bg-green-600" : "bg-red-600"}`}
            aria-hidden="true"
          />
          {status}
        </span>
      );
    },
  }),
];

interface EmployeesTableProps {
  employees: Employee[];
  onSelect?: (employee: Employee) => void;
}

export default function EmployeesTable({ employees, onSelect }: EmployeesTableProps) {
  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowKeyDown = (e: React.KeyboardEvent, employee: Employee) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(employee);
    }
  };

  if (employees.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white">
        <p className="py-12 text-center text-sm text-gray-500">No employees found.</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200" aria-label="Employee directory">
        <thead className="border-b border-gray-300 bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              tabIndex={onSelect ? 0 : undefined}
              role={onSelect ? "link" : undefined}
              aria-label={onSelect ? `View ${row.original.firstName} ${row.original.lastName}` : undefined}
              className={`hover:bg-gray-100 ${onSelect ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500" : ""}`}
              onClick={() => onSelect?.(row.original)}
              onKeyDown={onSelect ? (e) => handleRowKeyDown(e, row.original) : undefined}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="whitespace-nowrap px-6 py-4 text-sm text-slate-900 sm:whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
