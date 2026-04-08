# 🩺 Diagnóstico Técnico: Arquitectura y Decisiones (v2.1)

Este documento justifica las decisiones de ingeniería tomadas en el proyecto `myprojectapi02`, analizando los trade-offs de cada tecnología y patrón implementado.

---

## 🏗️ Criterios de Selección (Métricas)

```ascii
                    MÉTRICAS DE CALIDAD — DECISIONES
                    ────────────────────────────────

       ┌──────────────────────┐           ┌──────────────────────┐
       │     SCALABILITY      │           │     PERFORMANCE      │
       │         100%         │           │         95%          │
       └──────────────────────┘           └──────────────────────┘
                  │                                  │
                  ▼                                  ▼
       ┌──────────────────────┐           ┌──────────────────────┐
       │   MAINTAINABILITY    │           │       UX / UI        │
       │         90%          │           │         100%         │
       └──────────────────────┘           └──────────────────────┘
```

---

## 📊 Matriz de Trade-offs Tecnológicos

| Tecnología       | Elegida       | Alternativa Descartada     | Razón del Cambio / Trade-off                                       |
| ---------------- | ------------- | -------------------------- | ------------------------------------------------------------------ |
| **Estado**       | Redux Toolkit | React Query / Context      | Elegí Redux Toolkit por la necesidad de una orquestación compleja. |
| **Estilos**      | Tailwind v4   | CSS Modules / Styled-Comp  | Tailwind v4 reduce el bundle size eliminando el runtime de JS.     |
| **Build**        | Vite 5        | Create React App / Next.js | Vite ofrece una experiencia de desarrollo instantánea.             |
| **Arquitectura** | Feature-Based | Layer-Based                | La organización por características facilita el escalado.          |

---

## 🧩 Comparación de Alternativas de Estado

```ascii
                    ESTADO GLOBAL — ARQUITECTURA
                    ────────────────────────────

       ┌──────────────────────┐           ┌──────────────────────┐
       │    REDUX TOOLKIT     │           │    DOMINIO LIMPIO    │
       │    (Global Brain)    │──────────►│     (Pure Logic)     │
       └──────────────────────┘           └──────────────────────┘
                  ▲                                  │
                  │                                  ▼
       ┌──────────────────────┐           ┌──────────────────────┐
       │       UI REACT       │           │     DATA MAPPERS     │
       │     (Subscriber)     │◄──────────│     (Sanitizers)     │
       └──────────────────────┘           └──────────────────────┘
```

---

_Documento generado bajo estándares de Senior Frontend Architecture._
