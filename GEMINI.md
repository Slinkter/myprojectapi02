# Project Overview: myprojectapi02 (v2.0)

`myprojectapi02` is a professional-grade React Single Page Application (SPA) built with a focus on **Software Architecture**, **Clean Code**, and **Domain-Driven Design (DDD)**. It leverages the public [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) to provide a robust user search and profile management experience.

## 🛠️ Tech Stack (State-of-the-Art)

- **Framework:** React 18.3.1
- **Build Tool:** Vite 5.4.21
- **State Management:** Redux Toolkit 2.11.2 (with Memoized Selectors)
- **Styling:** TailwindCSS 4.2.1 (Pure CSS, no external UI libs)
- **Icons:** Heroicons 2.2.0
- **i18n:** Custom Hierarchical Translation System
- **Error Handling:** ErrorBoundary + Declarative State Boundaries

## 🏗️ Architecture & Organization

The project follows a **Feature-Based Architecture** combined with **Layered Clean Architecture**.

### Directory Structure
- `src/features/`: Bounded contexts for specific business logic.
  - `user-search/`: Domain: User Lookups and Profiles.
    - `api/`: Infrastructure Adapters (`user.api.js`, `user.mappers.js`).
    - `services/`: Application Services (Domain logic & orchestration).
    - `redux/`: State management for the feature (Slices & Thunks).
    - `hooks/`: Domain-specific orquestrators (`useUserSearch.js`).
    - `components/`: UI implementation.
- `src/components/`: Global UI (`ui/`) and structural wrappers (`layout/`).
- `src/hooks/`: Cross-cutting concerns (i18n, theme).
- `src/lib/`: Low-level infrastructure (`api-client.js`, `translations.js`).

## 🚀 Key Commands

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Development server with HMR. |
| `pnpm run build` | Optimized production build. |
| `pnpm run lint` | ESLint quality check. |
| `pnpm test` | Run Vitest suite (Planned). |

## 💡 Engineering Conventions

- **Clean Code:** Standardized camelCase for logic, PascalCase for components.
- **Early Return Pattern:** Mandated for all functions and components to ensure linear readability.
- **Defensive Programming:** Infrastructure-level mappers ensure domain integrity.
- **Dot-Notation i18n:** Hierarchical translation access (e.g., `t("search.title")`).
- **Imports:** Alias `@/` maps to `src/`.

## 📚 Core Documentation

- `src/docs/02-arquitectura.md`: Architectural deep dive.
- `src/docs/MASTERCLASS_INGENIERIA.md`: Reverse engineering guide.
- `src/docs/CURSO_TESTING.md`: Step-by-step testing manual.
- `TODO-TESTING.md`: Technical testing roadmap.
