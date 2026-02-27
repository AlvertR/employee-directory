import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  EmployeeDetail,
  Department,
} from "../domain/employee-detail.types.ts";

export const employeeDetailApi = createApi({
  reducerPath: "employeeDetailApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["EmployeeDetail", "Department"],
  endpoints: (builder) => ({
    getEmployeeDetails: builder.query<EmployeeDetail[], void>({
      query: () => "/employees",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "EmployeeDetail" as const,
                id,
              })),
              "EmployeeDetail",
            ]
          : ["EmployeeDetail"],
    }),
    getEmployeeDetailById: builder.query<EmployeeDetail, number>({
      query: (id) => `/employees/${id}`,
      providesTags: (_result, _error, id) => [{ type: "EmployeeDetail", id }],
    }),
    createEmployeeDetail: builder.mutation<
      EmployeeDetail,
      Omit<EmployeeDetail, "id">
    >({
      query: (body) => ({
        url: "/employees",
        method: "POST",
        body,
      }),
      invalidatesTags: ["EmployeeDetail"],
    }),
    updateEmployeeDetail: builder.mutation<EmployeeDetail, EmployeeDetail>({
      query: ({ id, ...body }) => ({
        url: `/employees/${id}`,
        method: "PUT",
        body: { id, ...body },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "EmployeeDetail", id },
        "EmployeeDetail",
      ],
    }),
    deleteEmployeeDetail: builder.mutation<void, number>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EmployeeDetail"],
    }),
    getDepartments: builder.query<Department[], void>({
      query: () => "/departments",
      providesTags: ["Department"],
    }),
  }),
});

export const {
  useGetEmployeeDetailsQuery,
  useGetEmployeeDetailByIdQuery,
  useCreateEmployeeDetailMutation,
  useUpdateEmployeeDetailMutation,
  useDeleteEmployeeDetailMutation,
  useGetDepartmentsQuery,
} = employeeDetailApi;
