# 🚀 GeminiCLI Project (myprojectapi02)

¡Bienvenido al proyecto GeminiCLI, un ejemplo práctico de desarrollo frontend moderno con React! Este proyecto sirve como una base robusta para la búsqueda y visualización de perfiles de usuario y sus publicaciones asociadas, demostrando buenas prácticas de arquitectura y gestión de estado.

---

## 🌟 Introducción al Proyecto

Este proyecto es una aplicación web sencilla pero poderosa que permite buscar usuarios por ID (utilizando la API de JSONPlaceholder) y mostrar su perfil junto con sus publicaciones. Ha sido concebido como un lienzo para explorar y aplicar patrones de diseño modernos, optimizaciones de rendimiento y una arquitectura limpia en un entorno React.

## 🛠️ Tecnologías Utilizadas

*   **React 18:** La biblioteca líder para construir interfaces de usuario interactivas.
*   **Vite:** Un entorno de desarrollo frontend de próxima generación que proporciona una experiencia de desarrollo rapidísima.
*   **Redux Toolkit:** La forma recomendada de usar Redux, simplificando la gestión de estado con un enfoque en la inmutabilidad y la lógica asíncrona.
*   **Tailwind CSS:** Un framework CSS "utility-first" para construir diseños personalizados directamente en tu marcado.
*   **Heroicons:** Un conjunto de iconos SVG para React.
*   **@material-tailwind/react:** Una implementación de Material Design para React con componentes de Tailwind CSS.

## 🏛️ Arquitectura del Sistema

El proyecto sigue un enfoque de **arquitectura basada en características (Feature-Based Architecture)**, combinado con principios de **Clean Architecture** para una separación clara de responsabilidades.

*   **Capa de Presentación (UI):** Componentes React y páginas que interactúan con los hooks.
*   **Capa de Lógica de UI (Hooks):** Custom Hooks (`useUser`) que encapsulan la lógica específica de la vista y la interacción con el estado global (Redux).
*   **Capa de Gestión de Estado (Redux Toolkit):** `slices` de Redux que definen el estado de la aplicación, sus acciones y cómo responde a las operaciones asíncronas (`createAsyncThunk`).
*   **Capa de Servicios (Servicios de Dominio):** Módulos (`user-service.js`) que contienen la lógica de negocio compleja, orquestando llamadas a la API y transformando datos antes de que lleguen al estado de la aplicación.
*   **Capa de Acceso a Datos (API):** Módulos (`api.js`, `user.js`, `post.js`) que manejan la comunicación directa con los endpoints de la API, incluyendo la gestión de solicitudes y errores HTTP.

Esta estructura promueve la modularidad, la mantenibilidad y la escalabilidad, haciendo que cada parte del sistema sea más fácil de entender, probar y modificar de forma aislada.

## 📁 Estructura de Carpetas

La organización del proyecto refleja la arquitectura basada en características y la separación de responsabilidades:

```
myprojectapi02/
├── public/                 # Archivos estáticos
├── src/
│   ├── api/                # Lógica base para interactuar con APIs externas
│   │   ├── api.js          # Cliente HTTP genérico y manejo de errores base
│   │   ├── post.js         # Funciones específicas para la API de posts
│   │   └── user.js         # Funciones específicas para la API de usuarios
│   ├── assets/             # Recursos estáticos de la aplicación (imágenes, etc.)
│   ├── components/         # Componentes UI reutilizables y atómicos
│   │   ├── layout/         # Componentes de layout principal
│   │   ├── skeletons/      # Componentes de carga (placeholders)
│   │   └── ...             # Otros componentes (UserProfile, PostList, ErrorMessage, NotFoundCard)
│   ├── features/           # Agrupación por funcionalidad (features)
│   │   └── UserSearch/     # Característica completa de búsqueda de usuario
│   │       └── UserSearchPage.jsx # Página principal de la característica
│   ├── hooks/              # Custom Hooks para lógica reutilizable y encapsulada
│   │   └── useUser.js      # Hook para la lógica de búsqueda y gestión de usuario
│   ├── redux/              # Gestión de estado global con Redux Toolkit
│   │   ├── slices/         # Slices individuales de Redux (userSlice)
│   │   └── store.js        # Configuración del store de Redux
│   ├── services/           # Lógica de negocio y orquestación de llamadas API
│   │   └── user-service.js # Servicio para obtener perfiles de usuario completos
│   ├── App.jsx             # Componente principal de la aplicación
│   ├── index.css           # Estilos globales (Tailwind CSS)
│   ├── main.jsx            # Punto de entrada de la aplicación
│   └── ...
└── ...
```

## 🚀 Cómo Instalar, Levantar y Construir

Sigue estos pasos para poner en marcha el proyecto en tu máquina local:

### Requisitos

*   Node.js (versión 14 o superior)
*   pnpm (o npm/yarn)

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone [URL_DEL_REPOSITORIO]
    cd myprojectapi02
    ```
2.  Instala las dependencias usando pnpm:
    ```bash
    pnpm install
    ```
    (Si prefieres npm o yarn, usa `npm install` o `yarn install` respectivamente)

### Ejecutar en Modo Desarrollo

Para iniciar la aplicación en modo desarrollo con Vite:

```bash
pnpm run dev
```

La aplicación estará disponible en `http://localhost:5173/` (o un puerto similar).

### Construir para Producción

Para generar una versión optimizada para producción:

```bash
pnpm run build
```

Los archivos de producción se generarán en la carpeta `dist/`.

## 💡 Explicación Funcional del Proyecto

La aplicación permite al usuario introducir un `ID de Usuario` (del 1 al 10, ya que estamos usando JSONPlaceholder) en un campo de entrada. Al hacer clic en "Buscar", la aplicación realiza una solicitud a la API para obtener los datos del usuario y sus publicaciones.

*   Mientras se carga, se muestran esqueletos de carga.
*   Si se encuentra el usuario, se muestra su perfil y una lista de sus posts.
*   Si el usuario no existe (ya sea por un 404 o por una respuesta vacía de la API), se muestra una tarjeta indicando "Usuario No Encontrado".
*   Si ocurre un error de red o de servidor, se muestra un mensaje de error y un botón para reintentar.

## 🧩 Detalle de Módulos Clave

*   **`UserSearchPage.jsx` (src/features/UserSearch):**
    La página principal donde ocurre la interacción. Es un componente "tonto" que se encarga de renderizar la UI y delegar la lógica al custom hook `useUser`.
*   **`useUser.js` (src/hooks):**
    Un custom hook inteligente que encapsula toda la lógica de la característica `UserSearch`. Se conecta al store de Redux para despachar acciones y seleccionar el estado relevante (`user`, `posts`, `status`, `error`).
*   **`userSlice.js` (src/redux/slices):**
    El corazón de la gestión de estado para los datos del usuario y sus posts. Define el `initialState`, las acciones asíncronas (`fetchUserAndPosts`) y cómo el estado muta en respuesta a estas acciones (pending, fulfilled, rejected).
*   **`user-service.js` (src/services):**
    Un nuevo servicio introducido para orquestar la lógica de negocio de "obtener el perfil completo de un usuario". Este servicio es el que sabe cómo combinar las llamadas a `getUser` y `getPostsByUser` para construir el perfil completo.

## 🌍 Ejemplos de Uso

1.  **Buscar Usuario Existente:**
    *   Introduce `1` en el campo y haz clic en "Buscar". Verás el perfil del "Leanne Graham" y sus posts.
2.  **Buscar Usuario No Existente:**
    *   Introduce `99` (o cualquier ID fuera del rango 1-10) y haz clic en "Buscar". Verás la tarjeta de "Usuario No Encontrado".
3.  **Simular Error de Red:**
    *   Desactiva tu conexión a internet o usa las herramientas de desarrollador para simular "Offline" y luego busca un ID. Verás el mensaje de error general.

## 🎨 Principales Decisiones de Diseño

*   **Single Source of Truth para el Estado:** Redux es el contenedor centralizado para el estado de la aplicación, facilitando la depuración y la gestión de datos complejos.
*   **Separación de Responsabilidades (SoC):** Cada parte del código tiene una única responsabilidad bien definida (UI, lógica, estado, acceso a datos), lo que mejora la mantenibilidad.
*   **Desarrollo Basado en Características:** La agrupación de componentes, hooks y lógica por características (`UserSearch`) facilita la escalabilidad y la comprensión del proyecto.
*   **Manejo de Errores Robusto y Específico:** Implementación de un flujo de errores detallado que diferencia entre "no encontrado" y "error general", mejorando la UX.

## ✅ Buenas Prácticas Aplicadas

*   **Inmutabilidad en Redux:** Todas las actualizaciones de estado en Redux se realizan de forma inmutable, garantizando la previsibilidad.
*   **Thunks Asíncronos:** Uso de `createAsyncThunk` para gestionar efectos secundarios y operaciones asíncronas de manera limpia.
*   **Custom Hooks Reutilizables:** Encapsulación de lógica compleja de la UI en `useUser` para una mejor reusabilidad y limpieza de los componentes.
*   **Carga Optimista (Skeletons):** Uso de esqueletos de carga para mejorar la percepción de rendimiento durante las esperas de la API.
*   **Modularización de API:** El cliente API se divide en funciones específicas para `user` y `post`, y un cliente base genérico.

## ♻️ Comparación Antes/Después del Refactor

Hemos realizado mejoras significativas en dos áreas clave:

### 1. Manejo de Errores "Usuario No Encontrado"

*   **Antes:**
    *   La API de JSONPlaceholder devolvía un objeto vacío (`{}`) para IDs no existentes, pero no un `404`. La lógica para detectar esto y mostrar `NotFoundCard` estaba en el componente `UserSearchPage.jsx`.
    *   Si la API fallaba por otras razones (ej. error de servidor, red), se lanzaba un error genérico desde `api.js` y el `userSlice` lo trataba como un error `failed` sin distinción.
    *   El estado global usaba `isLoading: boolean` y `error: string | null`, lo que requería múltiples `if` para determinar el estado actual de la UI.

*   **Después:**
    *   **`api.js`:** Ahora, cuando una respuesta HTTP no es `ok`, lanza un objeto de error enriquecido que incluye el `status` (ej. `{ message: "...", status: 404 }`).
    *   **`userSlice.js`:**
        *   El estado inicial ahora usa un único campo `status: 'idle' | 'loading' | 'succeeded' | 'failed' | 'notFound'`.
        *   El `thunk` (`fetchUserAndPosts`) y sus `extraReducers` (`fulfilled`, `rejected`) están centralizados para decidir el `status` final:
            *   Si el servicio devuelve `user: null` (respuesta de API vacía), `status` se establece a `notFound`.
            *   Si el `thunk` es rechazado y el error contiene `status: 404`, `status` también se establece a `notFound`.
            *   Otros errores siguen estableciendo `status` a `failed`.
    *   **`useUser.js`:** Se actualizó para seleccionar y devolver el nuevo campo `status`.
    *   **`UserSearchPage.jsx`:** La lógica de renderizado se simplificó, utilizando `status` directamente para mostrar esqueletos, mensajes de error, el perfil o la tarjeta de "no encontrado".

**Beneficio:** La aplicación ahora es más inteligente y robusta. Puede distinguir un "usuario no encontrado" de otros tipos de errores, ofreciendo una experiencia de usuario más clara y una gestión de estado más limpia y predecible.

### 2. Orquestación de Llamadas API (Capa de Servicios)

*   **Antes:**
    *   La lógica para combinar la obtención de datos de usuario y sus posts (`Promise.all`) residía directamente dentro del `createAsyncThunk` en `userSlice.js`. Esto mezclaba la lógica de negocio con la gestión de estado de Redux.

*   **Después:**
    *   Se creó un nuevo archivo de servicio: **`src/services/user-service.js`**.
    *   Este servicio ahora contiene la función `fetchUserProfile`, que encapsula la lógica de `Promise.all` para llamar a `getUser` y `getPostsByUser`, y la lógica para detectar el usuario vacío.
    *   El `createAsyncThunk` en `userSlice.js` se simplificó, ahora solo llama a `fetchUserProfile` del servicio.

**Beneficio:** Mejora la separación de responsabilidades. Redux se encarga de la gestión del estado, mientras que la lógica de negocio (cómo obtener un "perfil completo") vive en una capa de servicio dedicada. Esto hace que el código sea más modular, fácil de probar y más mantenible a medida que el proyecto crece.

---

## 🗺️ TODOs y Roadmap de Mejoras

Este proyecto tiene una base sólida, pero siempre hay espacio para crecer:

*   **Introducir Pruebas Unitarias/Integración:** (¡CRÍTICO!) Implementar Jest/Vitest y React Testing Library para componentes, hooks, slices y servicios.
*   **Migración a TypeScript:** (Moderado) Convertir el proyecto a TypeScript para añadir tipado estático, mejorar la robustez y la experiencia de desarrollo.
*   **Consolidar Estilos:** (Estético) Refactorizar `index.css` y `App.css` para utilizar exclusivamente utilidades de Tailwind CSS, eliminando CSS personalizado redundante.
*   **Paginación/Infinite Scroll:** Implementar paginación o carga infinita para la lista de posts del usuario.
*   **Autenticación de Usuarios:** Añadir un sistema de login/registro y gestión de usuarios.
*   **Gestión Global de Temas:** Mejorar el `ThemeToggleButton` para una gestión más robusta de temas claro/oscuro.

¡Gracias por revisar este proyecto! Si tienes alguna pregunta o sugerencia, no dudes en compartirla.