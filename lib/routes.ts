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

  equipments: {
    root: "/equipments",
    list: "/equipments/list",
    new: "/equipments/new",
    categories: "/equipments/categories",
    types: "/equipments/types",
    models: "/equipments/models",
    detail: (id: number | string) => `/equipments/${id}`,
  },

  settings: {
    root: "/settings",
    profile: "/settings/profile",
    users: "/settings/users",
  },
} as const;
