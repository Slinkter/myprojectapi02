# Technical Data Lifecycle & State Management

## 📊 Global State Structure (Redux)
El estado se centraliza en `src/app/store/store.js` utilizando **Redux Toolkit**.

### User Slice (`state.user`)
- `fetchStatus`: Máquina de estados (`idle`, `loading`, `succeeded`, `failed`, `notFound`).
- `currentUser`: Entidad de usuario sanitizada.
- `currentUserPosts`: Array de publicaciones del usuario.
- `cachedUserList`: Caché local de todos los usuarios para búsqueda por nombre.

---

## 🛡️ Anti-Corruption Layer (Mappers)
Protegemos el dominio de cambios en la API externa mediante mappers obligatorios.

### Transformación de Datos
- **Entrada:** JSON crudo de la API (campos como `address.street`, `company.name`).
- **Salida:** Objetos planos con valores por defecto garantizados y tipos consistentes.
- **Ubicación:** `src/entities/user/domain/user.mappers.js`.

---

## 📡 Request Orchestration

### Concurrencia y Resiliencia
- Usamos `Promise.all` en los servicios (`user-service.js`) para peticiones paralelas.
- **Manejo de Errores Parciales:** Si los posts fallan pero el usuario carga, la app continúa funcionando (Fallo gracioso).

### Cancelación (AbortSignal)
- Cada Thunk recibe un `signal` automático de Redux Toolkit.
- Este signal se propaga hasta el `fetch` nativo para evitar fugas de memoria y condiciones de carrera en búsquedas rápidas.

---

## 🔍 Search Engine Logic
El motor de búsqueda en `src/features/user-search/services/search-engine.js` resuelve la identidad:
1.  **Regex Check:** ¿Es un ID numérico? -> Retorna ID directo.
2.  **Caché Lookup:** ¿Coincide con un username en `cachedUserList`? -> Retorna el ID asociado.
3.  **Fallback:** Retorna `null` si no hay coincidencia (Estado 404).
