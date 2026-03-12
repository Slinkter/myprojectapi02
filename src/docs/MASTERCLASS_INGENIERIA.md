# 🎓 Masterclass de Ingeniería: myprojectapi02 (v2.1)

Este documento no es una guía de uso, es una **disección técnica** de las decisiones de arquitectura que convierten a este sistema en una herramienta de grado empresarial.

---

## 🗺️ Mapa de Patrones de Diseño (Pattern Mapping)

```mermaid
graph TD
    A[FLUX PATTERN<br/>Redux Store] --> B[STRATEGY PAT<br/>useUserSearch]
    B --> C[ADAPTER PAT<br/>User Mapper]
    C --> D[OBSERVER PAT<br/>Redux Selectors]
```

---

## 🏗️ SECCIÓN 1: El Problema — SPA y el Caos de Estado

```mermaid
graph LR
    subgraph Situación sin orden
        A[Componente Llama a API] --> B[Caos de Estado]
    end
    subgraph Orden Arquitectónico
        C[Capas UI Desacoplado] --> D[DOMINIO PURO<br/>Mappers + Entidades]
    end
```

---

## 🛡️ SECCIÓN 2: El Patrón Data Mapper — Programación Defensiva

```mermaid
graph LR
    A[API RAW<br/>{ id: 1 }] -->|mapRawUser| B[DATA MAPPER]
    B --> C[DOMINIO SEGURO<br/>{ id: 1 }]
```

---

## 💀 SECCIÓN 3: StateBoundary — El Patrón Declarativo

```mermaid
graph TD
    A[dispatch fetchUser] --> B{status = loading}
    B --> C[ProfileSkeleton]
    B --> D[PostListSkeleton]
    B -->|failed| E[ErrorMsg]
    B -->|succeeded| F[UserView]
    B -->|notFound| G[NotFound]
```

---

## 🎣 SECCIÓN 4: Orquestación de Hooks (SRP)

```mermaid
graph TD
    A[useSearchInput<br/>Local State UI] --> B[Debounce Log<br/>Performance]
    B --> C[useUserSearch<br/>Domain Hook]
    C --> D[REDUX STORE<br/>Global State]
```

---
*Documento generado bajo estándares de Senior Frontend Architecture.*
