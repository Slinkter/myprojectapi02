# 🚀 myprojectapi02

[![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.21-646cff?logo=vite)](https://vite.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.11.2-764abc?logo=redux)](https://redux-toolkit.js.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.2.1-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

> **High-Engineering React SPA** for user profiling, built with Clean Architecture, DDD principles, and Tailwind v4.

---

## 📖 Overview

**myprojectapi02** is a modern React application demonstrating professional software engineering standards. It provides a robust interface to search and view user data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/) using an industrial-grade architectural stack.

### Key Pillars

- 🏗️ **Architectural Excellence:** Clean Architecture + Feature-Based organization.
- 🧹 **Clean Code:** Rigorous naming conventions and Early Return patterns.
- 🛡️ **Resilience:** ErrorBoundary and Defensive Data Mapping.
- 🌍 **Advanced i18n:** Hierarchical dot-notation translation system.

---

## ✨ Features

- ✅ **Smart Search:** Numeric ID or text-based (username/name) lookup.
- ✅ **Infrastructure Isolation:** API client and Mappers for domain protection.
- ✅ **Declarative State:** Centralized loading/error handling via `StateBoundary`.
- ✅ **Dark Mode:** Native Tailwind v4 implementation with persistence.
- ✅ **Performance:** Memoized selectors and strategic `useCallback` usage.

---

## 🏗️ Architecture

The project follows a **Feature-Based Architecture** with a strict separation of concerns.

### Layers

- **Presentation:** Pure UI components and Skeletons.
- **Logic:** Custom hooks as domain orchestrators.
- **State:** Redux Toolkit with hierarchical slices.
- **Service:** Domain business logic (Sanitization & Orchestration).
- **Infrastructure:** Atomic API adapters and defensive Mappers.

---

## 📦 Getting Started

```bash
# Install dependencies
pnpm install

# Start development
pnpm run dev

# Build for production
pnpm run build
```

---

## 📚 Documentation & Learning

This project serves as a learning platform with extensive documentation:

- **[MASTERCLASS_INGENIERIA.md](./src/docs/MASTERCLASS_INGENIERIA.md)** - Reverse engineering of the project.
- **[CURSO_TESTING.md](./src/docs/CURSO_TESTING.md)** - Step-by-step testing guide.
- **[02-arquitectura.md](./src/docs/02-arquitectura.md)** - Architectural deep dive.

---

## 📄 License

MIT. Developed by **slinkter**.
