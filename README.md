# Tutorial: Creando un Visor de Perfiles con React, Redux y Hooks

---

## 1. Descripción General

Este documento es un tutorial detallado para construir una aplicación de visualización de perfiles de usuario desde cero. La aplicación permite buscar usuarios por ID, muestra su perfil y publicaciones, y maneja estados de carga y error de forma elegante.

El objetivo es demostrar una arquitectura limpia y moderna en React, ideal para portafolios y preparación de entrevistas técnicas.

---

## 2. Tecnologías Utilizadas

-   **React 18:** Para la construcción de la interfaz de usuario.
-   **Vite:** Como herramienta de empaquetado y servidor de desarrollo.
-   **Redux Toolkit:** Para un manejo de estado global predecible y eficiente.
-   **Tailwind CSS:** Para un desarrollo de estilos rápido y personalizable.
-   **Material Tailwind:** Como librería de componentes base para la UI.
-   **ESLint:** Para mantener un código limpio y consistente.

---

## 3. Construcción del Proyecto Paso a Paso

### Paso 1: Configuración Inicial del Proyecto

1.  **Crear el proyecto con Vite:**

    ```bash
    npm create vite@latest my-profile-viewer -- --template react
    cd my-profile-viewer
    ```

2.  **Instalar dependencias:**

    ```bash
    # Manejo de estado
    npm install @reduxjs/toolkit react-redux

    # Estilos y componentes UI
    npm install -D tailwindcss postcss autoprefixer
    npm install @material-tailwind/react @heroicons/react

    # Validación de props (buena práctica)
    npm install prop-types
    ```

3.  **Configurar Tailwind CSS:**

    -   Genera los archivos de configuración:
        ```bash
        npx tailwindcss init -p
        ```
    -   Modifica `tailwind.config.js` para integrar Material Tailwind:

        ```javascript
        const withMT = require("@material-tailwind/react/utils/withMT");

        module.exports = withMT({
            content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
            theme: {
                extend: {},
            },
            plugins: [],
        });
        ```

    -   Añade las directivas de Tailwind a `src/index.css`:
        ```css
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        ```

### Paso 2: Estructura de Carpetas

Crea la siguiente estructura dentro de `src/` para organizar el código de forma lógica:

```
/src
├── api/              # Lógica de comunicación con la API externa.
├── components/       # Componentes de UI reutilizables.
│   ├── layout/       # Componentes de estructura (Header, Footer).
│   └── skeletons/    # Componentes para estados de carga.
├── hooks/            # Hooks personalizados.
├── redux/            # Configuración de Redux (store y slices).
│   └── slices/
└── App.jsx
└── main.jsx
```

### Paso 3: Capa de API

Centralizamos todas las llamadas a la API en un único lugar para facilitar su mantenimiento.

**`src/api/api.js`**:

```javascript
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// Función genérica para manejar respuestas de la API
const handleResponse = async (response) => {
    if (!response.ok) {
        throw new Error(response.statusText || `HTTP error ${response.status}`);
    }
    return response.json();
};

// Función genérica para realizar peticiones
export const fetchFromApi = async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return handleResponse(response);
};

// Funciones específicas por recurso
export const getUser = (userId) => fetchFromApi(`users/${userId}`);
export const getPostsByUser = (userId) =>
    fetchFromApi(`posts?userId=${userId}`);
```

### Paso 4: Configuración de Redux

Usaremos Redux Toolkit para gestionar el estado de la aplicación (usuario, posts, carga, errores).

1.  **Crear el "Slice" de usuario (`src/redux/slices/userSlice.js`):**
    Un "slice" maneja la lógica y el estado de una parte de la aplicación.

    ```javascript
    import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
    import { getUser, getPostsByUser } from "../../api/api";

    // Thunk asíncrono para buscar usuario y posts en paralelo
    export const fetchUserAndPosts = createAsyncThunk(
        "user/fetchUserAndPosts",
        async (userId, { rejectWithValue }) => {
            try {
                const [user, posts] = await Promise.all([
                    getUser(userId),
                    getPostsByUser(userId),
                ]);
                // La API devuelve {} si no encuentra el usuario
                if (Object.keys(user).length === 0) {
                    return { user: null, posts: [] };
                }
                return { user, posts };
            } catch (error) {
                return rejectWithValue(error.message);
            }
        }
    );

    const userSlice = createSlice({
        name: "user",
        initialState: {
            user: null,
            posts: [],
            isLoading: false,
            error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(fetchUserAndPosts.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                })
                .addCase(fetchUserAndPosts.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.user = action.payload.user;
                    state.posts = action.payload.posts;
                })
                .addCase(fetchUserAndPosts.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                    state.user = null;
                    state.posts = [];
                });
        },
    });

    export default userSlice.reducer;
    ```

2.  **Configurar el Store (`src/redux/store.js`):**

    ```javascript
    import { configureStore } from "@reduxjs/toolkit";
    import userReducer from "./slices/userSlice";

    export const store = configureStore({
        reducer: {
            user: userReducer,
        },
    });
    ```

3.  **Proveer el Store a la aplicación (`src/main.jsx`):**

    ```javascript
    import React from "react";
    import ReactDOM from "react-dom/client";
    import App from "./App.jsx";
    import "./index.css";
    import { Provider } from "react-redux";
    import { store } from "./redux/store.js";
    import { ThemeProvider } from "@material-tailwind/react";

    ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <Provider store={store}>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </Provider>
        </React.StrictMode>
    );
    ```

### Paso 5: El Hook Personalizado `useUser`

Este es el núcleo de nuestra lógica de UI. Encapsula toda la interacción con Redux y el manejo de la entrada del usuario, manteniendo los componentes limpios.

**`src/hooks/useUser.js`**:

```javascript
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAndPosts } from "../redux/slices/userSlice";

export const useUser = (initialUserId = 1) => {
    const [inputValue, setInputValue] = useState(initialUserId.toString());
    const [searchId, setSearchId] = useState(null);
    const dispatch = useDispatch();

    const { user, posts, isLoading, error } = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        if (initialUserId) {
            dispatch(fetchUserAndPosts(initialUserId));
            setSearchId(initialUserId.toString());
        }
    }, [dispatch, initialUserId]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^$|^[1-9]$|^10$/.test(value)) {
            // Valida que el ID esté entre 1 y 10
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
        isLoading,
        error,
        inputValue,
        searchId,
        handleInputChange,
        handleSearch,
        handleRetry,
    };
};
```

### Paso 6: Ensamblaje de la Interfaz en `App.jsx`

Gracias al hook `useUser`, nuestro componente `App.jsx` se vuelve muy simple y declarativo. Su única responsabilidad es renderizar la UI basándose en el estado que le proporciona el hook.

**`src/App.jsx`**:

```javascript
import { Input, Button, Typography } from "@material-tailwind/react";
import { useUser } from "./hooks/useUser";
import MainLayout from "./components/layout/MainLayout";
import UserProfile from "./components/UserProfile";
import PostList from "./components/PostList";
import ErrorMessage from "./components/ErrorMessage";
import NotFoundCard from "./components/NotFoundCard";
import ProfileSkeleton from "./components/skeletons/ProfileSkeleton";
import PostListSkeleton from "./components/skeletons/PostListSkeleton";

function App() {
    const {
        user, posts, isLoading, error,
        inputValue, searchId,
        handleInputChange, handleSearch, handleRetry,
    } = useUser(1); // Inicializamos con el ID 1

    return (
        <MainLayout>
            {/* ... (código JSX para el input y el botón de búsqueda) ... */}

            {isLoading && (
                <div className="space-y-8">
                    <ProfileSkeleton />
                    <PostListSkeleton />
                </div>
            )}

            {error && <ErrorMessage message={error} onRetry={handleRetry} />}

            {!isLoading && !error && user && (
                <div className="space-y-8">
                    <UserProfile user={user} />
                    {posts.length > 0 ? <PostList posts={posts} /> : /* ... */}
                </div>
            )}

            {!isLoading && !error && !user && searchId && (
                <NotFoundCard numberId={searchId} />
            )}
        </MainLayout>
    );
}

export default App;
```

_(Nota: El código de los componentes de UI como `UserProfile`, `PostList`, etc., se omite por brevedad, pero se encuentran en la carpeta `src/components`)_.

### Paso 7: Ejecutar el Proyecto

Finalmente, inicia el servidor de desarrollo para ver la aplicación en acción.

```bash
npm run dev
```

Abre `http://localhost:5173` en tu navegador. ¡Y listo! Has construido una aplicación React robusta con una arquitectura limpia y escalable.
