# Architectural Overview - UserApp Pro

## 🏗️ Clean Architecture (Onion Pattern)
El proyecto implementa una arquitectura de cebolla para garantizar una estricta separación de responsabilidades, facilitando la mantenibilidad y escalabilidad.

### 1. Layers & Responsibilities

| Capa | Carpeta | Responsabilidad |
| :--- | :--- | :--- |
| **Infraestructura** | `shared/api/`, `lib/` | Adaptadores de red (Fetch), utilidades puras y constantes globales. |
| **Dominio** | `entities/[name]/domain/` | Mappers de datos y definiciones de entidades de negocio (Capa Anti-Corrupción). |
| **Aplicación** | `entities/[name]/store/`, `hooks/` | Orquestación de lógica asíncrona (Thunks), estado global y hooks de dominio. |
| **Presentación** | `features/`, `widgets/`, `shared/ui/` | Componentes React, lógica de UI y sistemas de diseño (Tailwind v4). |

---

## 🧩 Modularity Strategy

### 🟢 Entities (`src/entities/`)
Representan el "qué" del sistema. Son objetos de negocio compartidos.
- **Ejemplo:** `user`, `post`.
- Contienen: API específica, Mappers de dominio y su propio Slice de Redux.

### 🔵 Features (`src/features/`)
Representan el "cómo" el usuario interactúa con el sistema. Son funcionalidades completas.
- **Ejemplo:** `user-search`.
- Contienen: Hooks de UI, componentes específicos y lógica de orquestación de búsqueda.

### 🟡 Widgets (`src/widgets/`)
Piezas de UI complejas que combinan múltiples entidades o features para formar secciones de la página.
- **Ejemplo:** `UserView` (Muestra el perfil + posts).

---

## 🛠️ Technology Stack
- **Framework:** React 18 + Vite
- **State:** Redux Toolkit (Slices, Thunks, Memoized Selectors)
- **Styling:** Tailwind CSS v4 (Pure utilities)
- **Data Fetching:** AbortController nativo + Fetch API
- **Testing:** Vitest + React Testing Library

---

## 🔄 Data Flow (Lifecycle)

1.  **Trigger:** El usuario pulsa "Buscar" en `SearchBar`.
2.  **Hook:** `useUserSearch` recibe el input y lo resuelve mediante `search-engine.js`.
3.  **Thunk:** Se dispara `fetchUserAndPosts(id)`.
4.  **API:** Se ejecutan llamadas concurrentes a JSONPlaceholder.
5.  **Mapper:** Los datos crudos se sanitizan en `user.mappers.js`.
6.  **Store:** El estado global se actualiza (`loading` -> `succeeded`).
7.  **UI:** `StateBoundary` detecta el cambio y renderiza `UserView`.
