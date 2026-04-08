# UserApp Pro - Consumidor de API Empresarial

Una aplicación React de alto rendimiento diseñada bajo los estándares de **Feature-Sliced Design (FSD)**, enfocada en la resiliencia de datos, optimización de UX y excelencia en ingeniería de software.

---

## 🗺️ Arquitectura FSD (Feature-Sliced Design)

El proyecto ha sido migrado a una arquitectura de capas estrictas para garantizar la escalabilidad y el desacoplamiento total:

### 🏗️ Estructura de Capas
- **`app/`**: Configuración global, Providers y Store root.
- **`pages/`**: Vistas compuestas que orquestan widgets y features.
- **`widgets/`**: Componentes complejos que combinan múltiples entidades (ej. `UserView`).
- **`features/`**: Lógica de negocio interactiva y acciones del usuario (ej. `user-search`).
- **`entities/`**: Modelos de negocio, Mappers, Slices de estado y UI básica (ej. `user`, `post`).
- **`shared/`**: UI Kit atómico, hooks globales, clientes de API y utilidades.

---

## 🚀 Optimizaciones de Ingeniería

### 🧠 Lógica de Negocio & State
- **Domain-Driven**: Separación estricta entre la API externa y el dominio interno mediante **Mappers** (Capa Anti-Corrupción).
- **Smart Search**: Motor de búsqueda desacoplado (`search-engine.js`) con normalización de texto (NFD) para búsquedas insensibles a acentos y mayúsculas.
- **Resiliencia**: Implementación de `AbortController` para evitar *race conditions* y manejo de errores parciales (si fallan los posts, el perfil sigue cargando).

### 🎨 Design System & UX
- **Tailwind CSS v4**: Implementación de un sistema de diseño moderno con sombras refinadas y radios `rounded-3xl`.
- **Accesibilidad (a11y)**: Uso de roles ARIA y semántica HTML para soporte de lectores de pantalla.
- **State Boundary**: Gestión centralizada de estados `loading`, `error` y `notFound` para una experiencia de usuario coherente.

### 🧪 Quality Assurance
- **Pirámide de Testing**: Suite completa implementada con **Vitest** y **React Testing Library**.
    - **Unit**: Lógica de búsqueda y mappers.
    - **Hooks**: Orquestación de estado y Redux.
    - **Integration**: Flujos completos de la página de búsqueda.

---

## 📦 Stack Tecnológico

| Tecnología | Razón de la elección |
| :--- | :--- |
| **React 18** | UI declarativa y concurrente. |
| **Redux Toolkit** | Flujo de datos predecible y centralizado. |
| **Tailwind CSS v4** | Estilizado ultra-rápido basado en utilidades de última generación. |
| **Vite** | Herramienta de construcción instantánea. |
| **Vitest** | Framework de testing moderno y nativo de Vite. |

---

## 📖 Guía de Desarrollo

### Instalación y Ejecución
```bash
pnpm install
pnpm dev     # Desarrollo
pnpm build   # Producción
pnpm test    # Suite de pruebas
pnpm lint    # Calidad de código
```

### Flujo de Trabajo (FSD)
Para añadir una nueva funcionalidad:
1.  Define la **Entidad** (`src/entities/`) $\rightarrow$ API, Mapper y Store.
2.  Crea la **Feature** (`src/features/`) $\rightarrow$ Hooks de acción y UI interactiva.
3.  Monta la **Page** (`src/pages/`) $\rightarrow$ Orquestación de la vista.
4.  Escribe los **Tests** $\rightarrow$ Valida la lógica en `src/test/`.

---

> **Referencia Técnica:** Para convenciones detalladas de codificación y guías de extensión, consulta el archivo [AGENTS.md](./AGENTS.md).
