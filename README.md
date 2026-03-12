# UserApp Pro - Enterprise API Consumer

Una aplicación React de alto rendimiento diseñada bajo principios de **Clean Architecture**, enfocada en la resiliencia de datos, optimización de UX y patrones de diseño avanzados.

---

## 🗺️ Guía Visual del Proyecto

### 1. La "Cebolla" Arquitectónica (Capas Refinadas)

```text
                 CAPA 4: PRESENTACIÓN (UI)
          ┌──────────────────────────────────────┐
          │      CAPA 3: APLICACIÓN (Redux)       │
          │   ┌──────────────────────────────┐   │
          │   │  CAPA 2: DOMINIO (Mappers)   │   │
          │   │   ┌──────────────────────┐   │   │
          │   │   │CAPA 1: INFRAESTRUCTURA│  │   │
          │   │   │ (API REST Adapters)  │   │   │
          │   │   └──────────────────────┘   │   │
          │   └──────────────────────────────┘   │
          └──────────────────────────────────────┘
```

### 2. Árbol de Componentes (Jerarquía Visual)

```text
                       ┌──────────────────────┐
                       │    MainLayout.jsx    │
                       │    (Contenedor UI)   │
                       └──────────────────────┘
                                  │
                       ┌──────────────────────┐
                       │    UserSearchPage    │
                       │    (Orquestador)     │
                       └──────────────────────┘
                       ╱                      ╲
          ┌──────────────────────┐      ┌──────────────────────┐
          │    SearchBar.jsx     │      │     UserView.jsx     │
          │    Input + Botón     │      │     (State Gate)     │
          └──────────────────────┘      └──────────────────────┘
                                         ╱              ╲
                          ┌──────────────────┐    ┌──────────────────┐
                          │   UserProfile    │    │     PostList     │
                          │    (Bio Data)    │    │   (Feed Data)    │
                          └──────────────────┘    └──────────────────┘
```

---

## 🏗 Arquitectura y Patrones de Diseño

El proyecto no es un simple buscador; es una implementación de **Screaming Architecture** (Feature-Based) que aísla la lógica de negocio de la infraestructura.

### 1. Layered Architecture (Separación de Capas)
*   **Infrastructure Layer (`api/`, `lib/api-client.js`):** Abstracción pura de red utilizando `fetch` con soporte nativo para `AbortController` (cancelación de peticiones) para prevenir *race conditions*.
*   **Domain Layer (`domain/user.mappers.js`):** Implementación de **Mappers** que actúan como una *Anti-Corruption Layer (ACL)*, sanitizando y transformando los datos crudos de la API externa en entidades seguras para la UI.
*   **Application/Service Layer (`services/`):** Orquestación de lógica compleja, como el **Modo Degradado**, que permite cargar el perfil del usuario incluso si la consulta de sus publicaciones falla.
*   **State Management (`store/`):** Uso de **Redux Toolkit** con selectores memoizados (`createSelector`) para optimizar el rendimiento computacional.

### 2. Patrones de UI Avanzados
*   **State Boundary Pattern:** Gestión declarativa de estados laterales (Loading, Error, NotFound, Success) mediante un componente de orden superior que centraliza el flujo visual.
*   **Headless Hooks:** Lógica de validación (`useSearchInput`) y de dominio (`useUserSearch`) totalmente desacoplada de los componentes visuales.
*   **Container/Presentational:** Clara distinción entre componentes lógicos y componentes puros de renderizado.

---

## 🚀 Optimizaciones de Ingeniería

### Resiliencia y Rendimiento
*   **Gestión de Concurrencia:** Implementación de `AbortSignal` en toda la cadena de llamadas para abortar peticiones obsoletas durante el tipado rápido.
*   **Búsqueda Normalizada:** Algoritmo de búsqueda inteligente que ignora acentos (`normalize("NFD")`), mayúsculas y espacios innecesarios, mejorando la tasa de éxito de búsqueda por nombre.
*   **Debouncing de Validación:** Optimización del hilo principal mediante el retraso de validaciones sintácticas mientras el usuario escribe.

### Experiencia de Usuario (UX/DX)
*   **Feedback Instantáneo:** Mensajes de asistencia dinámicos basados en constantes configurables (`src/config/constants.js`).
*   **Accesibilidad (A11y):** Uso de `aria-live="polite"` y `aria-describedby` para asegurar que los cambios de estado sean comunicados correctamente a lectores de pantalla.
*   **Transiciones Fluídas:** Animaciones de entrada (`fade-in`) y esqueletos de carga (`ProfileSkeleton`) para reducir la carga cognitiva durante la espera de datos.

---

## 🛠 Tech Stack

*   **Core:** React 18 (Hooks, Memo, Suspense Patterns)
*   **State:** Redux Toolkit + Reselect
*   **Styling:** Tailwind CSS 4 + Lucide/Heroicons
*   **Infrastructure:** Vite + ESLint (Standard Strict)
*   **Tools:** AbortController API, String Normalization API

---

## 📖 Guía de Desarrollo

### Instalación
```bash
pnpm install
```

### Ejecución
```bash
pnpm dev
```

### Calidad de Código (Linting)
```bash
pnpm lint
```

---

> **Nota de Ingeniería:** Este proyecto cumple con los estándares de **Clean Code**, evitando el uso de "hardcoding" mediante un sistema de configuración centralizado y garantizando que cada función tenga una única responsabilidad (SRP).
