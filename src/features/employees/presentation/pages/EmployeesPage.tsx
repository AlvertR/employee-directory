import { useMemo, useState } from "react";
import { useGetEmployeesQuery, useGetDepartmentsQuery } from "../../data/employeesApi.ts";
import EmployeesTable from "../components/EmployeesTable.tsx";
import EmployeeCreateForm from "../components/EmployeeCreateForm.tsx";
import EmployeeDetailDetailPage from "../../../employee-detail/presentation/pages/EmployeeDetailDetailPage.tsx";

type View =
  | { kind: "list" }
  | { kind: "detail"; employeeId: number }
  | { kind: "create" };

export default function EmployeesPage() {
  const { data: employees, isLoading, error } = useGetEmployeesQuery();
  const { data: departments } = useGetDepartmentsQuery();
  const [view, setView] = useState<View>({ kind: "list" });
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const filteredEmployees = useMemo(() => {
    if (!employees) return [];
    if (selectedDepartment === "all") return employees;
    return employees.filter((e) => e.department === selectedDepartment);
  }, [employees, selectedDepartment]);

  if (isLoading)
    return <p className="p-8 text-gray-500">Loading employees…</p>;
  if (error)
    return <p className="p-8 text-red-600">Failed to load employees.</p>;

  if (view.kind === "detail") {
    return (
      <EmployeeDetailDetailPage
        employeeId={view.employeeId}
        onBack={() => setView({ kind: "list" })}
      />
    );
  }

  if (view.kind === "create") {
    return (
      <div className="mx-auto max-w-3xl p-8">
        <button
          type="button"
          onClick={() => setView({ kind: "list" })}
          className="mb-4 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          &larr; Back to list
        </button>
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          New Employee
        </h1>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <EmployeeCreateForm onSuccess={() => setView({ kind: "list" })} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Employee Directory
        </h1>
        <button
          type="button"
          onClick={() => setView({ kind: "create" })}
          className="shrink-0 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          + Add Employee
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="department-filter" className="mr-2 text-sm font-medium text-gray-700">
          Department
        </label>
        <select
          id="department-filter"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
        >
          <option value="all">All</option>
          {departments?.map((dept) => (
            <option key={dept.id} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>
      <EmployeesTable
        employees={filteredEmployees}
        onSelect={(employee) =>
          setView({ kind: "detail", employeeId: employee.id })
        }
      />
    </div>
  );
}
