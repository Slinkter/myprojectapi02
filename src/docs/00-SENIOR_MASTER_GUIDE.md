# 📘 Guía Maestra: Arquitectura y Desarrollo de UserApp Pro
> **Nivel:** Senior / Architect
> **Enfoque:** Clean Architecture, Domain Driven Design (DDD) y State Management.

---

## 📑 Índice de Contenidos
1. [Introducción: El Paradigma de la Cebolla](#1-introducción-el-paradigma-de-la-cebolla)
2. [Capa de Infraestructura: La Capa Anti-Corrupción (ACL)](#2-capa-de-infraestructura-la-capa-anti-corrupción-acl)
3. [Capa de Dominio: Entidades y Transformación](#3-capa-de-dominio-entidades-y-transformación)
4. [Capa de Aplicación: Gestión de Estado con Redux Toolkit](#4-capa-de-aplicación-gestión-de-estado-con-redux-toolkit)
5. [Capa de Presentación: Componentes y Hooks](#5-capa-de-presentación-componentes-y-hooks)
6. [Resiliencia y UX: StateBoundary y AbortController](#6-resiliencia-y-ux-stateboundary-y-abortcontroller)

---

## 1. Introducción: El Paradigma de la Cebolla
El proyecto no está organizado por "tipo de archivo" (componentes, servicios), sino por **capas de responsabilidad**. El principio fundamental es que **la lógica de negocio nunca debe depender de la tecnología externa**.

### ¿Por qué esta estructura?
- **Desacoplamiento:** Podemos cambiar la API o la base de datos sin tocar la UI.
- **Testabilidad:** La lógica de dominio es puro JavaScript, fácil de testear sin React.
- **Escalabilidad:** Las funcionalidades se agrupan en `features/`, evitando el "código espagueti".

---

## 2. Capa de Infraestructura: La Capa Anti-Corrupción (ACL)
Ubicación: `src/shared/api/` y `src/entities/[entity]/api/`.

En el mundo real, las APIs externas son "sucias" (nombres de campos inconsistentes, datos faltantes). La capa de Infraestructura actúa como un **filtro**.
- **`api-client.js`:** Es nuestro `fetch` configurado. Aquí se manejan los timeouts y las cabeceras base.
- **Principio:** Ningún componente debe llamar a `fetch` directamente. Siempre lo hace a través de un adaptador.

---

## 3. Capa de Dominio: Entidades y Transformación
Ubicación: `src/entities/[entity]/domain/`.

Aquí vive el **Mapper**. El Mapper es una función pura que transforma el "JSON crudo" de la API en un "Objeto de Dominio" limpio.

**Ejemplo de concepto:**
- API nos da: `{ user_id: 1, full_name: "John" }`
- Nuestro Dominio usa: `{ id: 1, name: "John" }`
Si la API cambia el nombre del campo mañana, solo cambias el Mapper en un lugar, y tu aplicación sigue funcionando.

---

## 4. Capa de Aplicación: Gestión de Estado con Redux Toolkit
Ubicación: `src/entities/[entity]/store/` y `src/app/store/`.

Redux no es una base de datos, es un **bus de eventos**.
- **Slices:** Definen el estado inicial y los cambios (reducers).
- **Thunks:** Manejan la asincronía. Un punto clave Senior aquí es el uso de `AbortController` para cancelar peticiones si el usuario navega rápido, evitando fugas de memoria.
- **Selectores Memoizados (`createSelector`):** Crucial para el rendimiento. Evitan que React renderice de nuevo si los datos en el store no han cambiado realmente.

---

## 5. Capa de Presentación: Componentes y Hooks
Ubicación: `src/features/`, `src/widgets/`, `src/shared/ui/`.

Seguimos el patrón de **Componentes Inteligentes vs. Tontos**:
- **Smart Components (Features/Pages):** Conocen Redux, manejan lógica, llaman a hooks.
- **Dumb Components (Shared UI):** Solo reciben `props` y renderizan CSS. Son 100% reutilizables.
- **Hooks de Dominio (`useUserSearch`):** Encapsulan la orquestación. El componente solo dice "busca a este usuario", el hook sabe *cómo* hablar con Redux y el motor de búsqueda.

---

## 6. Resiliencia y UX: StateBoundary y AbortController
Para un Senior, un "Loading" no es suficiente. Necesitamos manejar:
- **Estados de Vacío (Empty States):** ¿Qué pasa si no hay resultados?
- **Estados de Error:** ¿Cómo se recupera el usuario? (Botón de Reintento).
- **StateBoundary:** Un componente de alto nivel que envuelve la UI y decide automáticamente si mostrar el Spinner, el Error o el Contenido basándose en el estado de Redux.

---

## 🛠 Glosario para el Día 1
- **DDD:** Diseño Dirigido por el Dominio.
- **Memoización:** Guardar el resultado de una función costosa.
- **Hydration:** El proceso de llenar el estado inicial.
- **Pure Function:** Una función que con la misma entrada siempre da la misma salida y no tiene efectos secundarios.

---
*Este documento es una guía viva. Si encuentras un patrón mejor, documéntalo y evoluciona el sistema.*
