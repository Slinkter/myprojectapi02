# Agents Guide: myprojectapi02

This document provides detailed operational instructions for agentic coding assistants working in this repository.

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

### Core Architecture: Feature-Sliced Design (FSD)
The project implements **Feature-Sliced Design (FSD)** combined with an **Onion Pattern** to ensure strict separation of concerns.

#### Layers Hierarchy
1. **`src/app/`**: Application initialization. Contains global store configuration (`store.js`), global styles, and providers.
2. **`src/pages/`**: Route-level components. Compositional layers that assemble widgets and features into full pages.
3. **`src/widgets/`**: Complex UI blocks. Independent components that combine multiple features and entities (e.g., `UserView`).
4. **`src/features/`**: User-facing business logic. Implements "how" the user interacts with the system (e.g., `user-search`).
5. **`src/entities/`**: Business domain objects. Implements "what" the system manages (e.g., `user`, `post`). Contains:
   - `api/`: Entity-specific API calls.
   - `domain/`: Mappers and domain models (Anti-Corruption Layer).
   - `store/`: Redux slices for entity state.
   - `ui/`: Basic entity-related components.
6. **`src/shared/`**: Reusable technical foundation.
   - `ui/`: Atomic UI components (`ErrorBoundary`, `StateBoundary`, etc.).
   - `lib/`: Pure utilities and helper functions.
   - `api/`: Centralized `api-client.js`.
   - `hooks/`: Global hooks (e.g., `useTheme`).

### Coding Standards

#### 1. React Patterns
- **Memoization**: Use `memo()` for presentational components and `useCallback()` for functions passed to children.
- **Component Design**: Differentiate between **Smart components** (orchestrate logic/state) and **Dumb components** (presentational).
- **Hooks**: Extract complex logic into custom hooks to keep components lean.
- **Naming**: Component files must use PascalCase (e.g., `UserSearchPage.jsx`).
- **Display Names**: Always set `ComponentName.displayName = "ComponentName"` for memoized components.
- **Prop Types**: Use `prop-types` for runtime type checking in `.jsx` files.
- **Logic**: Prioritize **Early Returns** to reduce nesting depth.

#### 2. State Management
- Use **Redux Toolkit** for global state.
- **Memoized Selectors**: Use `createSelector` to transform state data.
- **Slices**: Keep slices focused and colocated within their respective entity/feature folders.
- **Asynchrony**: Always propagate the `AbortController` signal in async thunks to allow request cancellation.

#### 3. Styling (Tailwind CSS 4)
- **Utility First**: Use utility classes exclusively; avoid external CSS files.
- **Dynamic Classes**: Use the `cn()` utility from `@/shared/lib/utils` for conditional styling.
- **Responsive Design**: Implement mobile-first designs using `sm:`, `md:`, `lg:` prefixes.
- **Theming**: Support light and dark modes via the `useTheme` hook.

#### 4. API and Data Fetching
- **Centralization**: All requests must go through the `api-client.js` in `src/shared/api/`.
- **State Boundary Pattern**: Use `<StateBoundary />` to handle `loading`, `error`, and `notFound` states.
- **Data Flow**: `Trigger` $\to$ `Hook` $\to$ `Thunk` $\to$ `API` $\to$ `Mapper` $\to$ `Store` $\to$ `UI`.
- **Sanitization**: Raw API data must be processed by mappers in `entities/[name]/domain/` before reaching the store.

#### 5. Formatting and Documentation
- **Language**: User-facing strings and internal code comments primarily use **Spanish**.
- **JSDoc**: All files and components must have JSDoc describing purpose, parameters, and return values.
- **Imports**: Use absolute paths with the `@/` alias (e.g., `@/shared/ui/Button`).
- **Ordering**: Group imports: 1. React/External, 2. Internal aliases (@/), 3. Relative paths.

### Error Handling
- **Runtime**: Wrap major modules in `ErrorBoundary`.
- **API Errors**: Use `ErrorMessage` and `NotFoundCard` for expected error states.
- **Resiliency**: Implement retry logic in hooks via the `handleRetry` pattern.

## 🚦 Workflow Requirements

### Feature Implementation Sequence
1. **Entity**: Define the entity in `src/entities/[name]/` (API $\to$ Mappers $\to$ Store).
2. **Feature**: Implement interaction logic in `src/features/[name]/` (Hooks $\to$ Components).
3. **Integration**: Assemble the feature into a Widget or Page.
4. **Verification**: Write tests for business logic and hooks using Vitest and `@testing-library/react`.

### Final Checklist
1. **Pre-commit**: You MUST run `npm run lint` before suggesting any code changes.
2. **Consistency**: Mimic existing FSD folder structures exactly.
3. **UI/UX**: Ensure responsiveness and full dark mode support.
4. **Cleanliness**: No unused imports or console logs.
