# 📋 Plan de Trabajo: Optimización y Refactorización (Estándar 2026)

Este documento rastrea el progreso de la auditoría y refactorización del proyecto **UserApp Pro**, aplicando los roles del Comité de Ingeniería (Arquitecto, Performance Engineer, QA Lead).

## 📊 Progreso General: [▓▓▓▓▓▓▓▓▓▓] 100%

---

### 🗂️ FASE 1: Auditoría Arquitectónica y O(1) Data Structures (Performance & Arquitectura)
*Objetivo: Transformar búsquedas $O(n)$ en $O(1)$ y asegurar FSD.*
- [x] **1.1 Redux Store (`userSlice.js`):** Refactorizar `cachedUserList` de Array a un Diccionario/Map (Ej. `Record<string, User>`) indexado por ID y/o Username.
- [x] **1.2 Search Engine (`search-engine.js`):** Actualizar la lógica de resolución para aprovechar la estructura $O(1)$.
- [x] **1.3 Selectores:** Actualizar selectores memoizados para devolver arrays cuando la UI lo requiera, manteniendo el store optimizado.

### 🛡️ FASE 2: Integridad, Zod y Data Flow (Arquitectura)
*Objetivo: Blindar las entradas de datos y el tipado en UI.*
- [x] **2.1 APIs y Mappers:** Revisar `user.api.js`, `post.api.js` y sus mappers para garantizar que el parsing de Zod es estricto antes de llegar a Redux.
- [x] **2.2 UI PropTypes:** Auditar componentes como `UserProfile.jsx` y `UserView.jsx` para asegurar el uso de `zodToPropTypes`.

### ⚡ FASE 3: Performance UI y Tailwind v4 Clean-up (Performance)
*Objetivo: Cero fugas de memoria, renders óptimos y CSS limpio.*
- [x] **3.1 Clean-up Tailwind:** Revisar `UserSearchPage.jsx`, `SearchBar.jsx` y componentes compartidos para asegurar el uso eficiente de `cn()`.
- [x] **3.2 Memory & Scope:** Identificar y corregir problemas de Hoisting, funciones anónimas inline y dependencias de `useEffect`.
- [x] **3.3 Memoización:** Auditar uso de `React.memo`, `useMemo` y `useCallback` en componentes pesados.

### 🧪 FASE 4: QA, Robustez y Salida Pedagógica (QA & Editor)
*Objetivo: Estabilidad garantizada y documentación del proceso.*
- [x] **4.1 Tests (Unit & Hooks):** Identificar qué tests en `test/` se rompieron por el cambio arquitectónico a $O(1)$ y sugerir las correcciones.
- [x] **4.2 Edge Cases:** Validar estados de carga, cancelación de red (`AbortController`) y manejos de `ApiError`.
- [x] **4.3 Documentación ASCII:** Generar los diagramas y notas del arquitecto para cada refactor importante.

---
*Última actualización: Fase 0 completada. Preparando Fase 1.*