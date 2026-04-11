# UserApp Pro (myprojectapi02)

# Project Overview
**UserApp Pro** is a high-performance SPA for managing user and post data, architected with Feature-Sliced Design (FSD) for maintainability and scalability.

## Stack
- **Core:** React 18 + Vite
- **State:** Redux Toolkit
- **Styles:** Tailwind CSS v4
- **Testing:** Vitest
- **Validation:** Zod
- **Typing:** JSDoc

## Architecture (FSD)
- `app/`       - Global store, providers
- `pages/`     - Routes/Page-level views
- `widgets/`   - Complex UI blocks
- `features/`  - Business interactions
- `entities/`  - Domain objects (API + Mapper + Store)
- `shared/`    - Reusable UI, API clients, hooks

## Data Flow
`UI` → `Hook` → `Thunk` → `API` → `Mapper` → `Store` → `UI`

## Commands
```bash
pnpm dev    # Start dev server
pnpm build  # Production build
pnpm lint   # Linting (zero-warning policy)
pnpm test   # Run tests
```
