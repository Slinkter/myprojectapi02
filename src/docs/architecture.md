# 🏗️ Arquitectura del Sistema: Clean Architecture (v2.1)

Este proyecto implementa una **Arquitectura de Capas (Onion Architecture)** adaptada al ecosistema React/Redux para garantizar el desacoplamiento total de la infraestructura y el dominio.

---

## 📐 Vista General del Sistema

```
                    SISTEMA COMPLETO — OVERVIEW
                    ───────────────────────────

       ┌──────────────────────┐           ┌──────────────────────┐
       │      BROWSER UI      │           │     REDUX STORE      │
       │     React + Vite     │──────────►│     Slices + RTK     │
       └──────────────────────┘           └──────────────────────┘
                  ▲                                  │
                  │                                  ▼
       ┌──────────────────────┐           ┌──────────────────────┐
       │     EXTERNAL API     │           │     DATA MAPPERS     │
       │   JSONPlaceholder    │◄──────────│     Domain Logic     │
       └──────────────────────┘           └──────────────────────┘
```

---

## 🧩 Clean Architecture (4 Capas)

```
              CAPA 4: PRESENTACIÓN (UI)
       ┌──────────────────────────────────────┐
       │        React Components + JSX        │
       │  SearchBar · UserView · UserProfile  │
       └──────────────────────────────────────┘
                        │ depende de ▼
              CAPA 3: APLICACIÓN (STATE)
       ┌──────────────────────────────────────┐
       │    Redux Thunks · Hooks · Slices     │
       │    userSlice.js · useUserSearch      │
       └──────────────────────────────────────┘
                        │ depende de ▼
              CAPA 2: DOMINIO (LÓGICA)
       ┌──────────────────────────────────────┐
       │    user.mappers.js · Entidades       │
       │    Validación · Modelos Puros        │
       └──────────────────────────────────────┘
                        │ depende de ▼
              CAPA 1: INFRAESTRUCTURA
       ┌──────────────────────────────────────┐
       │     user.api.js · api-client.js      │
       │     REST Adapters · Fetch Logic      │
       └──────────────────────────────────────┘
```

---

## 🌳 Árbol de Componentes

```
                       ┌──────────────────────┐
                       │       App.jsx        │
                       └──────────────────────┘
                                  │
                       ┌──────────────────────┐
                       │    MainLayout.jsx    │
                       └──────────────────────┘
                       ╱                      ╲
          ┌──────────────────────┐      ┌──────────────────────┐
          │    SearchBar.jsx     │      │     UserView.jsx     │
          │    Input + Botón     │      │    Datos Usuario     │
          └──────────────────────┘      └──────────────────────┘
                                         ╱              ╲
                          ┌──────────────────┐    ┌──────────────────┐
                          │   UserProfile    │    │     PostList     │
                          └──────────────────┘    └──────────────────┘
```

---

## 🔄 Flujo de Datos End-to-End (Redux Cycle)

```
                    FLUJO DE DATOS — REDUX CYCLE
                    ────────────────────────────

    ① INPUT                ② HOOK                  ③ STORE
    ───────                ──────                  ───────

    ┌──────────────┐       ┌──────────────┐         ┌──────────────────┐
    │   Usuario    │       │useUserSearch │         │   userSlice.js   │
    │   escribe    │──────►│   dispatch   │────────►│ fetchUserAndPos  │
    └──────────────┘       └──────────────┘         └──────────────────┘
          ▲                                                  │
          │                                                  ▼
    ┌──────────────┐       ┌──────────────┐         ┌──────────────────┐
    │    React     │       │ useSelector  │         │  user.mappers.js │
    │  re-render   │◄──────│  selectores  │◄────────│   mapRawUser()   │
    └──────────────┘       └──────────────┘         └──────────────────┘
```

---

## 🚀 Pipeline de Deploy (GitHub Pages)

```
                    PIPELINE — GITHUB PAGES DEPLOY
                    ──────────────────────────────

    LOCAL DEV              BUILD                   DEPLOY
    ──────────             ─────                   ──────

    ┌──────────────┐       ┌──────────────┐        ┌───────────────────┐
    │   pnpm dev   │       │  pnpm build  │        │   pnpm deploy     │
    │    :5173     │──────►│ vite bundle  │───────►│  gh-pages branch  │
    └──────────────┘       └──────────────┘        └───────────────────┘
                                                             │
                                                             ▼
                                                ┌──────────────────────┐
                                                │ slinkter.github.io   │
                                                │ /myprojectapi02      │
                                                └──────────────────────┘
```

---
*Documento generado bajo estándares de Senior Frontend Architecture.*
