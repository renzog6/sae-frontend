# SAE Frontend

A comprehensive enterprise web application built with **Next.js 15 (App Router)**, **TypeScript 5.1+**, and **Tailwind CSS 4.0**. Modern, responsive, and accessible interface integrating robust JWT authentication, complete user management, companies, employees, equipment, specialized tires, polymorphic contacts, and geographic locations. Includes 80+ pages and 200+ components organized by business domain with scalable modular architecture.

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Development](#-development)
- [Production Build](#-production-build)
- [Docker](#-docker)
- [Backend Integration](#-backend-integration)
- [Authentication](#-authentication)
- [API Integration](#-api-integration)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Overview

SAE Frontend is a high-quality, scalable enterprise web application built with Next.js 15 (App Router), TypeScript 5.1+ (strict mode), and Tailwind CSS 4.0, providing a complete and professional interface for the SAE business management system. It integrates secure authentication with NextAuth.js 4.24+, form validation with Zod 4.1+, efficient state management with TanStack Query 5.90+, and a modern, fully accessible UI based on shadcn/ui and Radix UI. Designed for medium and large companies with vehicle fleets and specialized tire management.

### 📊 Project Statistics

- **Version**: 1.1.0
- **Author**: Renzo O. Gorosito
- **License**: MIT
- **Framework**: Next.js 15.5.3 (App Router)
- **Language**: TypeScript 5.1+ (strict mode)
- **UI Framework**: Tailwind CSS 4.0 + shadcn/ui
- **Pages**: 80+ pages organized by business domain
- **Components**: 200+ reusable components
- **Hooks**: 25+ custom hooks
- **Validations**: 30+ Zod schemas
- **API Services**: 15+ typed API services
- **Routes**: 50+ dynamic and nested routes

## ✨ Features

### 🔐 Enterprise Authentication & Security

- **NextAuth.js Complete**: JWT authentication with multiple providers
- **Advanced Middleware**: Route protection with Next.js middleware
- **Session Management**: Access/refresh tokens with automatic expiration
- **Role System**: USER, ADMIN with hierarchical permissions
- **Dynamic Navigation**: Menu filtered by user roles
- **CSRF Protection**: Configured for additional security

### 📊 Complete Data Management

- **👥 Users**: Full CRUD with roles and permissions (USER, ADMIN)
- **🏢 Companies**: Complete management with business categories and subcategories
- **👷 Employees**: Full HR with categories, positions, vacations, and documents
- **📞 Contacts**: Polymorphic system for companies and people (email, phone, WhatsApp, etc.)
- **👤 People & Families**: Physical person management with family relationships
- **📍 Locations**: Complete geographic system (countries, provinces, cities, addresses)
- **🏷️ Catalogs**: Brands, units, equipment, categories, and types
- **🛞 Tires**: Specialized lifecycle management with assignments, rotations, recaps, and inspections
- **📋 History**: Incidents, maintenance, events, and complete auditing

### 🎨 Enterprise Professional UI

- **🎯 Modern & Accessible UI**: shadcn/ui + Radix UI with 100% accessible components (WCAG 2.1 AA)
- **🌓 Dynamic Enterprise Theme**: Light/dark/professional with next-themes, automatic persistence, and branding
- **📝 Advanced Forms**: Real-time validation with Zod + React Hook Form + contextual visual feedback
- **📊 Interactive Enterprise Tables**: TanStack Table with multi-column sorting, advanced filters, intelligent pagination, and export
- **🔔 Professional Notifications**: Toast system with Framer Motion, fluid animations, and success/warning/error/info categories
- **📱 Complete Responsive Design**: Adaptive layout with optimized breakpoints for desktop/tablet/mobile/printing
- **🧭 Intelligent Sidebar**: Contextual navigation with automatic collapse, dynamic breadcrumbs, and persistent state
- **🔍 Enterprise Global Search**: Command palette with fuzzy search, quick navigation, and keyboard shortcuts
- **📈 Executive Dashboard**: Overview with key metrics, interactive charts, and quick access to critical modules
- **🛞 Visual Axle Diagram**: Interactive component for visual tire position configuration
- **⚡ Visual Performance**: Lazy loading, skeleton states, optimized loading states, and fluid transitions

### 🏗️ Advanced Enterprise Technical Architecture

- **🚀 Next.js 15 App Router**: Modern routing with nested layouts, loading states, and error boundaries
- **📝 Enterprise TypeScript**: Strong typing across 200+ files with strict mode and noImplicitAny
- **💾 TanStack Query Enterprise**: Optimized server/client state management with intelligent caching, background refetching, and optimistic updates
- **🌐 Advanced Axios Interceptors**: HTTP client with automatic JWT token handling, retry logic, and global error handling
- **🧩 Modular Enterprise Components**: 200+ reusable components, typed, and organized by business domain
- **🎣 Enterprise Custom Hooks**: Business logic separated, testable, and reusable with advanced composition
- **✅ Robust Enterprise Validations**: Zod schemas for complete type safety with complex business validations
- **🏷️ Centralized Constants**: Enums, labels, configurations, and metadata organized by domain
- **🔄 Hybrid State Management**: TanStack Query for server state + Zustand for complex client state
- **🛡️ Error Boundaries**: Granular error handling with automatic recovery and structured logging
- **📊 Business Logic Layer**: Clear separation between UI, business logic, and API services

## 🏗️ Architecture

### 🏛️ Hexagonal Enterprise Architecture Pattern

The project implements a **modular and scalable hexagonal architecture** following Next.js 15 best practices, with **clear responsibility separation** and **well-defined layers**:

#### **🏗️ Domain-Driven Structure**

- **🗂️ App Router Enterprise**: Routes organized by nested directories with layouts, loading states, and error boundaries
- **🧩 Components by Module**: UI components grouped by business functionality with advanced composition
- **🔀 Enterprise Concerns Separation**: API, hooks, validations, constants, and business logic in specialized layers
- **📝 Enterprise Type Safety**: Shared types, centralized enums, and business validations
- **💾 Hybrid State Management Enterprise**: TanStack Query for optimized server state, Zustand for complex client state

#### **🔄 Optimized Enterprise Data Flow**

1. **🔐 Enterprise Authentication**: NextAuth.js handles JWT sessions with advanced middleware and automatic refresh
2. **📡 Enterprise API Calls**: Axios with interceptors for tokens, retry logic, and global error handling
3. **💾 Intelligent State Management**: TanStack Query with intelligent cache, background refetching, and optimistic updates
4. **🔄 Reactive UI Updates**: Custom React hooks with composition for complex business logic
5. **✅ Enterprise Validations**: Zod schemas with business validations, complete type safety, and contextual feedback

#### **🛡️ Enterprise-Level Security**

- **🚧 Advanced Middleware**: Granular route protection with role-based access and session validation
- **🔑 Stateless Secure JWT**: Authentication without state with rotating refresh tokens and automatic expiration
- **👥 Enterprise RBAC**: Role-based access control with hierarchical permissions (USER < MANAGER < ADMIN)
- **🔍 Dual Input Validation**: Client/server synchronized validations with real-time visual feedback
- **🛡️ XSS/CSRF Protection**: Automatic sanitization, security headers, and strict input validations
- **📊 Audit Trail**: Complete logging of critical actions with traceability and accountability

## 🛠 Tech Stack

### 🚀 Core Enterprise Framework

- **Next.js** 15.5.3 - React framework with App Router and Turbopack
- **React** 19.2.1 - React with concurrent features
- **TypeScript** 5.1.3 - Strict static typing across the entire project

### 🎨 Professional UI & Styling

- **Tailwind CSS** 4.1.17 - Cutting-edge utility-first CSS framework
- **shadcn/ui** - Customizable and accessible UI components (200+ components)
- **Radix UI** - Headless primitives for maximum accessibility
- **Lucide React** 0.560.0 - Consistent and modern iconography
- **Framer Motion** 12.23.26 - Fluid and professional animations
- **next-themes** 0.4.6 - Theme management with automatic persistence

### 📊 Advanced State & Data Management

- **TanStack Query** 5.90.12 - Intelligent server/client state management
- **Axios** 1.13.2 - HTTP client with interceptors and error handling
- **@tanstack/react-table** 8.21.3 - Data tables with virtualization and filters

### 📝 Forms & Validation

- **React Hook Form** 7.68.0 - Performant form management
- **@hookform/resolvers** 5.2.1 - Zod integration with RHF
- **Zod** 4.1.13 - Schema validation with type inference

### 🔐 Enterprise Authentication

- **NextAuth.js** 4.24.13 - Complete authentication with multiple providers
- **JWT Management**: Access/refresh tokens with automatic renewal
- **Session Handling**: Session persistence and management

### 🛠️ Utilities & Tools

- **class-variance-authority** 0.7.1 - Dynamic CSS variant system
- **clsx** 2.1.1 - Optimized conditional class utilities
- **tailwind-merge** 3.4.0 - Intelligent Tailwind class merging
- **cmdk** 1.1.1 - Command palette for global search

### 💻 Enterprise Development & Quality

- **ESLint Enterprise**: Advanced linting with personalized rules for consistent and secure code
- **Prettier Enterprise**: Automatic consistent code formatting with team configuration
- **Turbopack Optimized**: Ultra-fast bundler for instant HMR development
- **TypeScript Strict Enterprise**: Strict configuration (noImplicitAny, strictNullChecks) for maximum type safety
- **Testing Ready**: Jest + React Testing Library configured for unit and integration tests
- **Code Coverage**: Configured for >80% coverage with detailed reports
- **CI/CD Ready**: Prepared for continuous integration with GitHub Actions
- **Storybook**: Documented and isolated testable components

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Docker (optional, for containerized deployment)

## 🚀 Installation

```bash
# Clone the repository
git clone <repository-url>
cd sae-frontend

# Install dependencies
npm install
```

## 🔧 Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Environment
NODE_ENV=development

# Backend API (NestJS)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3305
API_URL=http://localhost:3305/api

# NextAuth
NEXTAUTH_URL=http://localhost:3003
NEXTAUTH_SECRET=your-secure-secret-key-here
NEXTAUTH_DEBUG=true

# Optional: Additional configuration
# NEXT_PUBLIC_APP_NAME=SAE Frontend
# NEXT_PUBLIC_APP_VERSION=1.1.0
```

### Environment Variables Explanation

- `NEXT_PUBLIC_API_BASE_URL`: Public URL for the SAE backend API (used in browser)
- `API_URL`: Internal API URL for server-side calls (Docker/internal)
- `NEXTAUTH_URL`: Complete URL where the app is running
- `NEXTAUTH_SECRET`: Secure secret for JWT token signing (generate a strong random string)

## 💻 Development

```bash
# Start development server with Turbopack
npm run dev

# Server will be available at http://localhost:3003
```

### Development Scripts

```bash
npm run dev          # Development with Turbopack (port 3003)
npm run build        # Production build with Turbopack
npm run start        # Production server (port 3003)
npm run lint         # Code linting with ESLint
```

## 🏗️ Production Build

```bash
# Build for production
npm run build

# Start production server
npm run start
```

The production build is optimized with:

- Code splitting and lazy loading
- Image optimization
- CSS minification
- JavaScript minification
- Service worker for caching (if configured)

## 🐳 Docker

### Build and Run with Docker

```bash
# Build the Docker image
docker build -t sae-frontend .

# Run the container
docker run -p 3003:3003 \
  -e NEXT_PUBLIC_API_BASE_URL=http://your-backend-url \
  -e API_URL=http://your-backend-url/api \
  -e NEXTAUTH_URL=http://your-frontend-url \
  -e NEXTAUTH_SECRET=your-secret \
  sae-frontend
```

### Docker Compose (with backend)

```yaml
version: "3.8"
services:
  sae-frontend:
    build: .
    ports:
      - "3003:3003"
    environment:
      - NEXT_PUBLIC_API_BASE_URL=http://sae-backend:3305
      - API_URL=http://sae-backend:3305/api
      - NEXTAUTH_URL=http://localhost:3003
      - NEXTAUTH_SECRET=your-secret
    depends_on:
      - sae-backend

  sae-backend:
    # Backend configuration...
```

## 🔗 Backend Integration

This frontend integrates with the SAE Backend (NestJS application) through RESTful APIs. The backend provides:

- **Authentication**: JWT token generation and validation
- **Database**: PostgreSQL with Prisma ORM
- **Business Logic**: Complete CRUD operations for all entities
- **File Upload**: Document and image management
- **Reports**: Excel/PDF generation
- **Audit Trail**: Complete logging and history

### API Endpoints Structure

```
POST   /auth/login           # User authentication
POST   /auth/refresh         # Token refresh
GET    /users                # User management
GET    /companies            # Company CRUD
GET    /employees            # Employee management
GET    /equipment            # Equipment CRUD
GET    /tires                # Tire lifecycle management
POST   /reports/generate     # Report generation
```

## 🔐 Authentication

### NextAuth.js Configuration

The application uses NextAuth.js with credentials provider for secure authentication:

- **JWT Strategy**: Stateless authentication with access/refresh tokens
- **Automatic Refresh**: Tokens are automatically refreshed before expiration
- **Session Management**: Secure session handling with persistence
- **Role-based Access**: USER and ADMIN roles with hierarchical permissions

### Authentication Flow

1. User submits credentials on login page
2. NextAuth calls backend `/auth/login` endpoint
3. JWT tokens are stored in secure httpOnly cookies
4. Middleware validates tokens on protected routes
5. Automatic token refresh when needed

## 📡 API Integration

### ApiClient Architecture

The application uses a centralized `ApiClient` class with advanced features:

```typescript
// Example API call
const tires = await ApiClient.get<Tire[]>("/tires", {
  params: { page: 1, limit: 10 },
});
```

### Key Features

- **Automatic Token Handling**: JWT tokens automatically added to requests
- **Token Refresh**: Seamless refresh of expired tokens
- **Error Handling**: Global error handling with user-friendly messages
- **Retry Logic**: Automatic retry for failed requests
- **Timeout Management**: Configurable request timeouts
- **File Upload Support**: FormData handling for file uploads

### Custom Hooks Pattern

Business logic is separated into custom hooks:

```typescript
// Example custom hook
export function useTires(params?: TireQueryParams) {
  return useQuery({
    queryKey: ["tires", params],
    queryFn: () => tireService.getTires(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

## 📁 Project Structure

```
sae-frontend/
├── app/                               # Next.js App Router
│   ├── api/
│   │   └── auth/[...nextauth]/        # NextAuth API routes
│   ├── companies/                     # Company management
│   │   ├── [id]/                      # Company detail/edit
│   │   ├── business-categories/       # Business categories
│   │   └── list/                      # Company list
│   ├── dashboard/                     # Main dashboard
│   ├── employees/                     # Employee management
│   │   ├── [id]/                      # Employee detail
│   │   ├── categories/                # Employee categories
│   │   └── vacations/                 # Vacation management
│   ├── equipments/                    # Equipment management
│   ├── login/                         # Authentication page
│   ├── settings/                      # System settings
│   └── tires/                         # Tire management
│       ├── assignments/               # Tire assignments
│       ├── inspections/               # Tire inspections
│       └── stock/                     # Tire inventory
├── components/                        # React components
│   ├── ui/                            # shadcn/ui primitives
│   ├── layouts/                       # Layout components
│   ├── forms/                         # Reusable forms
│   └── data-table.tsx                 # Generic data table
├── lib/                               # Business logic & utilities
│   ├── api/                           # API services
│   │   ├── apiClient.ts               # HTTP client
│   │   ├── auth.ts                    # Auth configuration
│   │   └── tires/                     # Tire services
│   ├── hooks/                         # Custom React hooks
│   ├── types/                         # TypeScript definitions
│   ├── validations/                   # Zod schemas
│   └── utils/                         # Utility functions
├── middleware.ts                      # Next.js middleware
├── next.config.ts                     # Next.js configuration
├── tailwind.config.js                 # Tailwind CSS config
├── components.json                    # shadcn/ui config
├── Dockerfile                         # Docker configuration
└── package.json                       # Dependencies & scripts
```

## 🤝 Contributing

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Make** your changes following the established patterns
4. **Test** your changes thoroughly
5. **Commit** with conventional commits: `git commit -m "feat: add new feature"`
6. **Push** to your branch: `git push origin feature/your-feature`
7. **Create** a Pull Request

### Code Standards

- **TypeScript**: Strict mode enabled, no `any` types
- **ESLint**: Follow all linting rules (configured for enterprise standards)
- **Prettier**: Automatic code formatting with team configuration
- **Components**: PascalCase, `.tsx` extension
- **Hooks**: camelCase, `use` prefix
- **Utilities**: camelCase, `.ts` extension
- **Types**: All components and functions must be fully typed
- **Naming**: Use descriptive names, avoid abbreviations

### Commit Convention

This project follows [Conventional Commits](https://conventionalcommits.org/):

```
type(scope): description

Types:
- feat: New features
- fix: Bug fixes
- docs: Documentation
- style: Code style changes
- refactor: Code refactoring
- test: Testing
- chore: Maintenance
- perf: Performance improvements
- deps: Dependency updates

Scopes:
- api: API services and clients
- components: UI components
- hooks: Custom React hooks
- types: TypeScript definitions
- utils: Utility functions
- docs: Documentation
```

### Pull Request Guidelines

- Include a clear description of changes
- Reference related issues with `Fixes #issue-number`
- Ensure all tests pass
- Update documentation if needed
- Follow the established code patterns
- Keep PRs focused on a single feature/fix

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Developed by**: Renzo O. Gorosito
**Version**: 1.1.0
**Last Updated**: December 2025
