# 🤝 Contributing to SAE Frontend

Thank you for considering contributing to SAE Frontend! This guide will help you understand how to contribute effectively to the project.

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)
- [Code Standards](#-code-standards)
- [Commit Convention](#-commit-convention)
- [Pull Request Guidelines](#-pull-request-guidelines)
- [Testing](#-testing)
- [Documentation](#-documentation)
- [Reporting Bugs](#-reporting-bugs)
- [Feature Requests](#-feature-requests)

## 🤝 Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful in all interactions and follow professional communication standards.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: 22.x)
- npm 8+ or yarn
- Git

### Setup

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/sae-frontend.git
   cd sae-frontend
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. **Configure environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

### Development Environment

```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Run type checking
npm run type-check
```

## 🔄 Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Follow the established code patterns
- Write tests for new functionality
- Update documentation if needed
- Ensure all existing tests pass

### 3. Test Your Changes

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests (when implemented)
npm test
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new feature description"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
# Create PR via GitHub UI
```

## 📝 Code Standards

### TypeScript

- **Strict mode enabled**: No `any` types allowed
- **Complete typing**: All functions, components, and variables must be typed
- **Interface naming**: Use PascalCase for interfaces and types
- **Type exports**: Export all public types

```typescript
// ✅ Good
interface User {
  id: number;
  name: string;
  email: string;
}

// ❌ Avoid
interface user {
  /* ... */
}
const data: any = {}; // Not allowed
```

### React Components

- **File naming**: PascalCase with `.tsx` extension
- **Component naming**: PascalCase
- **Props typing**: Always type props with interfaces
- **Hooks usage**: Use custom hooks for business logic

```typescript
// ✅ Good
interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
}

export function UserCard({ user, onEdit }: UserCardProps) {
  // Component logic
}

// ❌ Avoid
function userCard(props) {
  /* ... */
}
```

### Custom Hooks

- **Naming**: Use `use` prefix
- **File naming**: camelCase with `.ts` extension
- **Business logic separation**: Keep UI logic separate from business logic

```typescript
// ✅ Good
export function useUsers(params?: UserQueryParams) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => userService.getUsers(params),
  });
}

// ❌ Avoid
export function getUsers() {
  /* ... */
}
```

### Utilities and Helpers

- **File naming**: camelCase with `.ts` extension
- **Pure functions**: Prefer pure functions when possible
- **Error handling**: Always handle errors appropriately
- **Type safety**: Ensure all utility functions are properly typed

### Imports Organization

```typescript
// 1. React imports
import { useState, useEffect } from "react";

// 2. External libraries
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

// 3. Internal @ imports
import { Button } from "@/components/ui/button";
import { useUsers } from "@/lib/hooks/useUsers";

// 4. Relative imports
import { UserCard } from "./user-card";

// 5. Types
import type { User } from "@/lib/types/user";

// 6. Styles
import "./styles.css";
```

### Naming Conventions

```typescript
// Components: PascalCase
UserCard.tsx
DashboardLayout.tsx

// Functions/Variables: camelCase
getUserData()
useUserHook()

// Constants: UPPER_CASE
const API_TIMEOUT = 10000;

// Files: kebab-case
user-form.tsx
api-client.ts

// Types/Interfaces: PascalCase
type User = {...}
interface UserService {...}
```

## 📋 Commit Convention

This project follows [Conventional Commits](https://conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

# Example
feat(api): add user authentication endpoint
```

### Types

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `deps`: Dependency updates

### Scopes

- `api`: API services and clients
- `components`: UI components
- `hooks`: Custom React hooks
- `types`: TypeScript definitions
- `utils`: Utility functions
- `docs`: Documentation
- `styles`: CSS/styling changes
- `config`: Configuration changes

### Examples

```bash
# Good commit messages
feat(components): add user profile card component
fix(api): resolve authentication token refresh issue
docs: update API integration guide
refactor(hooks): simplify user data fetching logic
test(components): add unit tests for dashboard

# Bad commit messages
update file
fix bug
add stuff
```

## 📥 Pull Request Guidelines

### Before Creating PR

- [ ] All tests pass
- [ ] Code follows the established patterns
- [ ] No linting errors
- [ ] TypeScript compilation successful
- [ ] Documentation updated if needed
- [ ] PR description is clear and descriptive

### PR Description Template

```markdown
## Summary

Brief description of changes made

## Test plan

- [ ] Test case 1
- [ ] Test case 2
- [ ] Test case 3

## Documentation

- [ ] Documentation updated
- [ ] Breaking changes documented

## Screenshots (if applicable)

[Add screenshots for UI changes]
```

### PR Requirements

1. **Clear description**: Explain what the PR does and why
2. **Reference issues**: Use `Fixes #issue-number` when applicable
3. **Small PRs**: Keep PRs focused on a single feature or fix
4. **No merge conflicts**: Ensure your branch is up to date with main
5. **Working code**: All functionality should work as expected

## 🧪 Testing

### When to Write Tests

- New features
- Complex business logic
- Utility functions
- API integrations
- Component interactions

### Test Structure

```typescript
// Example test file
describe("UserCard", () => {
  it("should render user information correctly", () => {
    // Test implementation
  });

  it("should call onEdit when edit button is clicked", () => {
    // Test implementation
  });
});
```

### Test Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📚 Documentation

### When to Update Documentation

- New features or components
- API changes
- Breaking changes
- Configuration updates
- New development workflows

### Documentation Standards

- Use clear, concise language
- Include code examples where helpful
- Update existing docs when making changes
- Follow the established documentation structure

### Documentation Files

- `README.md`: Main project documentation
- `docs/`: Detailed guides and references
- Component comments: JSDoc for public APIs
- Code comments: Explain complex logic

## 🐛 Reporting Bugs

### Before Reporting a Bug

1. Check if the issue already exists
2. Verify you're using the latest version
3. Try to reproduce the issue
4. Check the troubleshooting guide

### Bug Report Template

```markdown
## Bug Description

A clear and concise description of what the bug is.

## To Reproduce

Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior

A clear and concise description of what you expected to happen.

## Screenshots

If applicable, add screenshots to help explain your problem.

## Environment

- OS: [e.g. macOS, Windows, Linux]
- Browser [e.g. chrome, safari]
- Version [e.g. 22]

## Additional Context

Add any other context about the problem here.
```

## ✨ Feature Requests

### Before Requesting a Feature

1. Check if the feature already exists
2. Search for similar requests
3. Consider if it fits the project scope

### Feature Request Template

```markdown
## Is your feature request related to a problem?

A clear and concise description of what the problem is.

## Describe the solution you'd like

A clear and concise description of what you want to happen.

## Describe alternatives you've considered

A clear and concise description of any alternative solutions or features you've considered.

## Additional context

Add any other context or screenshots about the feature request here.
```

## 🙏 Thank You

Your contributions are greatly appreciated! If you have any questions, feel free to reach out or create an issue.

---

**Happy Coding! 🚀**

For more information, check out our [README](./README.md) and [Documentation](./docs/).
