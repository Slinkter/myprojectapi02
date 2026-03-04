# 🏗️ Arquitectura del Sistema (v2.0)

Este documento describe la arquitectura de alta ingeniería implementada en `myprojectapi02`, basada en principios de **Clean Architecture** y **Domain Driven Design (DDD)**.

## 🌉 Resumen Estructural

La aplicación sigue un flujo unidireccional de datos con una clara separación de capas para maximizar el desacoplamiento y la testabilidad.

```ascii
+-------------------------------------------------------------+
|                     CAPA DE PRESENTACIÓN (UI)               |
|  [UserSearchPage] --> (Smart Component / Orquestador)       |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                     CAPA DE LÓGICA (HOOKS)                  |
|  [useSearchInput] (UI State)  |  [useUserSearch] (Domain)   |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                     CAPA DE ESTADO (REDUX)                  |
|  [userSlice] (Data)           |  [uiSlice] (i18n / Theme)   |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                     CAPA DE SERVICIO (DOMAIN)               |
|  [user-service] (Agregador y Orquestador de Negocio)        |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                     CAPA DE DATOS (API & MAPPERS)           |
|  [user.api] (atomic fetch)    |  [user.mappers] (Data Clean) |
+-------------------------------------------------------------+
```

## 🛠️ Tecnologías Core

| Librería | Versión | Propósito |
| :--- | :--- | :--- |
| **React** | 18.3.1 | Motor de la interfaz. |
| **Tailwind CSS** | 4.2.1 | Estilizado puro (Zero-config JS, CSS-first). |
| **Redux Toolkit** | 2.11.2 | Gestión de estado predecible. |
| **Heroicons** | 2.2.0 | Iconografía vectorial. |

## 🧩 Patrones de Diseño Implementados

### 1. State Boundary (UI Pattern)
Utilizamos el patrón de composición para centralizar la gestión de estados asíncronos (`loading`, `error`, `notFound`).

```ascii
[UserSearchPage]
       |
       +--> [StateBoundary] (Lógica de renderizado condicional)
                 |
                 +-- [LoadingView]
                 +-- [ErrorMessage]
                 +-- [UserView] (Succeeded)
```

### 2. Data Mappers (Architectural Pattern)
Para cumplir con el desacoplamiento de infraestructuras externas (JSONPlaceholder), implementamos Mappers que transforman la data cruda en entidades de dominio limpias.

```ascii
[API Response] ----> [Mapper] ----> [Domain Entity] ----> [Store]
  (raw JSON)       (Transform)     (Clean Object)     (Immutable)
```

### 3. Smart vs Dumb Components
- **Smart:** `UserSearchPage.jsx`. Conoce el estado, los hooks y orquesta la vista.
- **Dumb:** `SearchBar.jsx`, `UserProfile.jsx`, `PostList.jsx`. Solo reciben props y renderizan UI pura.

## 🌐 Internacionalización (i18n)

Implementado mediante un sistema de diccionarios reactivos en `src/lib/translations.js` y gestionado globalmente por `uiSlice`.

```ascii
[Action: Toggle] -> [uiSlice] -> [useTranslation Hook] -> [UI Update]
```

## 🎨 Estilos con Tailwind v4

Hemos migrado a **Tailwind CSS v4 puro**, eliminando todas las librerías de componentes externas.
- **Configuración:** Integrada directamente en `vite.config.js` vía `@tailwindcss/vite`.
- **Temas:** Variables definidas en la capa `@theme` dentro de `src/index.css`.
- **Modo Oscuro:** Basado en la clase `.dark` en el elemento raíz HTML.
