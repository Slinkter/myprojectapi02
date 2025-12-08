# 🧑‍🏫 Tutorial Completo: Construyendo una Aplicación React de Búsqueda de Usuarios

¡Bienvenido a este tutorial detallado donde aprenderemos a construir una aplicación React moderna desde cero! Nos centraremos en buenas prácticas, gestión de estado con Redux Toolkit, diseño de componentes, y cómo interactuar con una API externa.

---

## 🎯 Objetivo del Tutorial

Al final de este tutorial, habrás construido una aplicación web que permite:
*   Buscar perfiles de usuario por ID.
*   Mostrar los detalles del usuario y sus publicaciones.
*   Manejar estados de carga, éxito, error y "no encontrado" de forma elegante.
*   Entender una arquitectura modular y escalable.

---

## 🛠️ Herramientas y Requisitos

Asegúrate de tener instalado lo siguiente:

*   **Node.js (LTS recomendado):** Para ejecutar JavaScript fuera del navegador.
*   **pnpm (recomendado):** Un gestor de paquetes rápido y eficiente. Puedes usar `npm` o `yarn` si lo prefieres.
*   **Visual Studio Code (o tu editor de código favorito):** Con extensiones para React, Tailwind CSS, etc.

---

## 🚀 0. Configuración Inicial del Proyecto (Vite)

Comenzaremos creando un nuevo proyecto de React usando Vite, que es súper rápido.

1.  **Crea el Proyecto:**
    ```bash
    pnpm create vite my-user-search-app --template react
    cd my-user-search-app
    ```

2.  **Instala Dependencias:**
    ```bash
    pnpm install
    ```

3.  **Configura Tailwind CSS:**
    Vite y Tailwind se llevan de maravilla.
    ```bash
    pnpm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```
    Modifica `tailwind.config.js`:
    ```javascript
    // tailwind.config.js
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        // Añade también la configuración para @material-tailwind/react si lo usarás
        "path/to/node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
        "path/to/node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    };
    ```
    Añade las directivas de Tailwind en `src/index.css`:
    ```css
    /* src/index.css */
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
    Borra el contenido de `src/App.css` para empezar limpio (o simplemente déjalo vacío).

4.  **Instala React Router DOM (para futuras rutas):**
    ```bash
    pnpm add react-router-dom
    ```

5.  **Instala Redux Toolkit y React-Redux:**
    ```bash
    pnpm add @reduxjs/toolkit react-redux
    ```

6.  **Instala @material-tailwind/react y Heroicons:**
    ```bash
    pnpm add @material-tailwind/react @heroicons/react
    ```
    Añade el `ThemeProvider` en `src/main.jsx`:
    ```jsx
    // src/main.jsx
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App.jsx';
    import './index.css';
    import { ThemeProvider } from "@material-tailwind/react"; // <-- Importa
    
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <ThemeProvider> {/* <-- Envuelve tu App con ThemeProvider */}
          <App />
        </ThemeProvider>
      </React.StrictMode>,
    );
    ```

¡Listo! Ya tienes la base de tu proyecto.

---

## 🏗️ 1. Estructura de Carpetas

Organizaremos nuestro proyecto para que sea modular y fácil de mantener. Crea las siguientes carpetas dentro de `src/`:

```
src/
├── api/             # Funciones para interactuar con la API
├── assets/          # Recursos estáticos (imágenes, iconos)
├── components/      # Componentes UI reutilizables
│   └── skeletons/   # Componentes para estados de carga
├── features/        # Módulos completos con su lógica y UI
│   └── UserSearch/  # Característica de búsqueda de usuario
├── hooks/           # Custom React Hooks
├── redux/           # Configuración de Redux
│   └── slices/      # Slices de Redux (un slice por característica/entidad)
├── services/        # Lógica de negocio y orquestación de API
├── App.jsx
├── main.jsx
└── index.css
```

---

## 📡 2. Capa de Acceso a Datos (API)

Primero, crearemos las funciones que se comunicarán directamente con la API de JSONPlaceholder.

### `src/api/api.js` (Cliente HTTP Base)

Este archivo contendrá una función genérica para hacer peticiones, incluyendo un manejo robusto de errores que propaga el código de estado HTTP.

```javascript
// src/api/api.js
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

/**
 * Función genérica para hacer peticiones a la API.
 * @param {string} endpoint - El endpoint específico (ej. 'users/1').
 * @throws {object} Lanza un objeto con `message` y `status` si la respuesta no es OK.
 * @returns {Promise<any>} Promesa que resuelve con los datos JSON.
 */
export const fetchFromApi = async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
        const errorResponse = await response.json().catch(() => null);
        const message =
            errorResponse?.message ||
            response.statusText ||
            `HTTP error ${response.status}`;

        throw { message, status: response.status }; // Propagamos el status
    }
    return response.json();
};
```
**Explicación:** `fetchFromApi` es nuestro caballo de batalla. Cualquier error de red o de servidor (`!response.ok`) será atrapado y relanzado como un objeto con un `message` y el `status` HTTP. Esto es crucial para manejar errores específicos, como el `404`.

### `src/api/user.js` (Funciones de Usuario)

```javascript
// src/api/user.js
import { fetchFromApi } from "./api";

/**
 * Obtiene los detalles de un usuario por su ID.
 * @param {number} userId - El ID del usuario.
 * @returns {Promise<object>} El objeto usuario.
 */
export const getUser = (userId) => fetchFromApi(`users/${userId}`);
```

### `src/api/post.js` (Funciones de Posts)

```javascript
// src/api/post.js
import { fetchFromApi } from "./api";

/**
 * Obtiene los posts de un usuario específico.
 * @param {number} userId - El ID del usuario.
 * @returns {Promise<Array>} Un array de objetos post.
 */
export const getPostsByUser = (userId) => fetchFromApi(`users/${userId}/posts`);
```

---

## 🤝 3. Capa de Servicios (Orquestación de Lógica de Negocio)

Esta capa es clave para la "Clean Architecture". Aquí combinamos las llamadas API para formar una unidad lógica de negocio.

### `src/services/user-service.js`

```javascript
// src/services/user-service.js
import { getUser } from "../api/user";
import { getPostsByUser } from "../api/post";

/**
 * Orquesta las llamadas a la API para obtener el perfil completo de un usuario,
 * incluyendo sus datos personales y sus publicaciones.
 *
 * @param {number} userId El ID del usuario a buscar.
 * @returns {Promise<{user: object, posts: Array}>} Un objeto que contiene los datos del usuario y su lista de posts.
 */
export const fetchUserProfile = async (userId) => {
    // Se ejecutan ambas promesas en paralelo para mayor eficiencia.
    const [user, posts] = await Promise.all([
        getUser(userId),
        getPostsByUser(userId),
    ]);

    // JSONPlaceholder devuelve {} para IDs no existentes.
    // Lo transformamos a null para un manejo consistente.
    if (user && Object.keys(user).length === 0) {
        return { user: null, posts: [] };
    }

    return { user, posts };
};
```
**Explicación:** `fetchUserProfile` es nuestro "chef" que sabe cómo montar un "perfil completo". Llama a `getUser` y `getPostsByUser` en paralelo para ser eficiente. Es importante la comprobación `if (user && Object.keys(user).length === 0)`: JSONPlaceholder no devuelve 404 para usuarios inexistentes, sino un objeto vacío. Aquí lo convertimos a `null` para que nuestro sistema lo entienda como "no encontrado".

---

## 🍎 4. Gestión de Estado con Redux Toolkit

Redux Toolkit simplifica la gestión del estado global.

### `src/redux/slices/userSlice.js` (Slice de Usuario)

Este slice manejará el estado relacionado con el usuario buscado y sus posts, incluyendo los estados de carga, éxito, error y "no encontrado".

```javascript
// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserProfile } from "../../services/user-service"; // Importamos nuestro servicio

// **createAsyncThunk:** Para manejar operaciones asíncronas
export const fetchUserAndPosts = createAsyncThunk(
    "user/fetchUserAndPosts", // Tipo de acción
    async (userId, { rejectWithValue }) => {
        try {
            // El thunk ahora solo llama al servicio, que contiene la lógica de negocio.
            const data = await fetchUserProfile(userId);
            return data;
        } catch (error) {
            // Si el servicio/API lanza un error con status (como nuestro 404),
            // lo pasamos al reducer a través de rejectWithValue.
            if (error.status) {
                return rejectWithValue({
                    message: error.message,
                    status: error.status,
                });
            }
            // Para errores genéricos sin status específico.
            return rejectWithValue({ message: error.message, status: null });
        }
    }
);

// **createSlice:** Define el estado, los reducers y las acciones
const userSlice = createSlice({
    name: "user",
    initialState: {
        status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed' | 'notFound'
        error: null,    // Almacena el mensaje de error
        user: null,     // Objeto de usuario
        posts: [],      // Array de posts
    },
    reducers: {
        // Aquí irían otros reducers síncronos si fueran necesarios
    },
    extraReducers: (builder) => {
        builder
            // Cuando la petición está pendiente
            .addCase(fetchUserAndPosts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            // Cuando la petición se cumple (éxito)
            .addCase(fetchUserAndPosts.fulfilled, (state, action) => {
                // Si el servicio devolvió un usuario nulo, es un caso de 'no encontrado'.
                if (action.payload.user === null) {
                    state.status = "notFound";
                    state.user = null;
                    state.posts = [];
                } else {
                    state.status = "succeeded";
                    state.user = action.payload.user;
                    state.posts = action.payload.posts;
                }
            })
            // Cuando la petición es rechazada (error)
            .addCase(fetchUserAndPosts.rejected, (state, action) => {
                // Si la API devolvió un 404, también es un caso de 'no encontrado'.
                if (action.payload?.status === 404) {
                    state.status = "notFound";
                    state.error = `Usuario no encontrado (Error ${action.payload.status})`;
                } else {
                    state.status = "failed";
                    state.error = action.payload?.message || "Error desconocido";
                }
                state.user = null;
                state.posts = [];
            });
    },
});

export default userSlice.reducer;
```
**Explicación:** Este slice es el cerebro de nuestro estado.
*   `createAsyncThunk` es cómo Redux maneja las operaciones asíncronas. Llama a nuestro `user-service`.
*   El `initialState` es crucial: el campo `status` es una máquina de estados que nos dice exactamente qué está pasando (`idle`, `loading`, `succeeded`, `failed`, `notFound`).
*   `extraReducers` son los manejadores para las diferentes fases de nuestra promesa asíncrona (`pending`, `fulfilled`, `rejected`). Aquí es donde actualizamos `status` y los datos del `user` y `posts`.
    *   Fíjate cómo manejamos el `status: "notFound"` tanto si el servicio devuelve un usuario `null` como si el error HTTP es un `404`. ¡Esto hace que nuestra app sea súper robusta!

### `src/redux/store.js` (Configuración del Store)

```javascript
// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer, // Registramos nuestro slice de usuario
    },
});
```

### `src/main.jsx` (Proveer el Store)

En `src/main.jsx`, envuelve tu componente `<App />` con el `<Provider>` de `react-redux` para que todos los componentes tengan acceso al store:

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux"; // <-- Importa Provider
import { store } from "./redux/store";   // <-- Importa tu store
import { BrowserRouter } from 'react-router-dom'; // Para rutas

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* <-- Envuelve con Provider */}
      <ThemeProvider>
        <BrowserRouter> {/* <-- Envuelve con BrowserRouter para rutas */}
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
```

---

## 🎣 5. Custom Hook: `useUser.js`

Este hook es el intermediario entre nuestros componentes de UI y el store de Redux. Encapsula la lógica de cómo interactuar con el estado global.

### `src/hooks/useUser.js`

```javascript
// src/hooks/useUser.js
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAndPosts } from "../redux/slices/userSlice";

/**
 * Custom hook para gestionar la búsqueda y el estado del usuario.
 * @param {number} initialUserId - ID inicial para la búsqueda al montar el componente.
 * @returns {object} Objeto con el estado y las funciones para la UI.
 */
export const useUser = (initialUserId = 1) => {
    const [inputValue, setInputValue] = useState(initialUserId.toString());
    const [searchId, setSearchId] = useState(null);

    // Seleccionamos solo las partes del estado que nos interesan
    const { user, posts, status, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // Efecto para la búsqueda inicial
    useEffect(() => {
        if (initialUserId) {
            dispatch(fetchUserAndPosts(initialUserId));
            setSearchId(initialUserId.toString());
        }
    }, [dispatch, initialUserId]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        // Validación simple para IDs entre 1 y 10 (o vacío)
        if (/^$|^[1-9]$|^10$/.test(value)) {
            setInputValue(value);
        }
    };

    const handleSearch = useCallback(() => {
        if (inputValue) {
            setSearchId(inputValue);
            dispatch(fetchUserAndPosts(Number(inputValue)));
        }
    }, [dispatch, inputValue]);

    const handleRetry = useCallback(() => {
        if (searchId) {
            dispatch(fetchUserAndPosts(Number(searchId)));
        }
    }, [dispatch, searchId]);

    return {
        user,
        posts,
        status, // Devolvemos el status directamente
        error,
        inputValue,
        searchId,
        handleInputChange,
        handleSearch,
        handleRetry,
    };
};
```
**Explicación:** `useUser` esconde la complejidad de Redux de nuestros componentes. Ellos solo necesitan llamar a `handleSearch` y leer `user`, `posts`, `status` y `error`. `status` es muy importante aquí porque nos dirá qué renderizar.

---

## 🎨 6. Componentes de UI (La Interfaz Gráfica)

Crearemos los componentes que mostrarán la información y permitirán la interacción.

### `src/components/layout/MainLayout.jsx` (Layout Básico)

```jsx
// src/components/layout/MainLayout.jsx
import React from 'react';
import ThemeToggleButton from '../ThemeToggleButton'; // <-- Importa
import { Typography } from '@material-tailwind/react';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <header className="container mx-auto p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-700">
        <Typography variant="h5" color="blue-gray" className="dark:text-white">
          Mi App React
        </Typography>
        <ThemeToggleButton />
      </header>
      <main className="container mx-auto p-4 py-8">
        {children}
      </main>
      <footer className="container mx-auto p-4 text-center text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 mt-8">
        © {new Date().getFullYear()} Mi App React. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default MainLayout;
```

### `src/components/ThemeToggleButton.jsx` (Botón de Tema Oscuro/Claro)

```jsx
// src/components/ThemeToggleButton.jsx
import React, { useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const ThemeToggleButton = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setTheme('light');
    }
  };

  return (
    <Button variant="outlined" color="blue-gray" onClick={toggleTheme} className="p-2 rounded-full">
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5 text-yellow-500" />
      ) : (
        <MoonIcon className="h-5 w-5 text-blue-gray-800" />
      )}
    </Button>
  );
};

export default ThemeToggleButton;
```

### `src/components/UserProfile.jsx` (Tarjeta de Perfil de Usuario)

```jsx
// src/components/UserProfile.jsx
import React from 'react';
import { Card, CardHeader, CardBody, Typography, Avatar } from "@material-tailwind/react";

const UserProfile = ({ user }) => {
  if (!user) return null;

  return (
    <Card className="w-full max-w-[24rem] shadow-lg mx-auto mb-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <CardHeader floated={false} className="h-40 bg-blue-500 dark:bg-blue-700 grid place-items-center">
        <Avatar src={`https://i.pravatar.cc/150?u=${user.id}`} alt="avatar" size="xl" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2 dark:text-white">
          {user.name}
        </Typography>
        <Typography color="blue-gray" className="font-medium dark:text-gray-300" textGradient>
          @{user.username}
        </Typography>
        <Typography color="gray" className="mt-2 font-normal dark:text-gray-400">
          Email: {user.email}
        </Typography>
        <Typography color="gray" className="font-normal dark:text-gray-400">
          Teléfono: {user.phone}
        </Typography>
        <Typography color="gray" className="font-normal dark:text-gray-400">
          Website: {user.website}
        </Typography>
        <Typography color="gray" className="font-normal dark:text-gray-400">
          Compañía: {user.company.name}
        </Typography>
        <Typography color="gray" className="font-normal dark:text-gray-400">
          Ciudad: {user.address.city}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default UserProfile;
```

### `src/components/PostList.jsx` (Lista de Publicaciones)

```jsx
// src/components/PostList.jsx
import React from 'react';
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";

const PostList = ({ posts }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <Card className="w-full shadow-lg p-4 mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <CardHeader variant="h5" color="blue-gray" className="mb-4 text-center dark:text-white">
        Publicaciones
      </CardHeader>
      <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
            <Typography variant="h6" color="blue-gray" className="mb-2 dark:text-white">
              {post.title}
            </Typography>
            <Typography color="gray" className="font-normal text-sm dark:text-gray-300">
              {post.body}
            </Typography>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default PostList;
```

### `src/components/ErrorMessage.jsx` (Mensaje de Error Genérico)

```jsx
// src/components/ErrorMessage.jsx
import React from 'react';
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <Card className="w-full max-w-[24rem] shadow-lg mx-auto mb-6 bg-red-50 dark:bg-red-900 text-red-900 dark:text-red-100 border border-red-200 dark:border-red-700">
      <CardBody className="text-center flex flex-col items-center">
        <ExclamationCircleIcon className="h-12 w-12 text-red-500 mb-4" />
        <Typography variant="h5" color="red" className="mb-2 dark:text-red-300">
          ¡Oops! Algo salió mal.
        </Typography>
        <Typography color="gray" className="font-normal mb-4 dark:text-red-200">
          {message || "Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo."}
        </Typography>
        {onRetry && (
          <Button onClick={onRetry} color="red" className="dark:bg-red-700 dark:hover:bg-red-600">
            Reintentar
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default ErrorMessage;
```

### `src/components/NotFoundCard.jsx` (Tarjeta de "No Encontrado")

```jsx
// src/components/NotFoundCard.jsx
import React from 'react';
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

const NotFoundCard = ({ numberId }) => {
  return (
    <Card className="w-full max-w-[24rem] shadow-lg mx-auto mb-6 bg-yellow-50 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 border border-yellow-200 dark:border-yellow-700">
      <CardBody className="text-center flex flex-col items-center">
        <QuestionMarkCircleIcon className="h-12 w-12 text-yellow-500 mb-4" />
        <Typography variant="h5" color="blue-gray" className="mb-2 dark:text-yellow-300">
          Usuario No Encontrado
        </Typography>
        <Typography color="gray" className="font-normal dark:text-yellow-200">
          Lo sentimos, no pudimos encontrar un usuario con el ID: **{numberId}**.
        </Typography>
        <Typography color="gray" className="font-normal dark:text-yellow-200">
          Por favor, verifica el ID e inténtalo de nuevo.
        </Typography>
      </CardBody>
    </Card>
  );
};

export default NotFoundCard;
```

### `src/components/skeletons/ProfileSkeleton.jsx` (Esqueleto de Perfil)

```jsx
// src/components/skeletons/ProfileSkeleton.jsx
import React from 'react';
import { Card, CardHeader, CardBody } from "@material-tailwind/react";

const ProfileSkeleton = () => {
  return (
    <Card className="w-full max-w-[24rem] shadow-lg mx-auto mb-6 animate-pulse bg-white dark:bg-gray-800">
      <CardHeader floated={false} className="h-40 bg-gray-300 dark:bg-gray-700 grid place-items-center">
        <div className="rounded-full bg-gray-400 dark:bg-gray-600 h-24 w-24"></div>
      </CardHeader>
      <CardBody className="text-center">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mx-auto mb-4"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-2/3 mx-auto mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/3 mx-auto mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-2/3 mx-auto mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mx-auto"></div>
      </CardBody>
    </Card>
  );
};

export default ProfileSkeleton;
```

### `src/components/skeletons/PostListSkeleton.jsx` (Esqueleto de Lista de Posts)

```jsx
// src/components/skeletons/PostListSkeleton.jsx
import React from 'react';
import { Card, CardHeader, CardBody } from "@material-tailwind/react";

const PostListSkeleton = () => {
  return (
    <Card className="w-full shadow-lg p-4 mx-auto animate-pulse bg-white dark:bg-gray-800">
      <CardHeader variant="h5" color="blue-gray" className="mb-4 text-center dark:text-white">
        Publicaciones
      </CardHeader>
      <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-500 rounded w-5/6 mb-1"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-500 rounded w-4/6"></div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default PostListSkeleton;
```

### `src/App.jsx` (Componente Principal de la Aplicación)

```jsx
// src/App.jsx
import React from 'react';
import MainLayout from './components/layout/MainLayout';
import { Route, Routes } from 'react-router-dom';
import UserSearchPage from './features/UserSearch/UserSearchPage';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<UserSearchPage />} />
        {/* Aquí puedes añadir más rutas si las necesitas en el futuro */}
      </Routes>
    </MainLayout>
  );
}

export default App;
```

---

## 🌎 7. Conexión de Rutas (`App.jsx` y `main.jsx`)

Para manejar la navegación, usamos `react-router-dom`. Aunque nuestra app solo tiene una vista principal, es una buena práctica configurarlo desde el principio.

1.  **En `src/main.jsx`:** Asegúrate de envolver `<App />` con `<BrowserRouter>`. (Ya lo hicimos en el paso 4).
2.  **En `src/App.jsx`:** Define tus rutas usando `<Routes>` y `<Route>`.

```jsx
// src/App.jsx (Ejemplo de cómo conectar rutas)
import React from 'react';
import MainLayout from './components/layout/MainLayout';
import { Route, Routes } from 'react-router-dom';
import UserSearchPage from './features/UserSearch/UserSearchPage';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<UserSearchPage />} />
        {/* <Route path="/about" element={<AboutPage />} /> */}
      </Routes>
    </MainLayout>
  );
}

export default App;
```
**Explicación:** `BrowserRouter` habilita el enrutamiento en la aplicación. `Routes` es un contenedor para todas las rutas individuales, y cada `Route` mapea una `path` a un `element` (tu componente de página).

---

## 🔎 8. La Feature de Búsqueda de Usuario (`UserSearchPage.jsx`)

Esta es la página que lo une todo. Utiliza el `useUser` hook para obtener el estado y las funciones, y renderiza condicionalmente los diferentes componentes.

### `src/features/UserSearch/UserSearchPage.jsx`

```jsx
// src/features/UserSearch/UserSearchPage.jsx
import { Input, Button, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import UserProfile from "../../components/UserProfile";
import PostList from "../../components/PostList";
import ErrorMessage from "../../components/ErrorMessage";
import NotFoundCard from "../../components/NotFoundCard";
import ProfileSkeleton from "../../components/skeletons/ProfileSkeleton";
import PostListSkeleton from "../../components/skeletons/PostListSkeleton";
import { useUser } from "../../hooks/useUser";

function UserSearchPage() {
    // Usamos nuestro custom hook para acceder a la lógica y el estado
    const {
        user,
        posts,
        status, // Aquí recibimos el status
        error,
        searchId,
        inputValue,
        handleInputChange,
        handleSearch,
        handleRetry,
    } = useUser(1); // El 1 es el ID inicial para la búsqueda al cargar

    // Derivamos si está cargando para deshabilitar el botón
    const isLoading = status === "loading";

    return (
        <div className="user-search">
            <Typography
                variant="h3"
                color="blue-gray"
                className="user-search__title dark:text-white"
            >
                Buscar Perfil de Usuario por ID
            </Typography>
            <div className="search-form flex w-full max-w-screen-md items-center gap-2 mx-auto mb-8">
                <Input
                    type="number"
                    label="ID de Usuario (1-10)"
                    value={inputValue}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    className="dark:text-white"
                    labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                />
                <Button
                    onClick={handleSearch}
                    className="search-form__button flex items-center gap-2"
                    disabled={!inputValue || isLoading}
                >
                    {isLoading ? (
                        "Buscando..."
                    ) : (
                        <>
                            <MagnifyingGlassIcon className="h-5 w-5" />
                            Buscar
                        </>
                    )}
                </Button>
            </div>

            {/* Renderizado Condicional basado en el 'status' */}
            {status === "loading" && (
                <div className="results-wrapper flex flex-col md:flex-row gap-6 justify-center items-start">
                    <ProfileSkeleton />
                    <PostListSkeleton />
                </div>
            )}

            {status === "failed" && (
                <ErrorMessage message={error} onRetry={handleRetry} />
            )}

            {status === "succeeded" && user && (
                <div className="results-wrapper flex flex-col md:flex-row gap-6 justify-center items-start">
                    <UserProfile user={user} />
                    {posts.length > 0 ? (
                        <PostList posts={posts} />
                    ) : (
                        <Typography className="no-posts__text dark:text-gray-400">
                            Este usuario aún no tiene publicaciones.
                        </Typography>
                    )}
                </div>
            )}

            {status === "notFound" && <NotFoundCard numberId={searchId} />}
        </div>
    );
}

export default UserSearchPage;
```
**Explicación:** Este componente es un gran ejemplo de cómo usar el estado `status`.
*   Obtiene `user`, `posts`, `status` y `error` de `useUser()`.
*   El botón de búsqueda se deshabilita si `isLoading` (derivado de `status === "loading"`).
*   La sección de resultados tiene lógica condicional muy clara:
    *   Si `status === "loading"`, muestra los esqueletos.
    *   Si `status === "failed"`, muestra el `ErrorMessage`.
    *   Si `status === "succeeded"` Y `user` existe, muestra `UserProfile` y `PostList`.
    *   Si `status === "notFound"`, muestra el `NotFoundCard`.
¡Sencillo y efectivo!

---

## 💡 9. Buenas Prácticas Aplicadas y Optimizaciones

Durante la construcción de esta aplicación, hemos aplicado varias buenas prácticas y optimizaciones:

*   **Separación de Responsabilidades:** Cada archivo y carpeta tiene un propósito claro. UI, lógica de negocio, estado y acceso a datos viven en sus propias capas.
*   **Gestión de Estado Centralizada:** Redux Toolkit proporciona un único punto de verdad para el estado de la aplicación, facilitando el seguimiento y la depuración.
*   **Inmutabilidad del Estado:** Las actualizaciones de estado en Redux siempre crean nuevas copias del estado, evitando mutaciones directas y efectos secundarios inesperados.
*   **Custom Hooks:** Abstracción de lógica de UI compleja y reutilizable (ej. `useUser`), manteniendo los componentes limpios y enfocados en la renderización.
*   **Fetching Paralelo de Datos:** Uso de `Promise.all` en `user-service.js` para realizar múltiples peticiones API de forma concurrente, mejorando la velocidad de carga.
*   **Manejo de Errores Específico:** La propagación del código de estado HTTP y la máquina de estados en el `userSlice` permiten diferenciar entre distintos tipos de errores (ej. 404 vs. 500) y reaccionar de manera adecuada en la UI.
*   **Indicadores de Carga (Skeletons):** Mejoran la percepción del rendimiento del usuario mientras se esperan los datos.
*   **Derivación de Estado:** En lugar de múltiples booleanos (`isLoading`, `isError`), usamos un único campo `status` en Redux, que simplifica la lógica en los componentes.
*   **Memoización (`useCallback`):** Utilizado en `useUser` para funciones (`handleSearch`, `handleRetry`) que se pasan a componentes hijos, evitando renderizados innecesarios.

---

## 🐛 10. Errores Comunes y Cómo Evitarlos

*   **Olvidar `Provider` de Redux:** Si tus componentes no pueden acceder al store, asegúrate de que `<App />` esté envuelto en `<Provider store={store}>` en `main.jsx`.
*   **Errores de Despacho (Payload):** Asegúrate de que el `payload` que pasas a `rejectWithValue` o a las acciones sea consistente con lo que espera tu `extraReducers`.
*   **Problemas de CORS:** Si usas una API diferente y obtienes errores de CORS, deberás configurar el servidor de tu API o usar un proxy en desarrollo.
*   **Renderizados Infinitos:** Cuidado con `useEffect` sin un array de dependencias o con dependencias que cambian en cada render. Usa `useCallback` o `useMemo` para estabilizar funciones u objetos pasados como dependencias.
*   **Mutación Directa del Estado en Redux:** Recuerda que Redux requiere actualizaciones inmutables. Redux Toolkit ayuda mucho con esto, pero es una trampa común.

---

## 📈 11. Optimización Adicional (Roadmap)

*   **TypeScript:** Migrar el proyecto a TypeScript añadiría tipado estático, reduciendo errores y mejorando la calidad del código, especialmente en equipos.
*   **Pruebas:** Implementar pruebas unitarias para slices, hooks y componentes. Esto es crucial para la mantenibilidad y para prevenir regresiones.
*   **Lazy Loading / Code Splitting:** Para aplicaciones más grandes, cargar componentes y rutas solo cuando se necesitan.
*   **Cacheo de Datos:** Implementar caché para las respuestas de la API si los datos no cambian frecuentemente.

---

¡Felicidades! Has completado un recorrido exhaustivo por la construcción de una aplicación React moderna con una arquitectura robusta. Experimenta con el código, modifica los componentes, y sigue explorando el vasto mundo del desarrollo frontend.

---
