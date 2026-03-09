# 🏗️ Arquitectura del Sistema: Clean Architecture (v2.1)

Este proyecto implementa una **Arquitectura de Capas (Onion Architecture)** adaptada al ecosistema React/Redux para garantizar el desacoplamiento total de la infraestructura y el dominio.

---

## 📐 Vista General del Sistema

╔══════════════════════════════════════════════════════════════╗
║                    BROWSER / CLIENT UI                       ║
╠══════════════════════════════════════════════════════════════╣
║  ╔══════════════════════╗      ╔════════════════════════╗    ║
║  ║   REACT COMPONENTS   ║ <──> ║   DOMAIN HOOKS (SRP)   ║    ║
║  ╚══════════╦═══════════╝      ╚══════════╦═════════════╝    ║
║             ║                             ║                  ║
║  ╔══════════▼═══════════╗      ╔══════════▼═════════════╗    ║
║  ║   REDUX STORE (SSO)  ║ <──> ║   THUNKS & SERVICES    ║    ║
║  ╚══════════╦═══════════╝      ╚══════════╦═════════════╝    ║
║             ║                             ║                  ║
║  ╔══════════▼═══════════╗      ╔══════════▼═════════════╗    ║
║  ║   DATA MAPPERS (DDD) ║ <──> ║   EXTERNAL API (REST)  ║    ║
║  ╚══════════════════════╝      ╚════════════════════════╝    ║
╚══════════════════════════════════════════════════════════════╝

---

## 🧬 Capas de Clean Architecture

### 1. Presentación (Capa Externa)
Componentes React puros que solo conocen el estado para renderizar UI. No tienen lógica de negocio.
- **Componentes:** `UserProfile.jsx`, `PostList.jsx`.
- **Patrón:** `React.memo` + `PropTypes`.

### 2. Aplicación (Capa de Orquestación)
Define los casos de uso del sistema. Orquesta la interacción con el Store y los Servicios.
- **Hooks:** `useUserSearch.js`.
- **Thunks:** `fetchUserAndPosts`.

### 3. Dominio (Capa de Lógica)
Contiene las entidades del dominio y los contratos de datos. Es agnóstica a la infraestructura.
- **Mappers:** `user.mappers.js`.
- **Propósito:** Sanitizar y proteger el modelo de datos.

### 4. Infraestructura (Capa de Acceso)
Se encarga de la comunicación con el mundo exterior.
- **API Client:** `api-client.js`.
- **Adapters:** `user.api.js`.

---

## 🔄 Flujo de Datos End-to-End

╔══════════════╗     ╔══════════════╗     ╔══════════════╗
║  USER INPUT  ║ ──> ║  DOM HOOKS   ║ ──> ║ REDUX STORE  ║
╚══════════════╝     ╚══════════════╝     ╚══════╦═══════╝
       ▲                                         ║
       ║             ╔══════════════╗     ╔══════▼═══════╗
       ╚════════════ ║  UI SELECTOR ║ <── ║ DATA MAPPERS ║
                     ╚══════════════╝     ╚══════════════╝

**Ciclo Técnico:** 
1. `UserSearchPage` dispara `performSearch`.
2. `useUserSearch` despacha `fetchUserAndPosts` (Thunk).
3. `user-service` llama a la infraestructura.
4. `api-client` realiza el fetch HTTP.
5. Los **Data Mappers** transforman el JSON sucio en entidades de dominio limpias.
6. El Store de Redux se actualiza y notifica a los componentes.

---
*Documento generado bajo estándares de Senior Frontend Architecture.*
