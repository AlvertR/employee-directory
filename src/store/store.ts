import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { employeesApi } from "../features/employees/data/employeesApi.ts";
import { employeeDetailApi } from "../features/employee-detail/data/employee-detailApi.ts";

export const store = configureStore({
  reducer: {
    [employeesApi.reducerPath]: employeesApi.reducer,
    [employeeDetailApi.reducerPath]: employeeDetailApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(employeesApi.middleware)
      .concat(employeeDetailApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;