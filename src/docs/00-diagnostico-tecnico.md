# 🩺 Diagnóstico Técnico: Arquitectura y Decisiones (v2.1)

Este documento justifica las decisiones de ingeniería tomadas en el proyecto `myprojectapi02`, analizando los trade-offs de cada tecnología y patrón implementado.

---

## 🏗️ Diagrama de Criterios de Decisión

╔══════════════════════════════════════════════════════╗
║                CRITERIOS DE SELECCIÓN                ║
╠══════════════════════════════════════════════════════╣
║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║
║  ░ SCALABILITY ░░░░░░░░░░░░░░░░░░░░░░░░░░ 100% ░░  ║
║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║
║  ░ MAINTAINABILITY ░░░░░░░░░░░░░░░░░░░░░░ 90% ░░░  ║
║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║
║  ░ PERFORMANCE ░░░░░░░░░░░░░░░░░░░░░░░░░░ 95% ░░░  ║
╚══════════════════════════════════════════════════════╝

---

## 📊 Matriz de Trade-offs Tecnológicos

| Tecnología | Elegida | Alternativa Descartada | Razón del Cambio / Trade-off |
|---|---|---|---|
| **Estado** | Redux Toolkit | React Query / Context | Elegí Redux Toolkit por la necesidad de una orquestación compleja entre múltiples entidades (User + Posts) y la predictibilidad del flujo unidireccional. RTK simplifica el boilerplate mientras mantiene el control total. |
| **Estilos** | Tailwind v4 | CSS Modules / Styled-Comp | Tailwind v4 (CSS-First) reduce el bundle size eliminando el runtime de JS para estilos y aprovecha las variables CSS nativas para el modo oscuro. |
| **Build** | Vite 5 | Create React App / Next.js | Vite ofrece una experiencia de desarrollo instantánea gracias a HMR sobre ES Modules nativos. No se usó Next.js para mantener la pureza de una SPA cliente-side para portafolio. |
| **Arquitectura** | Feature-Based | Layer-Based | La organización por características facilita el escalado horizontal. Cada feature es un microcosmos autónomo (Redux, API, UI) fácil de testear. |

---

## 🧩 Comparación de Alternativas de Estado

╔══════════════════════════════════════════════╗
║             ESTADO GLOBAL 3D                 ║
╠══════════════════════════════════════════════╣
║  ╔══════════╗        ╔══════════════════╗    ║
║  ║ REDUX TK ║ <────> ║  DOMINIO LIMPIO  ║    ║
║  ╚════╦═════╝        ╚════════╦═════════╝    ║
║       ║                       ║              ║
║  ╔════▼═════╗        ╔════════▼═════════╗    ║
║  ║ UI REACT ║ <────> ║  DATA MAPPERS    ║    ║
║  ╚══════════╝        ╚══════════════════╝    ║
╚══════════════════════════════════════════════╝

**Decisión Final:** Se optó por Redux Toolkit 2.0 por su integración nativa con selectores memorizados y la robustez de sus AsyncThunks, que permiten manejar estados de carga globales de forma centralizada sin ensuciar los componentes con `useState`.

---
*Documento generado bajo estándares de Senior Frontend Architecture.*
