# 🏗️ Arquitectura del Sistema: Clean Architecture (v2.1)

Este proyecto implementa una **Arquitectura de Capas (Onion Architecture)** adaptada al ecosistema React/Redux para garantizar el desacoplamiento total de la infraestructura y el dominio.

---

## 📐 Vista General del Sistema

```mermaid
graph TD
    UI[BROWSER UI<br/>React + Vite] --> STORE[REDUX STORE<br/>Slices + RTK]
    STORE --> MAPPERS[DATA MAPPERS<br/>Domain Logic]
    MAPPERS --> API[EXTERNAL API<br/>JSONPlaceholder]
```

---

## 🧩 Clean Architecture (4 Capas)

```mermaid
graph TD
    subgraph L4[CAPA 4: PRESENTACIÓN UI]
        C1[React Components + JSX<br/>SearchBar, UserView, UserProfile]
    end
    subgraph L3[CAPA 3: APLICACIÓN STATE]
        C2[Redux Thunks, Hooks, Slices<br/>userSlice.js, useUserSearch]
    end
    subgraph L2[CAPA 2: DOMINIO LÓGICA]
        C3[Mappers, Entidades<br/>user.mappers.js]
    end
    subgraph L1[CAPA 1: INFRAESTRUCTURA]
        C4[REST Adapters, Fetch Logic<br/>user.api.js, api-client.js]
    end

    C1 -->|depende de| C2
    C2 -->|depende de| C3
    C3 -->|depende de| C4
```

---

## 🌳 Árbol de Componentes

```mermaid
graph TD
    A[App.jsx] --> ML[MainLayout.jsx]
    ML --> USP[UserSearchPage<br/>Orquestador]
    
    USP --> SB[SearchBar.jsx<br/>Input + Botón]
    USP --> UV[UserView.jsx<br/>Datos Usuario]
    
    UV --> UP[UserProfile<br/>Bio Data]
    UV --> PL[PostList<br/>Feed Data]
```

---

## 🔄 Flujo de Datos End-to-End (Redux Cycle)

```mermaid
sequenceDiagram
    actor U as Usuario
    participant H as useUserSearch (Hook)
    participant S as userSlice.js (Store)
    participant M as user.mappers.js (Mapper)
    participant R as React (UI)

    U->>H: Escribe input
    H->>S: dispatch(fetchUserAndPosts)
    S-->>M: API Call
    M-->>S: mapRawUser()
    S-->>H: useSelector(selectores)
    H-->>R: re-render
```

---

## 🚀 Pipeline de Deploy (GitHub Pages)

```mermaid
graph LR
    subgraph Local Dev
        DEV[pnpm dev<br/>:5173]
    end
    subgraph Build
        BLD[pnpm build<br/>vite bundle]
    end
    subgraph Deploy
        DPL[pnpm deploy<br/>gh-pages branch]
    end
    
    DEV --> BLD
    BLD --> DPL
    DPL --> WEB[slinkter.github.io/myprojectapi02]
```

---

## 🧩 Patrones de Diseño Implementados

### 1. State Boundary (UI Pattern)
Utilizamos el patrón de composición para centralizar la gestión de estados asíncronos (`loading`, `error`, `notFound`).

```mermaid
graph TD
    USP[UserSearchPage] --> SB[StateBoundary<br/>Lógica de renderizado condicional]
    SB -->|loading| LV[LoadingView]
    SB -->|failed| EM[ErrorMessage]
    SB -->|succeeded| UV[UserView]
```

### 2. Data Mappers (Architectural Pattern)
Para cumplir con el desacoplamiento de infraestructuras externas (JSONPlaceholder), implementamos Mappers que transforman la data cruda en entidades de dominio limpias.

```mermaid
graph LR
    A[API Response<br/>raw JSON] --> B[Mapper<br/>Transform]
    B --> C[Domain Entity<br/>Clean Object]
    C --> D[Store<br/>Immutable]
```

### 3. Smart vs Dumb Components
- **Smart:** `UserSearchPage.jsx`. Conoce el estado, los hooks y orquesta la vista.
- **Dumb:** `SearchBar.jsx`, `UserProfile.jsx`, `PostList.jsx`. Solo reciben props y renderizan UI pura.

## 🌐 Internacionalización (i18n)

Implementado mediante un sistema de diccionarios reactivos en `src/lib/translations.js` y gestionado globalmente por `uiSlice`.

```mermaid
graph LR
    A[Action: Toggle] --> B[uiSlice]
    B --> C[useTranslation Hook]
    C --> D[UI Update]
```

## 🎨 Estilos con Tailwind v4

Hemos migrado a **Tailwind CSS v4 puro**, eliminando todas las librerías de componentes externas.
- **Configuración:** Integrada directamente en `vite.config.js` vía `@tailwindcss/vite`.
- **Temas:** Variables definidas en la capa `@theme` dentro de `src/index.css`.
- **Modo Oscuro:** Basado en la clase `.dark` en el elemento raíz HTML.

---
*Documento generado bajo estándares de Senior Frontend Architecture.*
