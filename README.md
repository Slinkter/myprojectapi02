# Proyecto: Visor de Perfil de Usuario

---

## 1. Descripción General

Esta es una aplicación web de página única (SPA) desarrollada con React que consume una API externa para obtener y mostrar el perfil de un usuario junto con sus publicaciones. La aplicación permite al usuario buscar un perfil introduciendo un ID de usuario (del 1 al 10).

El proyecto está diseñado siguiendo las mejores prácticas de React, con un enfoque en un código limpio y mantenible a través de la encapsulación de la lógica en hooks personalizados.

---

## 2. Características Principales

-   **Búsqueda de Usuario por ID:** Permite al usuario introducir un ID (1-10) para buscar y cargar un perfil.
-   **Visualización de Perfil y Publicaciones:** Carga y muestra los datos de un usuario y una lista de sus publicaciones desde una API.
-   **Carga Asíncrona Optimizada:** Muestra esqueletos de carga mientras se obtienen los datos de la API, mejorando la experiencia de usuario.
-   **Manejo de Errores:** Presenta un mensaje de error claro en caso de que la petición a la API falle o el usuario no sea encontrado.
-   **Lógica Reutilizable:** Utiliza un hook personalizado (`useUser`) para encapsular toda la lógica de obtención de datos, manejo de estados de carga y errores.
-   **Diseño Moderno:** Interfaz de usuario construida con Tailwind CSS y la librería de componentes Material Tailwind.
-   **Desarrollo Eficiente:** Construido sobre React y Vite para un rendimiento óptimo en desarrollo y producción.

---

## 3. Arquitectura y Estructura del Proyecto

La arquitectura de este proyecto se centra en la simplicidad y la reutilización del código, siguiendo patrones modernos de desarrollo en React.

### a. Arquitectura Basada en Componentes

La aplicación sigue una **arquitectura basada en componentes**, que es el pilar fundamental de React. Esto permite construir la interfaz a partir de piezas pequeñas, aisladas y reutilizables.

### b. Lógica de Estado con Hooks Personalizados

Para el manejo del estado y la lógica de obtención de datos, se utiliza un **Hook Personalizado (`useUser`)**. Esta elección se justifica por:

-   **Encapsulación:** El hook agrupa toda la lógica relacionada con la obtención de datos del usuario (estados de `isLoading`, `error`, `user`, `posts`) en un solo lugar.
-   **Reutilización:** El hook `useUser(userId)` puede ser utilizado por cualquier componente que necesite obtener datos de un usuario sin reescribir la lógica de `fetch`.
-   **Simplicidad:** Para el alcance de este proyecto, un hook personalizado es una solución más simple y con menos código repetitivo que librerías de estado global.

---

## 4. Tecnologías Utilizadas

-   **React 18:** Para la construcción de la interfaz de usuario.
-   **Vite:** Como herramienta de empaquetado y servidor de desarrollo.
-   **Tailwind CSS:** Para un desarrollo de estilos rápido y personalizable.
-   **Material Tailwind:** Como librería de componentes base para la UI.
-   **ESLint:** Para mantener un código limpio y consistente.

---

## 5. Estructura de Archivos y Roles

A continuación se detalla la estructura del proyecto y el propósito de cada directorio clave:

```
/src
├── api/
│   ├── user.js          # Contiene la función para obtener datos del usuario.
│   └── post.js          # Contiene la función para obtener las publicaciones.
├── assets/              # Contiene assets estáticos como imágenes o SVGs.
├── components/
│   ├── UserProfile.jsx  # Componente que muestra el perfil del usuario.
│   ├── PostList.jsx     # Componente que muestra la lista de posts.
│   └── ...              # Otros componentes y esqueletos de carga.
├── hooks/
│   └── useUser.js       # Hook personalizado para la lógica de obtención de datos.
├── App.jsx              # Componente principal que orquesta la aplicación.
└── main.jsx             # Punto de entrada de la aplicación.
```

-   **`main.jsx`**: Es el punto de entrada. Renderiza el componente `App`.
-   **`App.jsx`**: Actúa como el componente contenedor principal. Es responsable de gestionar la entrada del usuario, invocar el hook `useUser` y pasar los datos a los componentes de presentación.
-   **`api/`**: Este directorio aísla la lógica de comunicación con la API externa.
-   **`hooks/useUser.js`**: El corazón de la lógica de la aplicación. Este hook se encarga de realizar las llamadas a la API, gestionar los estados de carga y error, y devolver los datos.
-   **`components/`**: Contiene todos los componentes de React, que son principalmente "presentacionales".

---

## 6. Cómo Ejecutar el Proyecto Localmente

1.  Clona el repositorio:

    ```bash
    git clone https://github.com/Slinkter/myprojectapi02.git
    cd myprojectapi02
    ```

2.  Instala las dependencias:

    ```bash
    npm install
    ```

3.  Inicia el servidor de desarrollo:

    ```bash
    npm run dev
    ```

4.  Abre la URL que indique Vite (generalmente `http://localhost:5173`) en tu navegador.

### Scripts Disponibles

-   `npm run dev`: Inicia la aplicación en modo de desarrollo.
-   `npm run build`: Compila la aplicación para producción en la carpeta `dist`.
-   `npm run lint`: Analiza el código en busca de errores y problemas de estilo.
-   `npm run preview`: Previsualiza la build de producción localmente.
-   `npm run deploy`: Despliega la aplicación en GitHub Pages.

---

## 7. Configuración del Despliegue

Para que el despliegue en GitHub Pages funcione correctamente, se han realizado las siguientes configuraciones clave:

1.  **`vite.config.js`**: Se ha establecido la propiedad `base` con el nombre del repositorio para que las rutas de los assets sean correctas en producción.
    ```javascript
    // https://vitejs.dev/config/
    export default defineConfig({
        plugins: [react()],
        base: "https://slinkter.github.io/myprojectapi02",
    });
    ```
2.  **`package.json`**: Se ha instalado la dependencia `gh-pages` y se han añadido los scripts `predeploy` y `deploy` para automatizar el proceso de compilación y publicación.
    ```json
    "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```