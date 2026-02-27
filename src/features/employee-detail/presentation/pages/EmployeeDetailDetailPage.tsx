import {
  useGetEmployeeDetailByIdQuery,
  useUpdateEmployeeDetailMutation,
  useGetDepartmentsQuery,
} from "../../data/employee-detailApi.ts";
import EmployeeDetailForm from "../components/EmployeeDetailForm.tsx";
import type { EmployeeDetail } from "../../domain/employee-detail.types.ts";

interface EmployeeDetailDetailPageProps {
  employeeId: number;
  onBack?: () => void;
}

export default function EmployeeDetailDetailPage({
  employeeId,
  onBack,
}: EmployeeDetailDetailPageProps) {
  const {
    data: employee,
    isLoading,
    error,
  } = useGetEmployeeDetailByIdQuery(employeeId);
  const { data: departments } = useGetDepartmentsQuery();
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeDetailMutation();

  const handleSubmit = async (data: Omit<EmployeeDetail, "id">) => {
    await updateEmployee({ id: employeeId, ...data });
  };

  if (isLoading)
    return <p className="p-8 text-gray-500">Loading employee...</p>;
  if (error || !employee)
    return <p className="p-8 text-red-600">Failed to load employee.</p>;

  return (
    <div className="mx-auto max-w-3xl p-8">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mb-4 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          &larr; Back to list
        </button>
      )}
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        {employee.firstName} {employee.lastName}
      </h1>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <EmployeeDetailForm
          defaultValues={employee}
          departments={departments ?? []}
          onSubmit={handleSubmit}
          isSubmitting={isUpdating}
        />
      </div>
    </div>
  );
}
