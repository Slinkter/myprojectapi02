# 📘 Documentación Técnica Maestra - UserApp Pro

> **Proyecto:** myprojectapi02  
> **Versión:** 2.0.0  
> **Última Actualización:** Abril 2026  
> **Idioma:** Español  

---

## 📋 Índice de Contenidos

### 1. Introducción y Visión General
- [1.1 - Resumen del Proyecto](#11-resumen-del-proyecto)
- [1.2 - Stack Tecnológico](#12-stack-tecnológico)
- [1.3 - Arquitectura FSD](#13-arquitectura-fsd)

### 2. Diseño del Sistema
- [2.1 - Sistema de Diseño](#21-sistema-de-diseño)
- [2.2 - Paleta de Colores](#22-paleta-de-colores)
- [2.3 - Componentes UI](#23-componentes-ui)

### 3. Arquitectura y Patrones
- [3.1 - Capas de Arquitectura](#31-capas-de-arquitectura)
- [3.2 - Patrones de Diseño](#32-patrones-de-diseño)
- [3.3 - Gestión de Estado](#33-gestión-de-estado)

### 4. Flujo de Datos
- [4.1 - Ciclo de Vida de Datos](#41-ciclo-de-vida-de-datos)
- [4.2 - API y Servicios](#42-api-y-servicios)
- [4.3 - Mappers (Capa Anti-Corrupción)](#43-mappers-capa-anti-corrupción)

### 5. Guías de Desarrollo
- [5.1 - Getting Started](#51-getting-started)
- [5.2 - Estándares de Código](#52-estándares-de-código)
- [5.3 - Workflow FSD](#53-workflow-fsd)

### 6. Testing y Calidad
- [6.1 - Estrategia de Testing](#61-estrategia-de-testing)
- [6.2 - Configuración de Tests](#62-configuración-de-tests)
- [6.3 - Calidad de Código](#63-calidad-de-código)

### 7. Diagramas
- [7.1 - Diagrama de Arquitectura](#71-diagrama-de-arquitectura)
- [7.2 - Diagrama de Secuencia](#72-diagrama-de-secuencia)
- [7.3 - Diagrama de Componentes](#73-diagrama-de-componentes)

### 8. Apéndices
- [8.1 - Glosario](#81-glosario)
- [8.2 - Requisitos Funcionales](#82-requisitos-funcionales)
- [8.3 - Roadmap](#83-roadmap)

---

## 1. Introducción y Visión General

### 1.1 Resumen del Proyecto

**UserApp Pro** es una aplicación React de alto rendimiento construida bajo los estándares de **Feature-Sliced Design (FSD)** y los principios de **Clean Architecture** (Arquitectura de Cebolla). El proyecto consume la API pública **JSONPlaceholder** para mostrar perfiles de usuario y sus publicaciones.

**Características Principales:**
- ✅ Búsqueda de usuarios por ID (1-10) o nombre de usuario
- ✅ Visualización de perfiles con información detallada
- ✅ Listado de publicaciones en acordeones
- ✅ Tema claro/oscuro con persistencia
- ✅ Skeletons de carga y manejo de errores

### 1.2 Stack Tecnológico

| Tecnología | Propósito | Versión |
|------------|-----------|---------|
| **React** | Biblioteca UI principal | 18.x |
| **Vite** | Build tool y dev server | 5.x |
| **Redux Toolkit** | Gestión de estado global | 2.x |
| **Tailwind CSS v4** | Sistema de diseño | 4.x |
| **Vitest** | Framework de testing | 4.x |
| **Zod** | Validación de esquemas | 3.x |
| **Heroicons** | Iconos SVG | 24.x |

### 1.3 Arquitectura FSD

El proyecto implementa **Feature-Sliced Design** con la siguiente jerarquía de capas:

```
src/
├── app/              # Configuración global (Store, Providers)
├── pages/            # Vistas compuestas (Route-level)
├── widgets/          # Bloques complejos de UI
├── features/         # Lógica de negocio interactiva
├── entities/         # Entidades de dominio (User, Post)
└── shared/           # Infraestructura compartida
```

#### Diagrama de Arquitectura FSD

```
┌─────────────────────────────────────────────────────────────┐
│                        PAGES                                │
│   ┌─────────────────────────────────────────────────────┐   │
│   │              UserSearchPage                         │   │
│   └─────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│                        WIDGETS                              │
│   ┌──────────────┐  ┌──────────────────────────────────┐   │
│   │ MainLayout   │  │         UserView                 │   │
│   └──────────────┘  └──────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│                       FEATURES                               │
│   ┌──────────────────┐  ┌─────────────────────────────┐    │
│   │  user-search     │  │      user-profile           │    │
│   │  ├─ SearchBar   │  │      └─ useUserProfile      │    │
│   │  ├─ useSearch   │  └─────────────────────────────┘    │
│   │  └─ search-engine│                                     │
│   └──────────────────┘                                     │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│                       ENTITIES                              │
│   ┌────────────────┐  ┌────────────────────────────────┐   │
│   │     user       │  │           post                  │   │
│   │ ├─ api/       │  │  ├─ api/                        │   │
│   │ ├─ domain/    │  │  ├─ domain/                     │   │
│   │ ├─ store/     │  │  ├─ store/                      │   │
│   │ └─ ui/        │  │  └─ ui/                         │   │
│   └────────────────┘  └────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│                        SHARED                               │
│   ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐   │
│   │    ui/      │  │    api/     │  │      hooks/      │   │
│   │  Card       │  │ api-client  │  │    useTheme      │   │
│   │  Button     │  │             │  │                  │   │
│   │  Input      │  │             │  │                  │   │
│   └─────────────┘  └─────────────┘  └──────────────────┘   │
│   ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐   │
│   │    lib/     │  │   config/   │  │      hooks/      │   │
│   │   utils.js  │  │ constants   │  │                  │   │
│   └─────────────┘  └─────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Diseño del Sistema

### 2.1 Sistema de Diseño

El proyecto utiliza **Tailwind CSS v4** con un sistema de diseño personalizado basado en variables CSS y utilidades nativas.

**Patrón Glassmorphism:**
Se ha creado una utilidad CSS personalizada `@utility glass` para aplicar un efecto de cristal esmerilado en las tarjetas:

```css
.glass {
    background: rgba(255, 255, 255, 0.85);
    border: rgba(255, 255, 255, 0.4);
    box-shadow: rgba(31, 38, 135, 0.2);
    backdrop-filter: blur(12px);
}
```

### 2.2 Paleta de Colores

| Color | Light Mode | Dark Mode | Uso |
|-------|------------|-----------|-----|
| **Fondo** | `#f1f5f9` (Slate 100) | `#020617` (Slate 950) | Fondo principal |
| **Texto Principal** | `#1e293b` (Slate 800) | `#f8fafc` (Slate 50) | Títulos, texto |
| **Acento** | `#2563eb` (Blue 600) | `#3b82f6` (Blue 500) | Botones, links |
| **Éxito** | `#22c55e` (Green 500) | `#4ade80` (Green 400) | Estados éxito |
| **Error** | `#ef4444` (Red 500) | `#f87171` (Red 400) | Estados error |

### 2.3 Componentes UI

El proyecto cuenta con un conjunto de componentes atómicos en `src/shared/ui/`:

| Componente | Descripción |
|------------|-------------|
| `Card` | Contenedor glassmorphism |
| `Button` | Botón con estados loading/disabled |
| `Input` | Input con validación y mensajes |
| `Typography` | Label, PrimaryText, SecondaryText |
| `StateBoundary` | Gestor de estados asíncronos |
| `ErrorBoundary` | Manejo de errores runtime |
| `ErrorMessage` | Mensaje de error con retry |
| `NotFoundCard` | Estado 404 personalizado |
| `ThemeToggleButton` | Toggle claro/oscuro |
| `EmptyState` | Estado vacío |
| `Skeleton` | Skeleton loader |

---

## 3. Arquitectura y Patrones

### 3.1 Capas de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│  PRESENTACIÓN (UI)                                          │
│  Componentes React, Hooks de UI                             │
│  src/features/*/components/, src/shared/ui/               │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│  APLICACIÓN (Orquestación)                                  │
│  Hooks de dominio, Thunks de Redux                          │
│  src/features/*/hooks/, src/entities/*/store/               │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│  DOMINIO (Lógica de Negocio)                                │
│  Mappers, Servicios, Entidades                             │
│  src/entities/*/domain/, src/entities/*/services/         │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│  INFRAESTRUCTURA (Adaptadores)                             │
│  Clientes API, Utilidades                                   │
│  src/shared/api/, src/shared/lib/                          │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Patrones de Diseño

| Patrón | Ubicación | Descripción |
|--------|-----------|-------------|
| **Anti-Corruption Layer** | `entities/*/domain/` | Mappers que aíslan el dominio de la API externa |
| **State Boundary** | `shared/ui/StateBoundary.jsx` | Gestión declarativa de estados async |
| **AbortController** | `shared/api/` | Cancelación de peticiones |
| **Container/Presenter** | `pages/` + `features/` | Separación lógica/UI |
| **Higher-Order Component** | `shared/ui/` | Composición con `memo()` |

### 3.3 Gestión de Estado

El proyecto utiliza un enfoque híbrido:

1. **Redux Toolkit** - Estado global y datos de dominio
2. **Context API** - Estado transversal de UI (tema)
3. **useState** - Estado local efímero

#### Estructura del Store

```javascript
{
    user: {
        fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed' | 'notFound',
        currentUser: { ... },
        currentUserPosts: [ ... ],
        cachedUserList: [ ... ],
        error: string | null
    },
    ui: {
        theme: 'light' | 'dark'
    }
}
```

---

## 4. Flujo de Datos

### 4.1 Ciclo de Vida de Datos

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   UI         │────▶│   HOOK       │────▶│   THUNK      │
│ (SearchBar)  │     │(useUserSearch)│    │(fetchUser)  │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                     ┌──────────────┐             │
                     │   STORE     │◀────────────┤
                     │ (Redux)     │             ▼
                     └──────────────┘     ┌──────────────┐
                           │               │   API        │
                           │               │(JSONPlaceholder)│
                           ▼               └──────────────┘
                     ┌──────────────┐             ▲
                     │   UI         │─────────────┘
                     │ (UserView)   │     MAPPER
                     └──────────────┘
```

### 4.2 API y Servicios

**Cliente API Centralizado:**

```javascript
// src/shared/api/api-client.js
export const fetchFromApi = async (endpoint, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
};
```

**Adaptadores de Entidad:**

```javascript
// src/entities/user/api/user.api.js
export const getUser = async (id, signal) => {
    const data = await fetchFromApi(`/users/${id}`, { signal });
    return data;
};
```

### 4.3 Mappers (Capa Anti-Corrupción)

Los mappers transforman los datos crudos de la API en objetos de dominio limpios:

```javascript
// src/entities/user/domain/user.mappers.js
export const mapRawUserToDomain = (raw) => {
    if (!raw?.id) return null;
    return {
        id: Number(raw.id),
        username: String(raw.username),
        name: String(raw.name),
        email: String(raw.email),
        company: raw.company?.name ?? 'N/A',
        website: raw.website ?? 'N/A',
    };
};
```

**Beneficio:** Si la API cambia `username` a `userName`, solo se actualiza el mapper, no todos los componentes.

---

## 5. Guías de Desarrollo

### 5.1 Getting Started

```bash
# Instalación
pnpm install

# Desarrollo
pnpm dev          # Servidor en http://localhost:5173
pnpm build        # Build de producción
pnpm preview      # Preview del build
pnpm lint         # Verificar código
pnpm test         # Ejecutar tests
```

### 5.2 Estándares de Código

| Regla | Ejemplo |
|-------|---------|
| **Componentes** | `PascalCase` → `UserProfile.jsx` |
| **Hooks** | `camelCase` → `useUserSearch.js` |
| **Constantes** | `UPPER_SNAKE_CASE` → `API_BASE_URL` |
| **Archivos** | `kebab-case` → `user-profile.jsx` |

**Patrones Obligatorios:**
- ✅ **Early Returns**: `if (!id) return null;`
- ✅ **Memoización**: `memo()`, `useCallback()`, `useMemo()`
- ✅ **Zod Validation**: Esquemas en entrada de API
- ✅ **AbortController**: Cancelación en thunks async

### 5.3 Workflow FSD

Para agregar una nueva funcionalidad:

```
1. ENTIDAD     → Crear src/entities/[name]/
                 ├─ api/         → Llamadas API
                 ├─ domain/      → Mappers
                 ├─ store/      → Redux slice
                 └─ ui/         → Componentes básicos

2. FEATURE     → Crear src/features/[name]/
                 ├─ components/ → UI específica
                 ├─ hooks/      → Lógica de interacción
                 └─ services/   → Servicios de dominio

3. WIDGET      → Ensamblar features en src/widgets/

4. PAGE        → Crear vista en src/pages/

5. TEST        → Escribir tests en src/test/
```

---

## 6. Testing y Calidad

### 6.1 Estrategia de Testing

**Pirámide de Testing:**

```
        ╱╲
       ╱  ╲        E2E (Playwright)
      ╱────╲
     ╱      ╲      Integration (RTL)
    ╱────────╲
   ╱          ╲    Unit (Vitest)
  ╱────────────╲
```

### 6.2 Configuración de Tests

```bash
# Ejecutar todos los tests
pnpm test

# Modo watch
pnpm test:watch

# Coverage
pnpm test:coverage

# UI Mode
pnpm test:ui
```

### 6.3 Calidad de Código

```bash
# Linting
pnpm lint    # ESLint con reglas estrictas

# Build
pnpm build   # Verificación completa
```

---

## 7. Diagramas

### 7.1 Diagrama de Arquitectura (Flujo de Datos)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER SEARCH PAGE                           │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────────┐   │
│  │  SearchBar  │  │ StateBoundary│  │       UserView           │   │
│  │  (Input)    │  │  (Loading)  │  │  ┌──────┐  ┌─────────┐   │   │
│  └──────┬──────┘  └──────┬──────┘  │  │User  │  │ PostList│   │   │
│         │                │         │  │Profile│  │         │   │   │
│         ▼                ▼         │  └──────┘  └─────────┘   │   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    useUserSearch                         │   │
│  └────────────────────────────┬─────────────────────────────┘   │
│                               │                                   │
│                               ▼                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Redux Store (userSlice)                      │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐   │   │
│  │  │  fetchStatus│  │ currentUser  │  │ posts[]        │   │   │
│  │  │  (state)    │  │  (data)      │  │  (data)        │   │   │
│  │  └─────────────┘  └──────────────┘  └────────────────┘   │   │
│  └────────────────────────────┬─────────────────────────────┘   │
│                               │                                   │
│                               ▼                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Thunk: fetchUserAndPosts                     │   │
│  │  ┌──────────────────┐  ┌────────────────────┐            │   │
│  │  │  search-engine   │  │   user-service     │            │   │
│  │  │  (resolve ID)    │  │  (Promise.all)     │            │   │
│  │  └──────────────────┘  └────────────────────┘            │   │
│  └────────────────────────────┬─────────────────────────────┘   │
│                               │                                   │
│                               ▼                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    API LAYER                              │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │   │
│  │  │ user.api.js  │  │ post.api.js  │  │api-client.js│    │   │
│  │  └──────┬───────┘  └──────┬───────┘  └──────────────┘    │   │
│  └─────────┼─────────────────┼─────────────────────────────────┘   │
│            │                 │                                    │
│            ▼                 ▼                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              EXTERNAL API (JSONPlaceholder)               │   │
│  │    GET /users/:id      GET /users/:id/posts              │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### 7.2 Diagrama de Estados (StateBoundary)

```
┌─────────────────────────────────────────────────────────────────┐
│                    STATE BOUNDARY                               │
│                                                                 │
│   ┌──────────┐    ┌───────────┐    ┌────────────┐             │
│   │   idle   │───▶│ loading   │───▶│ succeeded  │             │
│   └──────────┘    └───────────┘    └────────────┘             │
│        │               │                │                     │
│        │               │                │                     │
│        ▼               ▼                ▼                     │
│   ┌─────────┐    ┌───────────┐    ┌─────────────┐             │
│   │  idle   │    │  Skeleton │    │   Content   │             │
│   │ (null)  │    │  (Loader) │    │  (Children) │             │
│   └─────────┘    └───────────┘    └─────────────┘             │
│                                                                 │
│          │               │                                     │
│          ▼               ▼                                     │
│   ┌─────────────┐  ┌───────────┐                              │
│   │  NotFound   │  │  Failed   │                              │
│   │  (404)      │  │  (Error)  │                              │
│   └─────────────┘  └───────────┘                              │
└─────────────────────────────────────────────────────────────────┘
```

### 7.3 Diagrama de Componentes (Entity Relationship)

```
┌─────────────────────────────────────────────────────────────────┐
│                      ENTITY RELATIONSHIP                        │
│                                                                 │
│     ┌─────────┐         ┌─────────┐                           │
│     │  USER   │         │  POST   │                           │
│     ├─────────┤         ├─────────┤                           │
│     │ id      │◀───────▶│ id      │                           │
│     │ username│  1:N    │ userId  │                           │
│     │ name    │         │ title   │                           │
│     │ email   │         │ body    │                           │
│     │ company │         └─────────┘                           │
│     │ website │                                                 │
│     └─────────┘                                                 │
│                                                                 │
│     Relations:                                                  │
│     - USER has many POSTS (1:N)                                │
│     - POST belongs to USER (N:1)                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. Apéndices

### 8.1 Glosario

| Término | Definición |
|---------|------------|
| **FSD** | Feature-Sliced Design - Metodología de estructuración de proyectos |
| **ACL** | Anti-Corruption Layer - Capa que aísla el dominio de APIs externas |
| **Thunk** | Función asíncrona de Redux para lógica de efectos secundarios |
| **Slice** | Porción del estado global con sus reducers |
| **Memoización** | Técnica de optimización que almacena resultados de cálculos |
| **Debouncing** | Técnica para retardar la ejecución de una función |
| **Glassmorphism** | Estilo de diseño con efecto de cristal esmerilado |

### 8.2 Requisitos Funcionales

| ID | Requisito | Descripción |
|----|-----------|-------------|
| FR-01 | Búsqueda por ID | Buscar usuarios por ID numérico (1-10) |
| FR-02 | Búsqueda por Nombre | Buscar usuarios por nombre de usuario |
| FR-03 | Visualización de Perfil | Mostrar datos demográficos del usuario |
| FR-04 | Listado de Posts | Mostrar publicaciones del usuario |
| FR-05 | Manejo de Errores | Mostrar mensajes de error con retry |
| FR-06 | Tema Oscuro | Toggle entre modo claro y oscuro |

### 8.3 Roadmap

| Versión | Fecha | Cambios Planeados |
|---------|-------|-------------------|
| 2.1.0 | Q2 2026 | Migración a TypeScript |
| 2.2.0 | Q3 2026 | Migración a Next.js (App Router) |
| 3.0.0 | Q4 2026 | Nuevas funcionalidades (favoritos, historial) |

---

## 📚 Referencias

- [React Documentation](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Feature-Sliced Design](https://feature-sliced.design/)

---

**Documento generado:** Abril 2026  
**Autor:** UserApp Pro Architecture Team
