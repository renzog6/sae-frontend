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
    new: "/companies/new",
    list: "/companies/list",
    create: "/companies/create",
    categories: "/companies/business-categories",
    businessSubcategories: "/companies/business-subcategories",
    detail: (id: number | string) => `/companies/${id}`,
  },

  equipments: {
    root: "/equipments",
    list: "/equipments/list",
    new: "/equipments/new",
    categories: "/equipments/categories",
    types: "/equipments/types",
    models: "/equipments/models",
    transactions: { root: "/equipments/transactions", new: "/equipments/transactions/new" },
    detail: (id: number | string) => `/equipments/${id}`,
  },

  tires: {
    root: "/tires",
    list: "/tires/list",
    new: "/tires/new",
    stock: "/tires/stock",
    sizes: "/tires/sizes",
    models: "/tires/models",
    assignments: "/tires/assignments",
    rotations: "/tires/rotations",
    recaps: "/tires/recaps",
    inspections: "/tires/inspections",
    reports: {
      root: "/tires/reports",
      summary: "/tires/reports/summary",
      events: "/tires/reports/events",
    },
    detail: (id: number | string) => `/tires/${id}`,
  },

  settings: {
    root: "/settings",
    profile: "/settings/profile",
    users: "/settings/users",
    locations: "/settings/locations",
    brands: "/settings/brands",
    units: "/settings/units",
  },

  users: {
    root: "/users",
    new: "/users/new",
    detail: (id: number | string) => `/users/${id}`,
  },

  reports: {
    root: "/reports",
  },
} as const;
