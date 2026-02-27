import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Employee, Department } from "../domain/employee.types.ts";

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Employee", "Department"],
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => "/employees",
      providesTags: ["Employee"],
    }),
    getDepartments: builder.query<Department[], void>({
      query: () => "/departments",
      providesTags: ["Department"],
    }),
  }),
});

export const { useGetEmployeesQuery, useGetDepartmentsQuery } = employeesApi;
