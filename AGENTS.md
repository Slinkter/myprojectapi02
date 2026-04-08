# Agents Guide: myprojectapi02

This document provides guidelines and operational instructions for agentic coding assistants working in this repository.

## 🛠 Tooling and Commands

### Build and Development
- **Development Server**: `npm run dev` (Vite)
- **Build**: `npm run build` (Vite build to `/dist`)
- **Preview**: `npm run preview`
- **Deployment**: `npm run deploy` (via gh-pages)

### Quality Assurance
- **Linting**: `npm run lint`
  - Runs ESLint for `.js` and `.jsx` files.
  - Ensures no unused disable directives and zero warnings.

### Testing
- **Run all tests**: `npm run test` (Vitest)
- **Watch mode**: `npm run test:watch`
- **UI mode**: `npm run test:ui`
- **Coverage**: `npm run test:coverage`
- **Run a single test file**: `npx vitest run <path-to-file>`
- **Run specific test pattern**: `npx vitest run -t "<test-name>"`

## 🏗 Architecture and Code Style

### Core Architecture
The project follows a **Feature-Based Architecture** to maximize modularity and discoverability:
- `src/features/<feature-name>/`: Contains all logic related to a specific feature.
  - `api/`: API client definitions and endpoint logic.
  - `components/`: Feature-specific UI components.
  - `hooks/`: Feature-specific business logic and state orchestration.
  - `services/`: Data transformation and business services.
  - `domain/`: Mappers and domain models.
  - `store/`: Redux slices for feature state.
- `src/components/ui/`: Generic, reusable atomic UI components.
- `src/lib/`: Shared utilities and global API clients.
- `src/store/`: Global Redux store configuration.

### Coding Standards

#### 1. React Patterns
- **Memoization**: Use `memo()` for presentational components and `useCallback()` for functions passed to children to prevent unnecessary re-renders.
- **Hooks**: Extract complex logic into custom hooks (e.g., `useUserSearch`, `useSearchInput`) to keep components lean.
- **Naming**: Component files must use PascalCase (e.g., `UserSearchPage.jsx`).
- **Display Names**: Always set `ComponentName.displayName = "ComponentName"` for memoized components to aid debugging.
- **Prop Types**: Use the `prop-types` library for runtime type checking in `.jsx` files.

#### 2. State Management
- Use **Redux Toolkit** for global state.
- Keep slices focused and colocated within their respective feature folders.
- Avoid excessive global state; prefer local state or feature-level state where appropriate.

#### 3. Styling
- **Tailwind CSS 4**: Use utility classes exclusively.
- **Dynamic Classes**: Use the `cn()` utility from `@/lib/utils` (combining `clsx` and `tailwind-merge`) for conditional styling.
- **Themes**: Support both light and dark modes via the custom `useTheme` hook. Ensure contrast ratios meet accessibility standards.

#### 4. API and Data Fetching
- Use the centralized `api-client.js` for all HTTP requests.
- **State Boundary Pattern**: Implement `<StateBoundary />` to handle `loading`, `error`, and `notFound` states consistently across the UI.
- **Data Flow**: API $\to$ Mapper/Domain $\to$ Store/Hook $\to$ Component.

#### 5. Formatting and Documentation
- **Language**: Code and documentation primarily use Spanish for user-facing strings and internal comments.
- **JSDoc**: Use JSDoc for all files and components to describe their purpose, parameters, and return values.
- **Imports**: Always use absolute paths with the `@/` alias (e.g., `@/components/ui/...`).
- **Ordering**: Group imports by: 1. React/External libs, 2. Internal aliases (@/), 3. Relative paths.

### Error Handling
- **Runtime Crashes**: Use `ErrorBoundary` components to wrap major feature modules.
- **API Errors**: Use `ErrorMessage` and `NotFoundCard` for expected API error states.
- **Resiliency**: Implement retry logic in hooks via the `handleRetry` pattern.

## 🚦 Workflow Requirements
1. **Pre-commit**: You MUST run `npm run lint` before suggesting any code changes.
2. **Consistency**: Mimic existing feature folder structures exactly when adding new capabilities.
3. **UI/UX**: Ensure all new components are responsive and fully support both light and dark modes.
4. **Verification**: If a feature is critical, implement a matching test using Vitest and `@testing-library/react`.
