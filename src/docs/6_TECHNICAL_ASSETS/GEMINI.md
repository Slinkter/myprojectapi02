# UserApp Pro (myprojectapi02) - Agent Instruction Manual

> **Auto-generated Context File for AI Agents**

## 1. Project Overview
**UserApp Pro** is a modern Single Page Application (SPA) built to manage user and post data. It emphasizes robust architecture, error handling, and a clear separation of concerns using Feature-Sliced Design (FSD). 

### Tech Stack
- **Framework:** React 18 + Vite
- **State Management:** Redux Toolkit (RTK)
- **Styling:** Tailwind CSS v4 + `clsx` + `tailwind-merge`
- **Testing:** Vitest + React Testing Library + Jest DOM
- **Validation:** Zod
- **Documentation:** Comprehensive JSDoc

## 2. Architecture & Directory Structure
The application strictly follows the **Feature-Sliced Design (FSD)** methodology:

```text
src/
├── app/       # Application layer (Redux store configuration, global providers, UI slice)
├── pages/     # Routing and full-page views (e.g., UserSearchPage)
├── widgets/   # Complex, self-contained UI blocks (e.g., MainLayout, UserView)
├── features/  # Business logic and user interactions (e.g., user-search, user-profile)
├── entities/  # Core business entities (e.g., user, post). Contains API, domain mappers, UI components, and RTK slices
└── shared/    # Reusable infrastructure (API client, UI primitives, hooks, utils, schemas)
```

## 3. Core Patterns & Data Flow

### Data Flow
The standard data fetching and mutation flow follows this path:
`UI Component` → `Custom Hook` → `RTK Thunk` → `API Client (fetchFromApi)` → `Domain Mapper` → `Redux Store` → `UI Component Update`

### Key Conventions
- **API Client:** Located in `shared/api/api-client.js`. It wraps the native `fetch` API, handles timeouts via `AbortController`, and standardizes error throwing via the custom `ApiError` class.
- **Mappers:** Used heavily in the `domain` layers of entities (e.g., `user.mappers.js`, `post.mappers.js`) to transform raw API responses into safe, validated client-side models.
- **Error Handling & State Boundaries:** Uses `ErrorBoundary` and `StateBoundary` components for declarative loading, error, and "not found" states.
- **JSDoc Typing:** TypeScript is not used directly; instead, the codebase relies on detailed JSDoc comments (`@type`, `@param`, `@returns`, etc.) for type safety and editor intellisense.
- **Prop Validation:** Zod schemas are converted to PropTypes (`zod-to-prop-types.js`) or used alongside standard `prop-types` for component validation.

## 4. Building and Running

The project uses `npm` or `pnpm` as the package manager. The following scripts are defined in `package.json`:

- **Development Server:** `npm run dev` (Starts Vite server)
- **Production Build:** `npm run build`
- **Linting:** `npm run lint` (ESLint configuration strictly enforces 0 warnings)
- **Testing:** 
  - `npm run test` (Runs Vitest once)
  - `npm run test:watch` (Runs Vitest in watch mode)
  - `npm run test:coverage` (Generates test coverage)
  - `npm run test:ui` (Opens Vitest UI)

## 5. Development Guidelines
- **Strict Linting:** Ensure all code passes linting without warnings before committing.
- **Testing:** New features, hooks, and mappers should be accompanied by corresponding unit tests in the `test/` directory.
- **UI Components:** Place dumb/presentational components in `shared/ui`. Use `clsx` and `tailwind-merge` for dynamic Tailwind class construction.
- **Do not bypass standard error handling:** Always use `ApiError` for HTTP errors and propagate signals for cancellation where applicable.
