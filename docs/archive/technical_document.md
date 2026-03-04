# Documento Técnico de Software: myprojectapi02

---

## 1. Visión General del Sistema

Este documento describe la arquitectura, funcionalidad y diseño técnico del proyecto `myprojectapi02`. Se trata de una aplicación web frontend desarrollada con React que permite a los usuarios buscar perfiles de usuario y sus publicaciones asociadas a través de una API externa (JSONPlaceholder). El sistema ha sido diseñado con un enfoque en la modularidad, escalabilidad y una clara separación de responsabilidades para facilitar su mantenimiento y futuras expansiones.

---

## 2. Caso(s) de Uso Principal(es)

### CU-001: Búsqueda y Visualización de Perfil de Usuario y Publicaciones

**Descripción:** El usuario interactúa con la interfaz de búsqueda para encontrar un perfil de usuario por su ID. El sistema recupera los datos del usuario y sus publicaciones, y los muestra de forma organizada.

**Flujo Principal:**

1.  El usuario navega a la página principal de la aplicación.
2.  El usuario introduce un ID de usuario válido (ej. 1-10) en el campo de búsqueda.
3.  El usuario hace clic en el botón "Buscar".
4.  El sistema muestra indicadores de carga mientras se procesa la solicitud.
5.  El sistema realiza una petición a la API externa para obtener los datos del usuario y sus publicaciones.
6.  El sistema recibe la respuesta de la API.
7.  El sistema muestra el perfil del usuario y una lista de sus publicaciones.

**Flujos Alternativos:**

*   **FA-001a: ID de Usuario No Encontrado:**
    *   Si la API indica que el usuario no existe (ya sea con un estado HTTP 404 o una respuesta de datos vacía), el sistema muestra una tarjeta de "Usuario No Encontrado".
*   **FA-001b: Error de Sistema/Red:**
    *   Si ocurre un error durante la comunicación con la API (ej. error de red, error 500 del servidor), el sistema muestra un mensaje de error genérico con una opción para reintentar.

---

## 3. Descripción de la Arquitectura

La aplicación implementa una arquitectura basada en componentes y características (Feature-Based Architecture) con una clara división en capas, siguiendo principios de Clean Architecture.

*   **Capa de Presentación (UI):** Componentes React (`UserSearchPage.jsx`, `UserProfile.jsx`, `PostList.jsx`) encargados exclusivamente de la renderización y la interacción con el usuario.
*   **Capa de Lógica de UI (Hooks):** Custom Hooks (`useUser.js`) que abstraen la lógica de interacción con el estado global y las acciones, proveyendo una interfaz limpia a los componentes de UI.
*   **Capa de Gestión de Estado (Redux Toolkit):** Centraliza el estado de la aplicación (`userSlice.js`, `store.js`), manejando las transiciones de estado de forma predecible e inmutable. Utiliza `createAsyncThunk` para gestionar el ciclo de vida de las operaciones asíncronas.
*   **Capa de Servicios (Dominio):** Módulos (`user-service.js`) que contienen la lógica de negocio central, orquestando múltiples llamadas a la API y procesando/combinando los datos antes de ser entregados a la capa de gestión de estado.
*   **Capa de Acceso a Datos (API):** Módulos (`api.js`, `user.js`, `post.js`) que gestionan la comunicación directa con la API externa, incluyendo el cliente HTTP base, el manejo de errores a nivel de red y la serialización/deserialización de datos.

---

## 4. Diagrama de Flujo de Datos (DFD)

El siguiente diagrama ilustra cómo fluyen los datos a través de las diferentes capas y componentes del sistema durante una operación de búsqueda de usuario.

```mermaid
graph TD
    subgraph "🌐 Navegador del Usuario"
        direction LR
        User[👨‍💻 Usuario] -- 1. Escribe ID y hace clic --> Comp_UI[UserSearchPage.jsx]
    end

    subgraph "⚛️ Frontend App (React)"
        direction LR
        Comp_UI -- 2. Llama a handleSearch() --> Hook[useUser.js]
        Hook -- 3. Despacha acción fetchUserAndPosts --> Redux[Redux Store & Thunk]
        
        Redux -- 4. Pone estado en 'loading' --> Hook
        Hook -- 5. Actualiza UI --> Comp_UI
        Comp_UI -- 6. Muestra Skeletons --> User
        
        Redux -- 7. Llama al servicio --> Service[user-service.js]
        Service -- 8. Orquesta llamadas --> API_Layer[Capa API (api.js, etc.)]
        
        %% Camino Feliz (Éxito)
        API_Layer -- 10. Devuelve datos JSON --> Service
        Service -- 11. Combina {user, posts} --> Redux
        Redux -- 12. Pone estado en 'succeeded' con datos --> Hook
        Hook -- 13. Pasa datos a UI --> Comp_UI
        Comp_UI -- 14. Muestra UserProfile y PostList --> User

        %% Camino de "No Encontrado"
        Service -.-> Redux
        Redux -. 12a. Pone estado en 'notFound' .-> Hook
        Hook -. 13a. Pasa estado 'notFound' .-> Comp_UI
        Comp_UI -. 14a. Muestra NotFoundCard .-> User
        
        %% Camino de Error
        API_Layer == 10b. Lanza ERROR con status ==> Service
        Service == 11b. Propaga ERROR ==> Redux
        Redux == 12b. Pone estado en 'failed' ==> Hook
        Hook == 13b. Pasa estado 'failed' ==> Comp_UI
        Comp_UI == 14b. Muestra ErrorMessage ==> User

    end

    subgraph "☁️ API Externa"
        API_Layer -- 9. Fetch HTTP GET --> JSONPlaceholder[🌐 JSONPlaceholder API]
        JSONPlaceholder --> API_Layer
    end

    classDef default fill:#f9f9f9,stroke:#333,stroke-width:2px;
    classDef user fill:#e8dff5,stroke:#9673b9;
    classDef ui fill:#d4eef3,stroke:#3a8b9d;
    classDef hook fill:#f0e68c,stroke:#a09030;
    class_name,hook fill:#f0e68c,stroke:#a09030;
    classDef redux fill:#fec4aa,stroke:#d06b33;
    classDef service fill:#b6e0b6,stroke:#4a9d4a;
    classDef api fill:#c7c7c7,stroke:#555;
    
    class User user;
    class Comp_UI,Hook,Redux,Service,API_Layer,JSONPlaceholder default;
```

---

## 5. Diagrama de Componentes

Este diagrama muestra la jerarquía y las relaciones principales entre los componentes de React que conforman la interfaz de usuario de la aplicación.

```mermaid
graph TD
    A[App.jsx] --> B[MainLayout.jsx]
    B --> C[UserSearchPage.jsx]

    C --> D[Input]
    C --> E[Button]
    C --> F[Typography]

    C --> G[ProfileSkeleton.jsx]
    C --> H[PostListSkeleton.jsx]

    C --> I[ErrorMessage.jsx]
    C --> J[NotFoundCard.jsx]

    C --> K[UserProfile.jsx]
    C --> L[PostList.jsx]
    L --> M[PostItem.jsx] (Conceptual)
```

---

## 6. Diagrama de Rutas

Actualmente, la aplicación es una Single Page Application (SPA) con una única ruta principal.

```mermaid
graph TD
    Start[Inicio de la App] --> "/"
    "/" --> UserSearchPage[Página de Búsqueda de Usuario]
```

---

## 7. Requerimientos Funcionales (RF)

*   **RF-001: Búsqueda de Usuario por ID:** El sistema debe permitir al usuario introducir un ID numérico para buscar un perfil de usuario.
*   **RF-002: Visualización de Perfil:** El sistema debe mostrar el nombre, email y cualquier otra información relevante del usuario encontrado.
*   **RF-003: Visualización de Publicaciones:** El sistema debe mostrar una lista de las publicaciones asociadas al usuario encontrado.
*   **RF-004: Indicadores de Carga:** El sistema debe mostrar un estado visual de carga (esqueletos) mientras se recuperan los datos.
*   **RF-005: Manejo de "Usuario No Encontrado":** Si el ID de usuario no existe, el sistema debe mostrar un mensaje o componente específico indicando que el usuario no fue encontrado.
*   **RF-006: Manejo de Errores Generales:** Si ocurre un error en la comunicación con la API (ej. error de red, error del servidor), el sistema debe mostrar un mensaje de error y la opción de reintentar.
*   **RF-007: Validaciones Básicas de Entrada:** El campo de búsqueda debe aceptar solo IDs numéricos dentro de un rango específico (ej. 1-10 para JSONPlaceholder).

---

## 8. Requerimientos No Funcionales (RNF)

*   **RNF-001: Rendimiento:** La aplicación debe cargar la información del usuario y sus posts en menos de 3 segundos bajo condiciones de red normales.
*   **RNF-002: Usabilidad (UX):** La interfaz de usuario debe ser intuitiva y fácil de usar. Los mensajes de error y carga deben ser claros.
*   **RNF-003: Mantenibilidad:** El código debe ser modular, bien estructurado, y seguir buenas prácticas de programación para facilitar futuras modificaciones y extensiones.
*   **RNF-004: Escalabilidad:** La arquitectura debe permitir la adición de nuevas características y la expansión de la base de usuarios sin requerir reescrituras significativas.
*   **RNF-005: Robustez:** El sistema debe manejar gracefully los errores de la API y las condiciones de red adversas.
*   **RNF-006: Reusabilidad:** Los componentes de UI, hooks y funciones de utilidad deben ser diseñados para ser reutilizables en otras partes de la aplicación o en futuros proyectos.
*   **RNF-007: Consistencia Visual:** La interfaz de usuario debe mantener una apariencia y un comportamiento coherentes en toda la aplicación, utilizando los principios de Material Design y Tailwind CSS.

---

## 9. Procesos Clave del Sistema: Búsqueda de Usuario

El proceso de búsqueda de un usuario se puede desglosar en los siguientes pasos de alto nivel:

1.  **Inicio de Búsqueda:**
    *   El usuario introduce un `userId` en el `Input` de `UserSearchPage.jsx`.
    *   Al hacer clic en "Buscar", `handleSearch` (del hook `useUser.js`) es invocado.
    *   `handleSearch` despacha la acción asíncrona `fetchUserAndPosts(userId)` al `Redux_Store`.
2.  **Estado de Carga:**
    *   El `userSlice` de Redux detecta la acción `pending` de `fetchUserAndPosts`.
    *   Actualiza el `status` del estado a `'loading'`.
    *   `useUser.js` selecciona el nuevo estado, y `UserSearchPage.jsx` se re-renderiza, mostrando `ProfileSkeleton` y `PostListSkeleton`.
3.  **Orquestación de API (Capa de Servicios):**
    *   El `createAsyncThunk` de `fetchUserAndPosts` ejecuta la función `fetchUserProfile(userId)` de `user-service.js`.
    *   `fetchUserProfile` realiza dos llamadas a la API en paralelo (`Promise.all`): `getUser(userId)` y `getPostsByUser(userId)` (usando `api.js` como cliente HTTP base).
    *   `api.js` maneja las peticiones `fetch` a `JSONPlaceholder` y lanza errores enriquecidos con el `status` HTTP si la respuesta no es `ok`.
4.  **Procesamiento de Respuestas:**
    *   `fetchUserProfile` combina las respuestas de `user` y `posts`.
    *   Si `getUser` devuelve un objeto vacío (`{}`), `fetchUserProfile` devuelve `{ user: null, posts: [] }`.
5.  **Actualización Final del Estado (Redux):**
    *   **Éxito:** Si `fetchUserProfile` devuelve datos válidos, el `thunk` se resuelve y el `userSlice` establece `status: 'succeeded'`, guardando los datos de `user` y `posts`.
    *   **No Encontrado:** Si `fetchUserProfile` devuelve `user: null`, o si el `thunk` es rechazado con un error que contiene `status: 404`, el `userSlice` establece `status: 'notFound'`.
    *   **Fallo General:** Si el `thunk` es rechazado por cualquier otro error, el `userSlice` establece `status: 'failed'` y guarda el mensaje de error.
6.  **Renderizado del Resultado:**
    *   `useUser.js` detecta el cambio de estado final en Redux y pasa el `status` (y los datos/error) actualizado a `UserSearchPage.jsx`.
    *   `UserSearchPage.jsx` se re-renderiza y muestra el componente adecuado (`UserProfile`/`PostList`, `NotFoundCard` o `ErrorMessage`) según el `status` actual.

---

## 10. Supuestos

*   La API de JSONPlaceholder (`https://jsonplaceholder.typicode.com`) está disponible y responde de manera consistente.
*   Los IDs de usuario son números enteros positivos, con un rango típico de 1 a 10 para datos de prueba.
*   El entorno de ejecución del cliente es un navegador web moderno con soporte para JavaScript (ES6+), Fetch API, y características de React.
*   La conexión a internet del usuario es funcional para las operaciones de API.

---

## 11. Riesgos y Mitigaciones

| Riesgo                               | Mitigación                                                                                                                                                                             |
| :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Caída o Latencia de la API**         | Implementación de indicadores de carga (esqueletos). Manejo robusto de errores con mensajes claros y opción de reintentar. Timeout en peticiones (futura mejora).                        |
| **Regresiones por Refactorización**  | (¡MITIGACIÓN PENDIENTE!) Implementación urgente de una suite de pruebas unitarias y de integración para garantizar que los cambios no rompan la funcionalidad existente.                      |
| **Crecimiento de Complejidad del Estado** | Arquitectura modular con Redux Toolkit, `slices` bien definidos, y separación de lógica de negocio en servicios. Uso de `status` único para el ciclo de vida de la petición. |
| **Problemas de Rendimiento UI**        | Uso de `useCallback` y `useMemo` (si es necesario). Renderizado condicional para evitar trabajo innecesario. Optimización de imágenes.                                                 |
| **Dificultad de Mantenimiento**      | Adhesión a principios de Clean Architecture y Feature-Based Architecture. Código limpio, comentado, y convenciones de nombres consistentes.                                           |
| **Inconsistencia de Estilos**        | Uso de Tailwind CSS para un enfoque "utility-first". (Mitigación continua: estandarizar y eliminar CSS heredado).                                                                     |

---

## 12. Métricas Sugeridas

*   **Rendimiento:**
    *   **Tiempo de carga inicial (TTI):** Menos de 2 segundos.
    *   **Tiempo de respuesta de búsqueda (API + Renderizado):** Menos de 3 segundos.
    *   **Core Web Vitals:** Medir LCP, FID, CLS.
*   **Usabilidad (UX):**
    *   **Tasa de éxito de búsqueda:** Porcentaje de búsquedas que resultan en un perfil mostrado.
    *   **Tasa de clics en "Reintentar":** Indicar problemas recurrentes de API.
*   **Mantenibilidad:**
    *   **Cobertura de pruebas:** Apuntar a >80% para lógica crítica.
    *   **Complejidad ciclomática:** Mantener baja en funciones clave.
    *   **Número de bugs reportados:** Reducción post-refactorización.

---

## 13. APIs Utilizadas

*   **JSONPlaceholder (`https://jsonplaceholder.typicode.com`)**
    *   **Descripción:** Una API REST ficticia gratuita en línea que se utiliza para prototipos y pruebas. Proporciona datos de usuarios, publicaciones, comentarios, etc.
    *   **Endpoints clave utilizados:**
        *   `/users/{id}`: Para obtener los detalles de un usuario específico.
        *   `/users/{id}/posts`: Para obtener las publicaciones de un usuario específico.
    *   **Observación:** Se ha tenido en cuenta la peculiaridad de que JSONPlaceholder devuelve un `{}` vacío (estado HTTP 200 OK) para IDs de usuario no existentes, en lugar de un `404 Not Found`. Nuestro sistema ahora maneja tanto este caso como un `404` explícito.

---

## 14. Flujo de Estado (Redux Toolkit)

El estado global se gestiona con Redux Toolkit, centralizado en el `userSlice`.

### Estado Inicial (`initialState` del `userSlice`)

```javascript
{
    status: "idle", // "idle" | "loading" | "succeeded" | "failed" | "notFound"
    error: null,    // Almacena el mensaje de error si el status es "failed"
    user: null,     // Objeto de usuario si se encuentra, null si no
    posts: [],      // Array de posts del usuario
}
```

### Transiciones de Estado durante la Búsqueda

1.  **`idle` -> `loading`:**
    *   **Acción:** `fetchUserAndPosts.pending` (despachada al iniciar la búsqueda).
    *   **Efecto:** `status` cambia a `"loading"`, `error` se resetea a `null`.
2.  **`loading` -> `succeeded`:**
    *   **Acción:** `fetchUserAndPosts.fulfilled` (si el servicio devuelve un usuario válido).
    *   **Efecto:** `status` cambia a `"succeeded"`, `user` y `posts` se actualizan con los datos obtenidos.
3.  **`loading` -> `notFound`:**
    *   **Acción:** `fetchUserAndPosts.fulfilled` (si el servicio devuelve `user: null`, indicando que la API no encontró el usuario).
    *   **Acción:** `fetchUserAndPosts.rejected` (si el servicio lanza un error con `status: 404`).
    *   **Efecto:** `status` cambia a `"notFound"`, `user` se establece a `null`, `posts` a `[]`.
4.  **`loading` -> `failed`:**
    *   **Acción:** `fetchUserAndPosts.rejected` (si el servicio lanza un error diferente a 404, como un error de red o servidor 500).
    *   **Efecto:** `status` cambia a `"failed"`, `error` se actualiza con el mensaje del payload, `user` a `null`, `posts` a `[]`.

Esta máquina de estados finitos asegura que la UI siempre pueda reaccionar de forma predecible al estado actual de la operación de búsqueda.
