import { useGetEmployeeDetailsQuery } from "../../data/employee-detailApi.ts";
import EmployeeDetailTable from "../components/EmployeeDetailTable.tsx";

export default function EmployeeDetailPage() {
  const { data: employees, isLoading, error } = useGetEmployeeDetailsQuery();

  if (isLoading)
    return <p className="p-8 text-gray-500">Loading employees...</p>;
  if (error)
    return <p className="p-8 text-red-600">Failed to load employees.</p>;

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Employee Details
      </h1>
      <EmployeeDetailTable employees={employees ?? []} />
    </div>
  );
}
