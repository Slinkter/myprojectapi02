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

### 2. Diagrama de Secuencia: Flujo de Búsqueda con AbortController

Este diagrama describe el ciclo de vida de una petición, destacando la seguridad ante *race conditions*.

```text
 USUARIO          UI (HOOKS)          REDUX (THUNK)         API CLIENT
    │                 │                    │                    │
    │── Search(id) ──>│                    │                    │
    │                 │── fetchUser(id) ──>│                    │
    │                 │     (signal)       │                    │
    │                 │                    │── GET /users/1 ───>│
    │                 │                    │    (Pending)       │
    │── New Search ──>│                    │                    │
    │                 │── ABORT previous ─>│                    │
    │                 │                    │── (Request Cancel) │
    │                 │                    │                    │
    │                 │── fetchUser(new) ─>│                    │
    │                 │                    │── GET /users/2 ───>│
    │                 │                    │                    │
    │ <── Success ────│ <─── Fulfilled ────│ <───── JSON ───────│
```

### 3. Máquina de Estados (StateBoundary Logic)

Documentación del comportamiento del orquestador de UI.

```text
       ┌──────────┐          ┌────────────┐
  ────>│   IDLE   │─────────>│  LOADING   │
       └──────────┘          └────────────┘
             ^                 ╱        ╲
             │                ╱          ╲
             │        ┌───────────┐  ┌───────────┐
             └────────│  SUCCESS  │  │   ERROR   │
              (Reset) └───────────┘  └───────────┘
                                         │
                                         V
                                   ┌───────────┐
                                   │  RETRY?   │
                                   └───────────┘
```

---

## 🏗 Arquitectura y Patrones de Diseño

El proyecto no es un simple buscador; es una implementación de **Screaming Architecture** (Feature-Based) que aísla la lógica de negocio de la infraestructura.

### 1. Layered Architecture (Separación de Capas)
*   **Infrastructure Layer (`api/`, `lib/api-client.js`):** Abstracción pura de red utilizando `fetch` con soporte nativo para `AbortController`.
*   **Domain Layer (`domain/user.mappers.js`):** Implementación de **Mappers** (Anti-Corruption Layer) que sanitizan y transforman los datos crudos.
*   **Application/Service Layer (`services/`):** Orquestación de lógica compleja (Modo Degradado).
*   **State Management (`store/`):** Uso de **Redux Toolkit** con selectores memoizados (`createSelector`).

### 2. Patrones de UI Avanzados
*   **State Boundary Pattern:** Gestión declarativa de estados laterales.
*   **Headless Hooks:** Lógica de validación y dominio desacoplada.
*   **Container/Presentational:** Clara distinción entre componentes lógicos y puros.

---

## 🚀 Optimizaciones de Ingeniería

### Resiliencia y Rendimiento
*   **Gestión de Concurrencia:** Implementación de `AbortSignal` para abortar peticiones obsoletas.
*   **Búsqueda Normalizada:** Algoritmo que ignora acentos, mayúsculas y espacios.
*   **Debouncing de Validación:** Optimización del hilo principal durante el tipado.

### Experiencia de Usuario (UX/DX)
*   **Feedback Instantáneo:** Mensajes de asistencia dinámicos (`src/config/constants.js`).
*   **Accesibilidad (A11y):** Uso de `aria-live` y `aria-describedby`.
*   **Transiciones Fluídas:** Animaciones de entrada (`fade-in`) y esqueletos de carga.

---

## 🛠 Tech Stack

*   **Core:** React 18 (Hooks, Memo, Suspense)
*   **State:** Redux Toolkit + Reselect
*   **Styling:** Tailwind CSS 4
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

> **Nota de Ingeniería:** Este proyecto cumple con los estándares de **Clean Code**, evitando el uso de "hardcoding" y garantizando que cada función tenga una única responsabilidad (SRP).
