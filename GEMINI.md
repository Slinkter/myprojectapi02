# Project Overview: myprojectapi02

`myprojectapi02` is a modern React Single Page Application (SPA) designed for searching and viewing user profiles. It leverages the public [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) to fetch user data and their associated posts. The project demonstrates advanced React patterns, a scalable feature-based architecture, and a polished Glassmorphism UI.

## 🛠️ Tech Stack

- **Framework:** React 18.3.1
- **Build Tool:** Vite 5.4.21
- **State Management:** Redux Toolkit 2.11.2 & React-Redux 9.2.0
- **Styling:** TailwindCSS 3.4.19 & Material Tailwind 2.1.10
- **Icons:** Heroicons 2.2.0
- **Linting:** ESLint 8.57.1
- **Deployment:** GitHub Pages via `gh-pages`

## 🏗️ Architecture & Organization

The project follows a **Feature-Based Architecture** combined with a layered approach (UI -> Logic -> Service -> Data).

### Directory Structure
- `src/features/`: Contains domain-specific functionality.
  - `user-search/`: The primary feature for user lookup.
    - `api/`: API client functions (e.g., `user.api.js`).
    - `services/`: Business logic and API orchestration.
    - `redux/`: Redux slices and async thunks.
    - `hooks/`: Feature-specific custom hooks (e.g., `useUser.js`).
    - `components/`: UI components for the feature.
- `src/components/`: Global UI components (`ui/`) and layout wrappers (`layout/`).
- `src/hooks/`: Global custom hooks (e.g., `useTheme.js`).
- `src/redux/`: Global store configuration.
- `src/lib/`: Library configurations (e.g., `api.config.js`).
- `src/docs/`: Extensive technical documentation and tutorials.

## 🚀 Key Commands

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Starts the development server with HMR. |
| `pnpm run build` | Builds the application for production. |
| `pnpm run lint` | Runs ESLint to check for code quality. |
| `pnpm run preview` | Previews the production build locally. |
| `pnpm run deploy` | Deploys the application to GitHub Pages. |

## 💡 Development Conventions

- **Import Aliases:** Use `@/` to refer to the `src/` directory (configured in `vite.config.js` and `jsconfig.json`).
- **Naming:**
  - **Components:** PascalCase (e.g., `UserProfile.jsx`).
  - **Hooks:** camelCase with `use` prefix (e.g., `useUser.js`).
  - **Services/APIs/Folders:** kebab-case (e.g., `user-service.js`, `user-search/`).
- **State Management:** Use Redux Toolkit's `createSlice` and `createAsyncThunk` for managing asynchronous state.
- **Styling:** Utility-first CSS with Tailwind, complemented by Material Tailwind components for complex UI elements.
- **Documentation:** Follow the existing JSDoc pattern for documenting components and functions. Refer to `src/docs/` for architectural deep dives.
- **Commits:** Follow [Conventional Commits](https://www.conventionalcommits.org/).

## 📚 Core Documentation

For more detailed information, consult the following files:
- `src/docs/02-arquitectura.md`: Architectural details.
- `src/docs/06-guia-para-desarrolladores.md`: Developer guide.
- `TODO-TESTING.md`: Roadmap for implementing tests.
