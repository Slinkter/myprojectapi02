# UserApp Pro (v2.2)

> SPA de búsqueda de perfiles construida con React 18 + Redux Toolkit.
> Una demostración técnica de **Clean Architecture**, **Data Mappers** y **State Management** profesional.

![React 18](https://img.shields.io/badge/React-18.3-blue)
![Vite 5](https://img.shields.io/badge/Vite-5.4-646CFF)
![Tailwind v4](https://img.shields.io/badge/Tailwind-v4.0-38B2AC)
![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-764ABC)

---

## 🗺️ Guía Visual del Proyecto

### 1. La "Cebolla" Arquitectónica (Capas Refinadas)

```
                 CAPA 4: PRESENTACIÓN (UI)
          ┌──────────────────────────────────────┐
          │      CAPA 3: APLICACIÓN (Redux)       │
          │   ┌──────────────────────────────┐   │
          │   │  CAPA 2: DOMINIO (Mappers)   │   │
          │   │   ┌──────────────────────┐   │   │
          │   │   │CAPA 1: INFRAESTRUCTURA│  │   │
          │   │   │ (API REST Adapters)  │   │   │
          │   │   └──────────────────────┘   │   │
          │   └──────────────────────────────┘   │
          └──────────────────────────────────────┘
```

### 2. Árbol de Componentes (Jerarquía Visual)

```
                       ┌──────────────────────┐
                       │    MainLayout.jsx    │
                       │    (Contenedor UI)   │
                       └──────────────────────┘
                                  │
                       ┌──────────────────────┐
                       │    UserSearchPage    │
                       │    (Orquestador)     │
                       └──────────────────────┘
                       ╱                      ╲
          ┌──────────────────────┐      ┌──────────────────────┐
          │    SearchBar.jsx     │      │     UserView.jsx     │
          │    Input + Botón     │      │     (State Gate)     │
          └──────────────────────┘      └──────────────────────┘
                                         ╱              ╲
                          ┌──────────────────┐    ┌──────────────────┐
                          │   UserProfile    │    │     PostList     │
                          │    (Bio Data)    │    │   (Feed Data)    │
                          └──────────────────┘    └──────────────────┘
```

### 3. El "Camino Feliz" (Data Flow)

```
    ① INPUT                ② DOMAIN HOOK           ③ DATA MAPPER
    ───────                ─────────────           ─────────────

    ┌──────────────┐       ┌──────────────┐         ┌──────────────────┐
    │   Usuario    │       │useUserSearch │         │  user.mappers.js │
    │   "id: 1"    │──────►│   dispatch   │────────►│   mapRawUser()   │
    │   (Events)   │       │   (Logic)    │         │   (Pure Data)    │
    └──────────────┘       └──────────────┘         └──────────────────┘
```

---

## 📦 Stack Tecnológico y Trade-offs

| Tecnología        | Razón de la elección                              | Trade-off (Lo malo)                               |
| ----------------- | ------------------------------------------------- | ------------------------------------------------- |
| **Redux Toolkit** | Flujo de datos 100% predecible y centralizado.    | Añade más archivos que usar un simple `useState`. |
| **Tailwind v4**   | Estilizado ultra-rápido sin archivos CSS pesados. | Las clases en el HTML pueden verse desordenadas.  |
| **Data Mappers**  | Protege la UI de cambios en la API externa.       | Requiere escribir código extra de transformación. |
| **Vite**          | Recarga instantánea y construcción optimizada.    | Configuración mínima pero rígida.                 |

---

## 🛠️ Instalación Rápida

```bash
pnpm install
pnpm run dev    # Desarrollo (http://localhost:5173)
pnpm run build  # Producción
```

---

## 📚 Documentación Profunda

- [📖 Masterclass de Ingeniería](./src/docs/MASTERCLASS_INGENIERIA.md): Explicación línea a línea de los patrones.
- [🏗️ Arquitectura](./src/docs/architecture.md): Diagramas técnicos y flujo de datos.
- [🩺 Diagnóstico Técnico](./src/docs/00-diagnostico-tecnico.md): Por qué elegí este stack.

---

## 👤 Autor

**Luis J. Cueva** — Frontend Architect
[LinkedIn](https://www.linkedin.com/in/slinkter/) | [GitHub](https://github.com/Slinkter)

MIT © 2026
