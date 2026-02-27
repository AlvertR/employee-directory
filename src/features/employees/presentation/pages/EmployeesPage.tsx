import { useGetEmployeesQuery } from "../../data/employeesApi.ts";
import EmployeesTable from "../components/EmployeesTable.tsx";

export default function EmployeesPage() {
  const { data: employees, isLoading, error } = useGetEmployeesQuery();

  if (isLoading) return <p className="p-8 text-gray-500">Loading employees…</p>;
  if (error) return <p className="p-8 text-red-600">Failed to load employees.</p>;

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Employee Directory
      </h1>
      <EmployeesTable employees={employees ?? []} />
    </div>
  );
}
