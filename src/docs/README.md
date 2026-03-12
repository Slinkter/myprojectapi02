# 🌐 Portfolio Architecture — Index

Bienvenido a la documentación técnica del proyecto `myprojectapi02`. Este sistema utiliza un stack moderno de React 18, Tailwind CSS v4 y Redux Toolkit, siguiendo principios de Clean Architecture y Domain-Driven Design (DDD).

## 📂 Estructura de Documentación

### 🏛️ Núcleo del Sistema y Arquitectura
- [00 - Diagnóstico Técnico](./00-diagnostico-tecnico.md) — Análisis forense y decisiones.
- [01 - Overview del Sistema](./01-overview-del-sistema.md) — Visión general y alcance.
- [03 - Casos de Uso](./03-casos-de-uso.md) — Comportamiento esperado.
- [04 - Requerimientos](./04-requerimientos.md) — RFs y RNFs.
- [05 - Flujo de Datos](./05-flujo-de-datos.md) — Ciclo de vida asíncrono y Redux.
- [06 - Guía para Desarrolladores](./06-guia-para-desarrolladores.md) — Estándares y onboarding.
- [07 - Calidad y Riesgos](./07-calidad-y-riesgos.md) — Deuda técnica y métricas.
- [08 - Cierre del Proyecto](./08-cierre-del-proyecto.md) — Resumen ejecutivo.
- [Arquitectura (Definitiva)](./architecture.md) — Capas, mappers y diagramas.
- [Masterclass de Ingeniería](./MASTERCLASS_INGENIERIA.md) — Desglose pedagógico de patrones.

### 📚 Guías y Recursos
- [Tutorial Completo](./tutorial_completo.md) — Construcción de la app desde cero.
- [Glosario](./GLOSSARY.md) — Terminología unificada del proyecto.

### 🧪 Testing
- [Curso de Testing](./testing/CURSO_TESTING.md) — Guía introductoria sobre Vitest.
- [TODO Testing](./testing/TODO-TESTING.md) — Roadmap accionable de cobertura de pruebas.

### 🧩 Componentes (UI)
- [Index de Componentes](./components/index.md)
- [PostList](./components/PostList.md)
- [SearchBar](./components/SearchBar.md)
- [StateBoundary](./components/StateBoundary.md)
- [ThemeToggleButton](./components/ThemeToggleButton.md)
- [UserProfile](./components/UserProfile.md)

### 🪝 Hooks de Lógica
- [useUserSearch](./hooks/useUserSearch.md) — Hook de dominio.
- [useSearchInput](./hooks/useSearchInput.md) — Hook de UI.

### 📄 Páginas y Secciones
- [UserSearchPage](./pages/UserSearchPage.md) — Orquestador de búsqueda principal.

### 📦 Gestión de Estado (Redux)
- [Project Store (userSlice)](./store/userSlice.md) — Organización del estado global y selectores.

---

## 📐 Estándares de Ingeniería

1.  **React**: Todos los componentes usan `memo()`, `displayName` y `PropTypes`.
2.  **Tailwind v4**: Configuración vía `@theme` en CSS. Sin `tailwind.config.js`.
3.  **Redux**: Slices con selectores memorizados (`createSelector`).
4.  **Utils**: Uso obligatorio de `cn()` para gestión de clases.
