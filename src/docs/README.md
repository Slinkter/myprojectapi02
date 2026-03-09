# 🌐 Portfolio Architecture — Index

Bienvenido a la documentación técnica del proyecto `myprojectapi02`. Este sistema utiliza un stack moderno de React 18, Tailwind CSS v4 y Redux Toolkit, siguiendo principios de Clean Architecture y Domain-Driven Design (DDD).

## 📂 Estructura de Documentación

### 🏛️ Núcleo del Sistema
- [Architecture & Diagrams](./architecture.md) — Visión isométrica del flujo de datos.
- [Project Store (Redux)](./store/index.md) — Organización del estado global.

### 🧩 Componentes (UI)
- [Index de Componentes](./components/index.md)
- [ThemeToggleButton](./components/ThemeToggleButton.md) — Switch de modo oscuro.

### 📄 Páginas y Secciones
- [UserSearchPage](./pages/UserSearchPage.md) — Orquestador de búsqueda.

## 📐 Estándares de Ingeniería

1.  **React**: Todos los componentes usan `memo()`, `displayName` y `PropTypes`.
2.  **Tailwind v4**: Configuración vía `@theme` en CSS. Sin `tailwind.config.js`.
3.  **Redux**: Slices con selectores memorizados (`createSelector`).
4.  **Utils**: Uso obligatorio de `cn()` para gestión de clases.
