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
- This project currently lacks a dedicated test suite in `package.json`. When adding tests:
  - Use Vitest (consistent with Vite ecosystem).
  - Follow the pattern of existing logic isolation in hooks and services.

## 🏗 Architecture and Code Style

### Core Architecture
The project follows a **Feature-Based Architecture**:
- `src/features/<feature-name>/`: Contains all logic related to a specific feature.
  - `api/`: API client definitions.
  - `components/`: Feature-specific UI components.
  - `hooks/`: Feature-specific business logic and state orchestration.
  - `services/`: Data transformation and business services.
  - `domain/`: Mappers and domain models.
  - `store/`: Redux slices for feature state.
- `src/components/ui/`: Generic, reusable UI components.
- `src/lib/`: Shared utilities and API clients.
- `src/store/`: Global Redux store configuration.

### Coding Standards

#### 1. React Patterns
- **Memoization**: Use `memo()` for presentational components and `useCallback()` for functions passed to children to prevent unnecessary re-renders.
- **Hooks**: Extract complex logic into custom hooks (e.g., `useUserSearch`, `useSearchInput`).
- **Naming**: Component files use PascalCase (e.g., `UserSearchPage.jsx`).
- **Display Names**: Always set `ComponentName.displayName = "ComponentName"` for memoized components.

#### 2. State Management
- Use **Redux Toolkit** for global state.
- Keep slices focused; use the feature-folder structure for slice definitions.

#### 3. Styling
- **Tailwind CSS 4**: Use utility classes.
- **Dynamic Classes**: Use the `cn()` utility from `@/lib/utils` (combining `clsx` and `tailwind-merge`).
- **Themes**: The project supports light and dark modes via a custom `useTheme` hook.

#### 4. API and Data Fetching
- Use the centralized `api-client.js` for HTTP requests.
- Implement a "State Boundary" pattern (e.g., `<StateBoundary />`) to handle `loading`, `error`, and `notFound` states consistently across the UI.

#### 5. Formatting and Documentation
- **Language**: Code and documentation primarily use Spanish for user-facing strings and internal comments.
- **JSDoc**: Use JSDoc for files and components to describe their purpose and props.
- **Imports**: Use absolute paths with the `@/` alias (e.g., `@/components/ui/...`).

### Error Handling
- Use `ErrorBoundary` components to catch runtime crashes.
- Use `ErrorMessage` and `NotFoundCard` for expected API error states.
- Implement retry logic in hooks via the `handleRetry` pattern.

## 🚦 Workflow Requirements
1. **Pre-commit**: Run `npm run lint` before suggesting any changes.
2. **Consistency**: Mimic existing feature folder structures when adding new capabilities.
3. **UI/UX**: Ensure all new components are responsive and support both light and dark modes.
