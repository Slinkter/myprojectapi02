# Next.js + TypeScript Migration Plan: UserApp Pro

This document outlines the strategy for migrating the UserApp Pro project from a Vite-based React application to a Next.js (App Router) application with full TypeScript support.

## 1. TypeScript Audit & Readiness
The current codebase is **highly ready** for TypeScript migration due to the following factors:
- **Schema-Driven Data**: The use of `zod` in `src/shared/lib/schemas` allows for automatic type inference (`z.infer<typeof Schema>`), eliminating the need to manually define redundant interfaces.
- **Implicit Typing**: Extensive use of JSDoc `@typedef` and `@param` provides a clear blueprint for TS types.
- **Runtime Validation**: Existing `prop-types` in UI components define the expected component API.

**TS Strategy:**
- Convert `.js` $\to$ `.ts` and `.jsx` $\to$ `.tsx`.
- Replace JSDoc `@typedef` with TS `type` or `interface`.
- Leverage Zod for domain model types.

## 2. Server/Client Architecture Split
Following the FSD (Feature-Sliced Design) and Onion patterns, the migration will split logic as follows:

### 🌐 Server Side (Server Components / Server Actions)
- **Infrastructure**: `src/shared/api/api-client.js` $\to$ Standardized `fetch` wrapper in Next.js.
- **API Layer**: `src/entities/*/api/*.js` $\to$ Server Actions or direct data fetching in Server Components.
- **Domain Layer**: `src/entities/*/domain/*.js` $\to$ Mappers will run on the server to sanitize data before it reaches the client.
- **Business Logic**: `src/features/user-search/services/search-engine.js` $\to$ Server-side search orchestration.

### 💻 Client Side (Client Components)
- **State Management**: `src/app/store.js` and `src/entities/*/store/*.js` (Redux Toolkit). Redux will be wrapped in a Client Component Provider.
- **Interactive UI**: Components in `src/shared/ui`, `src/entities/*/ui`, and `src/features/*/components` that use hooks (`useState`, `useEffect`).
- **Custom Hooks**: All logic in `src/features/*/hooks/*.js` and `src/shared/hooks/*.js`.

## 3. App Router Mapping
| Current FSD Page | Next.js App Router Path | Type |
| :--- | :--- | :--- |
| `src/pages/user-search/UserSearchPage.jsx` | `app/user-search/page.tsx` | Client (due to search state) |
| (Global Entry) `src/app/` | `app/layout.tsx` | Server |
| (Home/Root) | `app/page.tsx` | Server |

## 4. Dependency Analysis
### To Remove
- `@tailwindcss/vite` (Replaced by Next.js built-in TW support)
- `@vitejs/plugin-react`
- `gh-pages` (Replaced by Vercel/Netlify deployment)

### To Add
- `next`, `typescript`, `@types/node`, `@types/react`, `@types/react-dom`

## 5. Migration Execution Path
1. **Foundation**: Initialize Next.js, configure Tailwind CSS 4, and set up `tsconfig.json`.
2. **Type Layer**: Convert Zod schemas to TS types and replace JSDoc with TS interfaces.
3. **Shared & Entity Layer**: Migrate API clients and Mappers to server-side utilities.
4. **Page Migration**: Port FSD pages to the `app/` directory, designating `"use client"` where Redux or hooks are required.
5. **State Integration**: Implement the Redux Provider in `app/layout.tsx` using a client-side wrapper.
6. **Verification**: Run `npm run lint` and Vitest suites to ensure logic parity.
