# UserApp Pro (v2.1)

> SPA de búsqueda de perfiles construida con React 18 + Redux Toolkit.
> Implementa Clean Architecture, Data Mappers y StateBoundary pattern
> como demostración de arquitectura frontend de producción.

![React 18](https://img.shields.io/badge/React-18.3-blue)
![Vite 5](https://img.shields.io/badge/Vite-5.4-646CFF)
![Tailwind v4](https://img.shields.io/badge/Tailwind-v4.0-38B2AC)
![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-764ABC)
![License MIT](https://img.shields.io/badge/License-MIT-green)

---

## 🏗️ Arquitectura del Sistema

╔════════════════════════════════════════════════════════════════════╗
║                      BROWSER / CLIENT UI                           ║
╠════════════════════════════════════════════════════════════════════╣
║  ╔═══════════════════╗        ╔══════════════════════════════╗     ║
║  ║  REACT COMPONENTS ║ <────> ║  REDUX STORE (SSO)           ║     ║
║  ╚════════╦══════════╝        ╚════════╦═════════════════════╝     ║
║           ║                            ║                           ║
║  ╔════════▼══════════╗        ╔════════▼═════════════════════╗     ║
║  ║  DOMAIN HOOKS     ║ <────> ║  INFRASTRUCTURE (API/MAPPERS)  ║     ║
║  ╚═══════════════════╝        ╚══════════════════════════════╝     ║
╚════════════════════════════════════════════════════════════════════╝

---

## ✨ ¿Qué hace este proyecto?

UserApp Pro permite buscar perfiles de usuario y sus publicaciones asociadas consumiendo la API de JSONPlaceholder. El sistema destaca por su resiliencia mediante la sanitización de datos externos y una gestión de estados asíncronos declarativa que elimina la lógica visual dispersa.

---

## 🚀 Demo en vivo

[Acceder a la Demo en GitHub Pages](https://Slinkter.github.io/myprojectapi02/)

---

## 📦 Stack Tecnológico

| Tecnología | Versión | Por qué la elegí | Alternativa descartada |
|---|---|---|---|
| **React** | 18.3 | Ofrece concurrent rendering y una API de hooks madura para la orquestación de UI compleja. | Vue/Svelte |
| **Redux Toolkit** | 2.11 | Proporciona un flujo de datos unidireccional predecible y selectores optimizados. En este proyecto, RTK es preferible sobre React Query para demostrar el control total del estado global. | React Query / Zustand |
| **Tailwind CSS** | v4 | El motor CSS-First elimina la sobrecarga del runtime de JS y acelera el build time significativamente. | Tailwind v3 / Styled Components |
| **Vite** | 5.4 | El estándar moderno para desarrollo rápido con HMR instantáneo y build optimizado. | CRA / Webpack |

---

## 🛠️ Instalación y uso

```bash
git clone https://github.com/Slinkter/myprojectapi02.git
cd myprojectapi02
pnpm install
pnpm run dev        # → http://localhost:5173
pnpm run build      # → genera /dist
pnpm run deploy     # → publica en GitHub Pages
```

---

## 📁 Estructura del proyecto

```bash
src/
├── components/          # UI Global
│   ├── layout/          # Wrappers estructurales
│   └── ui/              # Componentes genéricos (StateBoundary, etc.)
├── features/            # Dominios de negocio
│   └── user-search/     # Búsqueda de usuarios (Feature Principal)
│       ├── components/  # UI específica de la característica
│       ├── domain/      # Entidades y Mappers (Clean Architecture)
│       ├── hooks/       # Orquestadores de dominio (useUserSearch)
│       ├── services/    # Orquestación de lógica de negocio
│       └── store/       # Slices de Redux (antes redux/)
├── store/               # Store central y slices globales
├── lib/                 # Infraestructura base (api-client, utils)
└── hooks/               # Hooks transversales (useTheme)
```

---

## 🧩 Los 4 Patrones Clave

### 1. Clean Architecture
El sistema separa estrictamente el transporte de datos (Infraestructura), la transformación de datos (Dominio) y la visualización (Presentación). Esto garantiza que si la API externa cambia, la UI no se vea afectada.

### 2. Data Mapper — Programación Defensiva
Utilizamos mappers para transformar el JSON crudo de la API en entidades seguras.
```javascript
// src/features/user-search/domain/user.mappers.js
export const mapRawUser = (raw) => ({
  id: Number(raw.id),
  name: String(raw.name || "Usuario Anónimo")
});
```

### 3. StateBoundary — Estado Declarativo
Eliminamos el uso de `if(loading)` disperso en los componentes. El `StateBoundary` maneja los estados de forma centralizada.
```jsx
<StateBoundary status={status} error={error}>
  <UserView user={user} posts={posts} />
</StateBoundary>
```

### 4. Separación de Hooks
Diferenciamos la lógica de UI (`useSearchInput`) de la lógica de dominio (`useUserSearch`), siguiendo el Single Responsibility Principle (SRP).

---

## 🔄 Flujo de datos completo

╔══════════════╗     ╔══════════════╗     ╔══════════════╗
║  USER INPUT  ║ ──> ║  DOMAIN HOOK  ║ ──> ║ REDUX STORE  ║
╚══════════════╝     ╚══════════════╝     ╚══════╦═══════╝
       ▲                                         ║
       ║             ╔══════════════╗     ╔══════▼═══════╗
       ╚════════════ ║  UI SELECTOR ║ <── ║ DATA MAPPERS ║
                     ╚══════════════╝     ╚══════════════╝

---

## 🔴 Decisiones técnicas y trade-offs

### ¿Por qué Redux y no React Query?
React Query es excelente para el cacheo de servidor, pero Redux Toolkit permite una gestión más granular del estado de la aplicación y de la UI (como el manejo coordinado de usuarios y posts en un solo flujo). En este proyecto, se usa para demostrar la arquitectura de un Store centralizado.

### ¿Por qué mappers y no usar la API directamente?
Usar la API directamente acopla la UI al contrato externo. Si la API cambia un campo (ej: `name` a `fullname`), tendrías que cambiar 20 componentes. Con mappers, solo cambias 1 archivo de dominio.

---

## 📚 Documentación adicional

| Documento | Contenido |
|---|---|
| [Masterclass de Ingeniería](./src/docs/MASTERCLASS_INGENIERIA.md) | Tutorial técnico profundo de cada patrón |
| [Arquitectura](./src/docs/architecture.md) | Diagramas y estructura del sistema |
| [Diagnóstico Técnico](./src/docs/00-diagnostico-tecnico.md) | Justificación de decisiones con trade-offs |

---

## 👤 Autor

Luis J. Cueva — Frontend Developer
[LinkedIn](https://www.linkedin.com/in/slinkter/) | [Portfolio](https://slinkter.dev) | [GitHub](https://github.com/Slinkter)

---

## 📄 Licencia

MIT © 2026 Luis J. Cueva
