# 🎓 Masterclass de Ingeniería: myprojectapi02 (v2.1)

Este documento no es una guía de uso, es una **disección técnica** de las decisiones de arquitectura que convierten a este sistema en una herramienta de grado empresarial.

---

## 🏗️ SECCIÓN 1: El Problema — SPA y el Caos de Estado

El desarrollo de una Single Page Application (SPA) suele degradarse en un "espagueti de datos" cuando no hay una separación clara de responsabilidades. Sin arquitectura, los componentes React terminan realizando llamadas directas a la API y gestionando el estado global con `useState`.

╔══════════════════════════════════╗        ╔══════════════════════════════╗
║        SITUACIÓN SIN ORDEN       ║        ║      ORDEN ARQUITECTÓNICO    ║
╠══════════════════════════════════╣        ╠══════════════════════════════╣
║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║        ║  ░░░░░░░░░░░░░░░░░░░░░░░░░░  ║
║  ░ COMPONENTE <──> API EXTERNA ░  ║  ──>   ║  ░ UI <──> STORE <──> DOM  ░  ║
║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║        ║  ░░░░░░░░░░░░░░░░░░░░░░░░░░  ║
║  ░ ACAPARAMIENTO DE LÓGICA     ░  ║        ║  ░ SEPARACIÓN DE CAPAS     ░  ║
╚══════════════════════════════════╝        ╚══════════════════════════════╝

---

## 🧪 SECCIÓN 2: Clean Architecture en React

Hemos implementado una **Arquitectura en Capas** que garantiza que la lógica de negocio no dependa de la UI.

### Infraestructura (`src/lib/api-client.js`)
Solo se encarga del transporte HTTP. No conoce el dominio.
```javascript
export const fetchFromApi = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`);
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  return response.json();
};
```

### Dominio (`src/features/user-search/domain/user.mappers.js`)
Sanitiza y protege el modelo. Es el contrato que la UI espera recibir.
```javascript
export const mapRawUser = (raw) => {
  if (!raw?.id) return null;
  return {
    id: Number(raw.id),
    name: String(raw.name || "Usuario Anónimo")
    // ...
  };
};
```

---

## 🛡️ SECCIÓN 3: El Patrón Data Mapper — Programación Defensiva

La capa de infraestructura es "sucia" por naturaleza. Los servicios externos pueden cambiar sus contratos sin aviso. Los mappers actúan como un **escudo protector**.

╔══════════════════════════════════════════════╗
║                EL ESCUDO MAPPING             ║
╠══════════════════════════════════════════════╣
║  ╔══════════╗        ╔══════════════════╗    ║
║  ║ API RAW  ║ <────> ║ DATA MAPPERS     ║    ║
║  ╚══════════╝        ╚════════╦═════════╝    ║
║                               ║              ║
║                      ╔════════▼═════════╗    ║
║                      ║ DOMINIO SEGURO   ║    ║
║                      ╚══════════════════╝    ║
╚══════════════════════════════════════════════╝

**Escenario de Falla:** Si JSONPlaceholder cambia la propiedad `name` por `full_name`, solo actualizamos el Mapper en un único lugar. La UI permanece intacta.

---

## 💀 SECCIÓN 4: StateBoundary — El Patrón Declarativo

Hemos eliminado el antipatrón de llenar el JSX con `if(loading)` o ternarios complejos. El `StateBoundary` orquesta los 5 estados del ciclo de vida de forma centralizada.

╔══════════════════════════════════════════════╗
║              LÍMITE DE ESTADO                ║
╠══════════════════════════════════════════════╣
║  ╔══════════╗        ╔══════════════════╗    ║
║  ║ LOADING  ║ <────> ║  SUCCESS        ║    ║
║  ╚════╦═════╝        ╚════════╦═════════╝    ║
║  ╔════▼═════╗        ╔════════▼═════════╗    ║
║  ║ FAILED   ║ <────> ║  NOT_FOUND      ║    ║
║  ╚══════════╝        ╚══════════════════╝    ║
╚══════════════════════════════════════════════╝

---

## 🧠 SECCIÓN 5: Redux Toolkit — Flujo Predecible

Utilizamos Redux no solo por el estado global, sino por la **predictibilidad**.

1.  **Action (Thunk):** `fetchUserAndPosts.pending` activa esqueletos.
2.  **Reducer:** Actualiza el store con los datos mapeados.
3.  **Selector:** Los componentes se suscriben solo a la data que necesitan.

**Optimización:** Hemos simplificado los selectores para evitar `createSelector` cuando no hay transformaciones, reduciendo la carga computacional en cada render.

---

## 🎣 SECCIÓN 6: Los Dos Hooks — Separación de Responsabilidades

Implementamos el **Single Responsibility Principle (SRP)** mediante la separación de la lógica de UI y la lógica de dominio.

- **`useSearchInput`:** Gestiona el estado local del input, validaciones de rango (1-10) y mensajes de asistencia visual. No conoce Redux.
- **`useUserSearch`:** Orquesta la comunicación con el Store de Redux, la caché de usuarios y la ejecución de la búsqueda inteligente. No conoce el input de texto.

---
*Documento generado bajo estándares de Senior Frontend Architecture.*
