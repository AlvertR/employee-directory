import { useState } from "react";
import { useGetEmployeesQuery } from "../../data/employeesApi.ts";
import EmployeesTable from "../components/EmployeesTable.tsx";
import EmployeeCreateForm from "../components/EmployeeCreateForm.tsx";
import EmployeeDetailDetailPage from "../../../employee-detail/presentation/pages/EmployeeDetailDetailPage.tsx";

type View =
  | { kind: "list" }
  | { kind: "detail"; employeeId: number }
  | { kind: "create" };

export default function EmployeesPage() {
  const { data: employees, isLoading, error } = useGetEmployeesQuery();
  const [view, setView] = useState<View>({ kind: "list" });

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
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Employee Directory
        </h1>
        <button
          type="button"
          onClick={() => setView({ kind: "create" })}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          + Add Employee
        </button>
      </div>
      <EmployeesTable
        employees={employees ?? []}
        onSelect={(employee) =>
          setView({ kind: "detail", employeeId: employee.id })
        }
      />
    </div>
  );
}
