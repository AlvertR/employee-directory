import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type {
  EmployeeDetail,
  Department,
} from "../../domain/employee-detail.types.ts";

const employeeDetailSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  position: z.string().min(1, "Position is required"),
  department: z.string().min(1, "Department is required"),
  startDate: z.string().min(1, "Start date is required"),
  status: z.enum(["active", "inactive"]),
});

type EmployeeDetailFormValues = z.infer<typeof employeeDetailSchema>;

interface EmployeeDetailFormProps {
  defaultValues?: EmployeeDetail;
  departments: Department[];
  onSubmit: (data: EmployeeDetailFormValues) => void;
  isSubmitting?: boolean;
}

export default function EmployeeDetailForm({
  defaultValues,
  departments,
  onSubmit,
  isSubmitting = false,
}: EmployeeDetailFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeDetailFormValues>({
    resolver: zodResolver(employeeDetailSchema),
    defaultValues: defaultValues
      ? {
          firstName: defaultValues.firstName,
          lastName: defaultValues.lastName,
          email: defaultValues.email,
          position: defaultValues.position,
          department: defaultValues.department,
          startDate: defaultValues.startDate,
          status: defaultValues.status,
        }
      : {
          firstName: "",
          lastName: "",
          email: "",
          position: "",
          department: "",
          startDate: "",
          status: "active",
        },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            {...register("firstName")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            {...register("lastName")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="position"
            className="block text-sm font-medium text-gray-700"
          >
            Position
          </label>
          <input
            id="position"
            type="text"
            {...register("position")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          {errors.position && (
            <p className="mt-1 text-sm text-red-600">
              {errors.position.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700"
          >
            Department
          </label>
          <select
            id="department"
            {...register("department")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select a department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="mt-1 text-sm text-red-600">
              {errors.department.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            {...register("startDate")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-600">
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">
              {errors.status.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
