# AGENTS.md - SAE Frontend

## Project Overview

- **Type**: Next.js 16 (App Router) + TypeScript enterprise webapp
- **Port**: 3003 (dev), 3003 (prod)
- **Backend**: http://localhost:3305
- **Auth**: NextAuth.js with JWT
- **Key Dependencies**: TanStack Query, Zod, shadcn/ui, Tailwind CSS v4

## Commands

```bash
npm run dev      # Start dev server (port 3003)
npm run build   # Production build
npm run start   # Start production server
```

## Environment Variables

Create `.env.local`:

```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3305/api
API_URL=http://localhost:3305/api
NEXTAUTH_URL=http://localhost:3003
NEXTAUTH_SECRET=<generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
```

## Code Conventions

- Components: `PascalCase` (e.g., `CompanyList.tsx`)
- Hooks: `camelCase` with `use` prefix (e.g., `useCompanies.ts`)
- Types: `PascalCase` (e.g., `Company.ts`)
- Files: `kebab-case` (e.g., `api-client.ts`)

## Key Patterns

### Custom Hook Pattern
```typescript
// lib/hooks/useCompanies.ts
export function useCompanies(params?: CompanyQueryParams) {
  return useQuery({
    queryKey: ["companies", params],
    queryFn: () => CompanyService.getAll(params),
    staleTime: 5 * 60 * 1000,
  });
}
```

### Service Pattern (extends BaseApiService)
```typescript
// lib/api/companies/company.service.ts
class CompanyService extends BaseApiService<Company> {
  protected basePath = "/companies";
}
```

### Validation (Zod)
```typescript
// lib/validations/company.ts
export const companySchema = z.object({
  name: z.string().min(1),
  // ...
});
```

## Structure

```
sae-frontend/
├── app/              # Pages (App Router)
├── components/ui/    # shadcn/ui components
├── lib/
│   ├── api/         # API services
│   ├── hooks/        # Custom hooks
│   ├── types/       # TypeScript types
│   ├── validations/ # Zod schemas
│   └── utils/        # Utilities
└── docs/            # Documentation
```

## Linting & Type Checking

```bash
npm run lint        # ESLint
npm run typecheck  # TypeScript
```

## Available Skills

The project has AI skills installed in `.agents/skills/`. Use them as reference when working on related tasks:

### Core Skills
- **zod** - Validation schemas with Zod (lib/validations/)
- **next-best-practices** - Next.js 16 best practices
- **composition-patterns** - React composition patterns
- **tailwind-v4-shadcn** - Tailwind CSS v4 + shadcn/ui setup
- **tailwind-css-patterns** - Tailwind CSS patterns
- **shadcn** - shadcn/ui components

### Additional Skills
- **react-hook-form** - React Hook Form patterns
- **accessibility** - Web accessibility (WCAG)
- **web-quality-skills/seo** - SEO best practices
- **typescript-advanced-types** - Advanced TypeScript types

---

## Optional Advanced Suggestions

### Add Prettier

```bash
npm install -D prettier
```

Add `.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### Add Husky + Lint-staged

```bash
npm install -D husky lint-staged
npx husky init
```

Add to `package.json`:

```json
"lint-staged": {
  "*.{ts,tsx}": ["eslint --fix", "tsc --noEmit"]
}
```

### Add Testing (Vitest + React Testing Library)

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Add to `package.json`:

```json
"test": "vitest",
"coverage": "vitest --coverage"
```

### CI already configured

The root repository already defines `.github/workflows/ci.yml`, including backend,
frontend, migrations, E2E and OpenAPI contract validation. Do not create a second
workflow unless the existing one is intentionally replaced.

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
      - run: npm ci
      - run: npm run build
```

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
