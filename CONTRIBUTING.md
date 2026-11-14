# Contributing Guide

This document defines the development conventions and contribution rules for the Noghteh Frontend project.

All contributors are expected to follow these conventions to keep the codebase consistent, maintainable, scalable, and easy to review.
> Files included in the initial project structure are sample implementations intended to demonstrate folder responsibilities, naming conventions, and expected code structure. They may be replaced when the corresponding real features are implemented.

---

# 1. Technology Stack

The frontend project uses:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- Zustand
- Yup
- pnpm

---

# 2. Project Structure

The main source structure is:

```text
src/
├── assets/
├── components/
│   ├── features/
│   ├── shared/
│   └── ui/
├── data/
├── hooks/
├── keys/
├── layouts/
├── lib/
├── pages/
├── providers/
├── queryKeys/
├── routes/
├── schemas/
├── services/
├── store/
├── styles/
├── types/
├── utils/
├── index.css
└── main.tsx
```

Static public assets are stored in:

```text
public/
├── features/
├── images/
└── icons/
```

Every directory should contain files related only to its defined responsibility.

---

# 3. Components

## 3.1 Feature Components

Directory:

```text
src/components/features/
```

Feature components belong to a specific business domain.

Example:

```text
components/features/
├── Project/
│   ├── ProjectCard.tsx
│   ├── ProjectList.tsx
│   └── ProjectForm.tsx
│
└── Task/
    ├── TaskCard.tsx
    └── TaskList.tsx
```

Rules:

- Feature-specific components must remain inside their feature directory.
- Feature components may contain feature-specific presentation logic.
- Feature components must not be placed inside `shared` or `ui`.
- Components must be split when they become responsible for multiple unrelated concerns.

---

## 3.2 Shared Components

Directory:

```text
src/components/shared/
```

Shared components are application-level components reused by multiple pages or features.

Example:

```text
components/shared/
├── Header/
│   └── Header.tsx
├── Footer/
│   └── Footer.tsx
├── Navbar/
│   └── Navbar.tsx
└── Sidebar/
    └── Sidebar.tsx
```

Examples of shared components:

- Header
- Footer
- Navbar
- Sidebar
- Breadcrumb
- Application-level navigation

Rules:

- Shared components must not contain logic specific to only one feature.
- Shared components may depend on generic hooks, stores, and UI components.

---

## 3.3 UI Components

Directory:

```text
src/components/ui/
```

This directory contains generic reusable UI primitives.

Examples:

```text
Button.tsx
Input.tsx
Modal.tsx
Card.tsx
Badge.tsx
Spinner.tsx
Select.tsx
Checkbox.tsx
```

Rules:

- UI components must be reusable.
- UI components must not contain business logic.
- UI components should not directly call backend APIs.
- UI components should receive data through props whenever possible.

---

# 4. Pages

Directory:

```text
src/pages/
```

Pages are route-level components.

Examples:

```text
HomePage.tsx
LoginPage.tsx
DashboardPage.tsx
ProjectDetailsPage.tsx
NotFoundPage.tsx
```

Rules:

- Page names must end with `Page`.
- Pages should primarily compose smaller components.
- Large reusable UI blocks must be extracted into components.
- API communication should not be implemented directly inside pages.
- Reusable stateful logic should be extracted into hooks.

Good:

```text
DashboardPage.tsx
ProjectDetailsPage.tsx
LoginPage.tsx
```

Bad:

```text
dashboard.tsx
page1.tsx
MyPageFinal.tsx
```

---

# 5. Services

Directory:

```text
src/services/
```

Services contain API communication and service-level logic.

Recommended structure:

```text
services/
├── Project/
│   └── projectService.ts
├── Task/
│   └── taskService.ts
└── Auth/
    └── authService.ts
```

Examples of service functions:

```ts
getProjects()
getProjectById()
createProject()
updateProject()
deleteProject()
```

Rules:

- Services must not import pages.
- Services must not import React components.
- Backend API calls must not be scattered throughout components.
- Related API methods should be grouped inside their domain service.
- A service should have one clear domain responsibility.

---

# 6. Store

Directory:

```text
src/store/
```

The store contains global client-side state.

Recommended structure:

```text
store/
├── auth/
│   └── useAuthStore.ts
├── profile/
│   └── useProfileStore.ts
├── project/
│   └── useProjectStore.ts
└── task/
    └── useTaskStore.ts
```

Store file naming format:

```text
useSomethingStore.ts
```

Good:

```text
useAuthStore.ts
useProfileStore.ts
useProjectStore.ts
useTaskStore.ts
```

Bad:

```text
store.ts
profile.store.ts
use.profile.store.ts
myStore.ts
```

Rules:

- Only global application state belongs in the store.
- Local component state should remain inside the component.
- Stores must not import pages.
- Stores must not import UI components.

---

# 7. Hooks

Directory:

```text
src/hooks/
```

Reusable React logic should be implemented using custom hooks.

Naming format:

```text
useSomething.ts
```

Examples:

```text
useAuth.ts
useProjects.ts
useDebounce.ts
useMediaQuery.ts
```

Rules:

- Hook names must start with `use`.
- Hooks should encapsulate reusable React logic.
- Hooks should have one clear responsibility.
- Avoid duplicating the same stateful logic in multiple components.

---

# 8. Types

Directory:

```text
src/types/
```

Shared TypeScript types and interfaces belong here.

Recommended structure:

```text
types/
├── Project/
│   ├── project.ts
│   └── projectServiceTypes.ts
├── Task/
│   └── task.ts
├── User/
│   └── user.ts
└── Auth/
    └── authTypes.ts
```

Type and interface names must use PascalCase.

Good:

```ts
type ProjectStatus = "active" | "archived";

interface ProjectResponse {
  id: number;
  name: string;
}

interface UserProfile {
  id: number;
  fullName: string;
}
```

Bad:

```ts
interface project {}
interface userdata {}
type status = string;
```

---

# 9. Schemas

Directory:

```text
src/schemas/
```

Validation schemas belong here.

Naming format:

```text
camelCase + Schema
```

Examples:

```text
loginSchema.ts
registerSchema.ts
projectSchema.ts
taskSchema.ts
profileSchema.ts
```

Rules:

- Validation logic shared across components must be placed here.
- Avoid duplicating validation rules across forms.

---

# 10. Utils

Directory:

```text
src/utils/
```

Utility files contain small reusable helper functions.

Examples:

```text
formatDate.ts
formatCurrency.ts
normalizeText.ts
formatPrice.ts
```

Rules:

- Utilities should preferably be pure functions.
- Utilities must not import React components.
- Feature-specific business logic should not be placed in `utils`.
- Each utility should solve a clear and reusable problem.

---

# 11. Public Assets

Static files that must be served directly are stored under:

```text
public/
├── features/
├── images/
└── icons/
```

Feature-specific static assets should be grouped by feature:

```text
public/features/
├── project/
├── task/
├── auth/
└── dashboard/
```

Asset filenames must use meaningful kebab-case names.

Good:

```text
project-empty-state.svg
user-avatar-placeholder.png
calendar-icon.svg
login-background.webp
```

Bad:

```text
image1.png
new.svg
test.png
final-final.png
icon2.svg
```

---

# 12. File and Folder Naming Conventions

## React Components

Use PascalCase:

```text
ProjectCard.tsx
DashboardHeader.tsx
UserProfile.tsx
```

## Pages

Use PascalCase and end with `Page`:

```text
LoginPage.tsx
DashboardPage.tsx
ProjectDetailsPage.tsx
```

## Hooks

Use camelCase beginning with `use`:

```text
useAuth.ts
useProjects.ts
useDebounce.ts
```

## Services

Use camelCase ending with `Service`:

```text
authService.ts
projectService.ts
taskService.ts
```

## Stores

Use camelCase beginning with `use` and ending with `Store`:

```text
useAuthStore.ts
useProfileStore.ts
useProjectStore.ts
```

## Schemas

Use camelCase ending with `Schema`:

```text
loginSchema.ts
projectSchema.ts
```

## Utilities

Use camelCase:

```text
formatDate.ts
formatPrice.ts
normalizeText.ts
```

## React Component Folders

Use PascalCase:

```text
Project/
Task/
Header/
Footer/
```

## Non-component Folders

Use lowercase or camelCase according to the existing project structure:

```text
profile/
auth/
project/
queryKeys/
```

## Type and Interface Names

Use PascalCase:

```ts
Project
ProjectResponse
UserProfile
TaskStatus
```

## Variables and Functions

Use camelCase:

```ts
currentUser
projectList
getProjectById
handleSubmit
```

## Constants

Use UPPER_SNAKE_CASE:

```ts
const API_BASE_URL = "...";
const MAX_FILE_SIZE = 5;
const DEFAULT_PAGE_SIZE = 20;
```

## Boolean Variables

Prefer meaningful boolean prefixes:

```ts
isLoading
isAuthenticated
hasPermission
canEdit
shouldRefresh
```

Avoid:

```ts
loadingFlag
check
statusBool
```

---

# 13. TypeScript Files

Use:

```text
.ts
```

when the file does not contain JSX.

Examples:

```text
projectService.ts
useAuthStore.ts
formatDate.ts
project.ts
```

Use:

```text
.tsx
```

when the file contains JSX.

Examples:

```text
ProjectCard.tsx
DashboardPage.tsx
Header.tsx
```

---

# 14. Imports

Use the configured `@` alias for imports from `src`.

Preferred:

```ts
import ProjectCard from "@/components/features/Project/ProjectCard";
import { useProjectStore } from "@/store/project/useProjectStore";
```

Avoid deeply nested relative imports when possible:

```ts
import ProjectCard from "../../../components/features/Project/ProjectCard";
```

---

# 15. Dependency Rules

Dependencies should generally flow in this direction:

```text
pages
  ↓
components
  ↓
hooks / store
  ↓
services
  ↓
types / schemas / utils
```

Lower-level modules must not depend on higher-level modules.

Allowed example:

```text
ProjectPage
    ↓
ProjectList
    ↓
useProjects
    ↓
projectService
```

Not allowed:

```text
projectService
    ↓
ProjectPage
```

Important rules:

- Services must never import pages.
- Services must never import React components.
- Utilities must not depend on UI code.
- Types must not depend on React components.
- Circular dependencies are prohibited.

---

# 16. File Responsibility

Each file should have one clear responsibility.

Avoid:

- God Components
- God Classes
- Large monolithic files
- Multiple unrelated responsibilities inside one file
- Very large pages containing reusable UI sections

When a file becomes difficult to understand or handles multiple independent responsibilities, split it into:

```text
components
hooks
services
utils
types
```

Example:

Instead of:

```text
DashboardPage.tsx
```

containing the entire dashboard implementation, prefer:

```text
DashboardPage.tsx

components/features/Dashboard/
├── DashboardHeader.tsx
├── ProjectSummary.tsx
├── RecentTasks.tsx
└── ActivityList.tsx
```

---

# 17. Styling

Project design tokens are defined centrally.

Do not hard-code brand colors when an existing design token is available.

Preferred:

```tsx
className="bg-action-primary text-text-primary"
```

Avoid:

```tsx
className="bg-[#1D3557] text-[#262321]"
```

Global styles, fonts, and design tokens belong in:

```text
src/styles/
├── fonts.css
├── global.css
└── tokens.css
```

---

# 18. Branch Naming Convention

Direct development on `main` and `dev` is prohibited.

Every task must use a dedicated branch.

Allowed prefixes:

```text
feat/
fix/
refactor/
chore/
docs/
test/
```

Examples:

```text
feat/project-dashboard
feat/login-page
fix/navbar-responsive
refactor/router-structure
chore/project-structure
docs/update-readme
test/auth-service
```

Branch names must:

- Be written in English
- Use lowercase letters
- Use kebab-case
- Clearly describe the task

---

# 19. Commit Convention

This project follows Conventional Commits.

Format:

```text
type: short description
```

Examples:

```text
feat: add project dashboard
fix: resolve navbar overflow
refactor: reorganize project services
docs: update architecture documentation
chore: update dependencies
test: add authentication tests
```

Commit messages must:

- Be written in English
- Be short and meaningful
- Describe one logical change
- Reference an Issue when applicable

Example:

```text
feat: add project creation form (#23)
```

For complex commits, additional information may be included in the commit body.

---

# 20. Pull Request Workflow

Development flow:

```text
feat/*
fix/*
refactor/*
chore/*
docs/*
test/*
        ↓
   Pull Request
        ↓
       dev
        ↓
   Pull Request
        ↓
      main
```

Direct pushes to the following branches are prohibited:

```text
main
dev
```

Every Pull Request must:

- Have a meaningful title
- Clearly describe what changed
- Explain why the change was necessary
- Pass all required CI checks
- Receive at least one teammate approval
- Resolve all review conversations before merging
- Contain only changes related to its task

---

# 21. Pull Request Review

Reviewers should leave meaningful comments when changes are required.

Examples of useful review comments:

```text
This API call should be moved to projectService.ts.
```

```text
This component contains reusable UI logic and should be extracted.
```

```text
Please rename this variable to better describe its purpose.
```

Avoid non-descriptive review comments such as:

```text
fix this
```

or:

```text
bad
```

---

# 22. CI Requirements

Pull Requests to `dev` and `main` must pass the configured CI checks.

Current checks include:

```text
Branch Name Check
CI / build-and-lint
```

The CI pipeline should verify at least:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm build
```

Pull Requests must not be merged when required checks fail.

---

# 23. Before Creating a Pull Request

Before opening a Pull Request, make sure the project passes locally:

```bash
pnpm lint
pnpm build
```

Also verify that:

```text
No unrelated files were changed
No debug code remains
No temporary files were committed
No secrets or .env files were committed
Naming conventions are followed
The project still runs correctly
```

---

# 24. General Principle

When unsure where a file belongs, choose the directory based on its responsibility, not convenience.

A file should have one clear purpose and live in the lowest appropriate layer without creating unnecessary dependencies.