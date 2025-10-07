// filepath: sae-frontend/lib/routes.ts

export const routes = {
  home: "/",
  dashboard: "/dashboard",

  employees: {
    root: "/employees",
    new: "/employees/new",
    list: "/employees/list",
    vacation: "/employees/vacations",
    detail: (id: number | string) => `/employees/${id}`,
  },

  companies: {
    root: "/companies",
    list: "/companies/list",
    create: "/companies/create",
    detail: (id: number | string) => `/companies/${id}`,
  },

  settings: {
    root: "/settings",
    profile: "/settings/profile",
    users: "/settings/users",
  },
} as const;
