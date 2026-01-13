# Tutorial: Creando un Visor de Perfiles con React, Redux y Estilo "Liquid Glass"

¡Hola! En este tutorial, construiremos una aplicación web completa desde cero, basada en el proyecto `myprojectapi02`. La aplicación permitirá buscar un usuario por su ID, mostrar su perfil junto con sus publicaciones, y manejará de forma elegante los estados de carga, error o si el usuario no es encontrado.

Aprenderemos sobre arquitectura de software en capas, gestión de estado profesional con Redux, y cómo crear una aplicación React limpia, mantenible y con una estética moderna de "vidrio líquido" (Glassmorphism).

### **Índice del Tutorial**

1.  **Tecnologías Clave y Dependencias**
2.  **Paso 1: Configuración del Entorno de Desarrollo**
3.  **Paso 2: Arquitectura del Proyecto en Capas**
4.  **Paso 3: Estructura de Estilos (BEM y CSS Centralizado)**
5.  **Paso 4: La Capa de Acceso a Datos (API)**
6.  **Paso 5: Configurando el Estado con Redux**
7.  **Paso 6: Hooks Personalizados para Lógica de UI (`useUser` y `useTheme`)**
8.  **Paso 7: Creando Componentes de UI Reutilizables**
9.  **Paso 8: Ensamblando la Aplicación Principal (`App.jsx`)**
10. **Paso 9: Conectando Todo en el Punto de Entrada (`main.jsx`)**
11. **Análisis de Buenas Prácticas y Patrones**
12. **Oportunidades de Mejora**

---

### **1. Tecnologías Clave y Dependencias**

Este proyecto utiliza un conjunto de herramientas modernas para el desarrollo de aplicaciones React. A continuación, se detallan las dependencias extraídas del archivo `package.json`:

-   **Dependencias Principales (`dependencies`):**

    -   **`react` y `react-dom`:** El núcleo para construir la interfaz de usuario.
    -   **`@reduxjs/toolkit` y `react-redux`:** El estándar actual para la gestión de estado global. `Toolkit` simplifica la escritura de lógica de Redux y `react-redux` conecta nuestros componentes React al store.
    -   **`@material-tailwind/react`:** Una librería de componentes de UI basada en Material Design y Tailwind CSS, que nos provee de elementos listos para usar como `Card`, `Button`, `Input`, etc.
    -   **`@heroicons/react`:** Una colección de íconos SVG de alta calidad que se integran perfectamente con los componentes.
    -   **`prop-types`:** Una librería para validar las `props` que reciben los componentes, asegurando que los datos tengan el tipo y la forma esperados.

-   **Dependencias de Desarrollo (`devDependencies`):**
    -   **`vite`:** Un entorno de desarrollo ultrarrápido que nos da un servidor de desarrollo con recarga en caliente (HMR) y un empaquetado optimizado para producción.
    -   **`@vitejs/plugin-react`:** El plugin oficial que permite a Vite entender y transformar código JSX de React.
    -   **`tailwindcss`, `postcss`, `autoprefixer`:** El ecosistema de Tailwind CSS. `tailwindcss` es el framework, `postcss` lo procesa y `autoprefixer` añade los prefijos de navegador necesarios para la compatibilidad.
    -   **`eslint` y plugins (`eslint-plugin-react`, etc.):** Herramientas de "linting" para mantener la calidad y consistencia del código, detectando errores comunes y forzando un estilo de codificación.

### **2. Paso 1: Configuración del Entorno de Desarrollo**

Primero, creamos el proyecto con Vite y seleccionamos React.

```bash
# Crea un nuevo proyecto Vite
npm create vite@latest myprojectapi02 -- --template react

# Entra en el directorio del proyecto
cd myprojectapi02
```

Ahora, instalamos las dependencias que vimos en la sección anterior:

```bash
# Dependencias principales
npm install react react-dom @reduxjs/toolkit react-redux @material-tailwind/react @heroicons/react prop-types

# Dependencias de desarrollo
npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
```

Inicializamos Tailwind CSS, que creará los archivos `tailwind.config.js` y `postcss.config.js`.

```bash
npx tailwindcss init -p
```

Configuramos `tailwind.config.js` para que analice nuestros archivos y se integre con Material Tailwind:

```javascript
// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    darkMode: "class", // Habilita el modo oscuro basado en clases
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            sans: ["Playwrite CU", "Open Sans", "sans-serif"],
        },
        extend: {},
    },
    plugins: [],
});
```

Finalmente, añadimos las directivas de Tailwind y las fuentes personalizadas a `src/index.css`:

```css
/* src/index.css */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
    font-family: "Roboto", sans-serif;
}
```

### **3. Paso 2: Arquitectura del Proyecto en Capas**

El proyecto sigue una arquitectura de capas bien definida para separar responsabilidades, lo que facilita el mantenimiento y la escalabilidad.

```
src/
├── api/              # Lógica de comunicación con la API externa.
├── components/       # Componentes de UI reutilizables.
│   ├── layout/       # Componentes de estructura (MainLayout).
│   └── skeletons/    # Componentes para estados de carga.
├── hooks/            # Hooks personalizados (useUser).
├── redux/            # Configuración de Redux (store y slices).
│   └── slices/
└── App.jsx
└── main.jsx
```

-   **`api/`**: Aísla toda la lógica de `fetch` para comunicarse con la API de JSONPlaceholder.
-   **`components/`**: Contiene los componentes de React. Se subdivide en `layout` para la estructura general y `skeletons` para las animaciones de carga.
-   **`hooks/`**: Hogar de nuestros hooks personalizados, como `useUser`, que encapsula la lógica de la interfaz.
-   **`redux/`**: Centraliza toda la configuración de Redux, incluyendo el `store` y los `slices` que definen el estado.

### **4. Paso 3: La Capa de Acceso a Datos (API)**

Centralizamos todas las llamadas a la API. Primero, una función genérica y luego funciones específicas para cada recurso (`user`, `post`).

**`src/api/api.js`** (Función genérica)

```javascript
const API_BASE_URL = "https://jsonplaceholder.typicode.com";
export const fetchFromApi = async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
        const errorResponse = await response.json().catch(() => null);
        const errorMessage =
            errorResponse?.message ||
            response.statusText ||
            `HTTP error ${response.status}`;
        throw new Error(errorMessage);
    }
    return response.json();
};
```

**`src/api/user.js`** y **`src/api/post.js`** (Funciones específicas)

```javascript
// En src/api/user.js
import { fetchFromApi } from "./api";
const getUser = (userId) => fetchFromApi(`users/${userId}`);
export { getUser };

// En src/api/post.js
import { fetchFromApi } from "./api";
const getPostsByUser = (userId) => fetchFromApi(`posts?userId=${userId}`);
export { getPostsByUser };
```

### **5. Paso 4: Configurando el Estado con Redux**

Usaremos Redux Toolkit para gestionar el estado. El "slice" maneja la lógica y el estado del usuario y sus posts.

1.  **Crear el "Slice" de usuario (`src/redux/slices/userSlice.js`):**

    ```javascript
    import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
    import { getUser } from "../../api/user";
    import { getPostsByUser } from "../../api/post";

    export const fetchUserAndPosts = createAsyncThunk(
        "user/fetchUserAndPosts",
        async (userId, { rejectWithValue }) => {
            try {
                // Se ejecutan ambas peticiones en paralelo para optimizar el tiempo de carga
                const [user, posts] = await Promise.all([
                    getUser(userId),
                    getPostsByUser(userId),
                ]);
                // La API de JSONPlaceholder devuelve {} si no encuentra el usuario
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
        initialState: { isLoading: false, error: null, user: null, posts: [] },
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

### **6. Paso 5: El Hook Personalizado `useUser` - La Lógica de UI**

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

### **7. Paso 6: Creando Componentes de UI Reutilizables**

Estos son componentes "presentacionales". Solo reciben datos (props) y los muestran. Su lógica es mínima.

**Ejemplo: `src/components/UserProfile.jsx`**

```javascript
import React from "react";
import {
    Card,
    CardBody,
    Typography,
    Avatar,
    Tooltip,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

const UserProfile = React.memo(({ user }) => {
    // ...código JSX que muestra el perfil...
    // Se usa React.memo para optimizar y evitar re-renderizados innecesarios.
});

UserProfile.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        // ... resto de las props
    }).isRequired,
};

export default UserProfile;
```

De manera similar, se crean otros componentes como `PostList.jsx`, `ErrorMessage.jsx`, `NotFoundCard.jsx` y los componentes de esqueleto (`ProfileSkeleton.jsx`, `PostListSkeleton.jsx`) para los estados de carga.

### **8. Paso 7: Ensamblando la Aplicación Principal (`App.jsx`)**

Gracias al hook `useUser`, nuestro componente `App.jsx` se vuelve muy simple y declarativo. Su única responsabilidad es orquestar y renderizar la UI basándose en el estado que le proporciona el hook.

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
            <div className="w-full max-w-md mx-auto">
                {/* ... (código JSX para el input y el botón de búsqueda) ... */}
            </div>

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

### **9. Paso 8: Conectando Todo en el Punto de Entrada (`main.jsx`)**

Finalmente, envolvemos nuestra aplicación con el `Provider` de Redux y el `ThemeProvider` de Material Tailwind para que todos los componentes descendientes puedan acceder al store y a los estilos del tema.

**`src/main.jsx`**

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-tailwind/react";
import { store } from "./redux/store";
import App from "./App.jsx";
import "./index.css";

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

---

### **10. Análisis de Buenas Prácticas y Patrones**

-   **SOLID - Principio de Responsabilidad Única (SRP)**: Cada módulo tiene una única razón para cambiar. Los archivos en `api/` solo se ocupan de la comunicación externa. `userSlice` solo gestiona el estado del usuario. `useUser` encapsula la lógica de la UI. Los componentes solo renderizan.
-   **DRY (Don't Repeat Yourself)**: El hook `useUser` es un ejemplo perfecto. En lugar de repetir la lógica de `useDispatch` y `useSelector` en `App.jsx`, la abstraemos en un hook reutilizable. La función `fetchFromApi` también evita repetir la lógica de `fetch`.
-   **Patrón Contenedor/Presentacional (con Hooks)**: El hook `useUser` actúa como el "contenedor" que conoce Redux y maneja la lógica. `App.jsx` y sus hijos son "presentacionales", reciben props y renderizan UI, lo que los hace más reutilizables y fáciles de probar.
-   **Patrón Observer**: Redux se basa en este patrón. El hook `useUser` se "suscribe" a los cambios en el store con `useSelector` y es "notificado" (provocando un re-renderizado) cuando el estado que le interesa cambia.

### **11. Oportunidades de Mejora**

Aunque el proyecto es sólido, siempre hay espacio para crecer. Aquí algunas ideas:

1.  **Migración a TypeScript**: Añadir tipado estático con TypeScript en lugar de `prop-types`. Esto eliminaría errores en tiempo de compilación, mejoraría el autocompletado y haría el código más robusto y auto-documentado.
2.  **Implementar Pruebas (Testing)**: Añadir pruebas unitarias para el `userSlice` y el hook `useUser` con una herramienta como **Vitest**. También se podrían añadir pruebas de integración para los componentes con **React Testing Library**.
3.  **Error Boundaries**: Envolver la sección de resultados en un Error Boundary de React. Esto evitaría que un error de renderizado en un componente hijo rompa toda la aplicación.
4.  **Optimización de Búsqueda con Debouncing**: La búsqueda actual se dispara inmediatamente. Para APIs reales, es más eficiente implementar un "debounce" en el input de búsqueda para que la acción de Redux solo se despache después de que el usuario deje de escribir por un momento (ej. 300ms).
5.  **Usar RTK Query**: Para simplificar aún más la obtención de datos, se podría reemplazar `createAsyncThunk` con **RTK Query**. Esta herramienta de Redux Toolkit gestiona automáticamente el cacheo, las llamadas duplicadas y los estados de carga/error, reduciendo drásticamente el código repetitivo en el `userSlice`.
