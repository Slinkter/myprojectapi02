# Proyecto: Visor de Perfil de Usuario

## 1. Demo en Vivo

Puedes ver la aplicación funcionando en el siguiente enlace:

[https://slinkter.github.io/myprojectapi02/](https://slinkter.github.io/myprojectapi02/)

!Captura de la aplicación

---

## 2. Descripción General

Esta es una aplicación web de página única (SPA) desarrollada con React que consume una API externa para obtener y mostrar el perfil de un usuario junto con sus publicaciones.

El proyecto está diseñado siguiendo las mejores prácticas de React, con un enfoque en un código limpio y mantenible a través de la encapsulación de la lógica en hooks personalizados.

---

## 3. Características Principales

-   **Visualización de Perfil y Publicaciones:** Carga y muestra los datos de un usuario y una lista de sus publicaciones desde una API.
-   **Carga Asíncrona Optimizada:** Muestra un indicador de carga mientras se obtienen los datos de la API.
-   **Manejo de Errores:** Presenta un mensaje de error claro en caso de que la petición a la API falle.
-   **Lógica Reutilizable:** Utiliza un hook personalizado (`useUser`) para encapsular toda la lógica de obtención de datos, manejo de estados de carga y errores.
-   **Diseño Moderno:** Interfaz de usuario construida con Tailwind CSS y la librería de componentes Material Tailwind.
-   **Desarrollo Eficiente:** Construido sobre React y Vite para un rendimiento óptimo en desarrollo y producción.

---

## 4. Arquitectura y Estructura del Proyecto

La arquitectura de este proyecto se centra en la simplicidad y la reutilización del código, siguiendo patrones modernos de desarrollo en React.

### a. Arquitectura Basada en Componentes

La aplicación sigue una **arquitectura basada en componentes**, que es el pilar fundamental de React. Esto permite construir la interfaz a partir de piezas pequeñas, aisladas y reutilizables, facilitando el desarrollo y la mantenibilidad.

### b. Lógica de Estado con Hooks Personalizados

Para el manejo del estado y la lógica de obtención de datos, se ha optado por el uso de **Hooks Personalizados** en lugar de una librería de gestión de estado global como Redux.

-   **Alternativas Consideradas:**

    1.  **Gestión de Estado Global (Redux, Zustand):** Soluciones como Redux son excelentes para aplicaciones complejas donde múltiples componentes no relacionados necesitan compartir y modificar el mismo estado.
    2.  **Estado Local (`useState`, `useEffect`):** Manejar la lógica directamente dentro de los componentes es viable, pero puede llevar a duplicación de código si varios componentes necesitan la misma funcionalidad.

-   **Justificación de la Elección:** Se eligió un **hook personalizado (`useUser`)** por las siguientes razones:
    -   **Encapsulación:** El hook agrupa toda la lógica relacionada con la obtención de datos del usuario (estados de `isLoading`, `isError`, `user`, `posts`) en un solo lugar.
    -   **Reutilización:** Cualquier componente que necesite mostrar información de un usuario puede simplemente usar el hook `useUser(userId)` sin tener que reescribir la lógica de `fetch`, `try/catch`, etc.
    -   **Simplicidad:** Para el alcance de este proyecto, donde el estado no necesita ser compartido masivamente a través de la aplicación, un hook personalizado es una solución más simple y con menos código repetitivo que configurar una librería de estado global. Mantiene los componentes limpios y centrados en la presentación.
    -   **Claridad:** El código es más fácil de seguir. Un componente que usa `const { user, posts, isLoading } = useUser(1);` deja muy claro de dónde provienen sus datos y su estado.

---

## 5. Tecnologías Utilizadas

-   **React 18:** Para la construcción de la interfaz de usuario.
-   **Vite:** Como herramienta de empaquetado y servidor de desarrollo.
-   **Tailwind CSS:** Para un desarrollo de estilos rápido y personalizable.
-   **Material Tailwind:** Como librería de componentes base para la UI.
-   **ESLint:** Para mantener un código limpio y consistente.

---

## 6. Estructura de Archivos y Roles

A continuación se detalla la estructura del proyecto y el propósito de cada directorio clave:

```
/src
├── api/
│   ├── user.js          # Contiene la función para obtener datos del usuario.
│   └── post.js          # Contiene la función para obtener las publicaciones.
├── assets/              # Contiene assets estáticos como imágenes o SVGs.
├── components/
│   ├── UserProfile.jsx  # Componente que muestra el perfil del usuario.
│   └── PostList.jsx     # Componente que muestra la lista de posts.
├── hooks/
│   └── useUser.js       # Hook personalizado para la lógica de obtención de datos.
├── App.jsx              # Componente principal que orquesta la aplicación.
└── main.jsx             # Punto de entrada de la aplicación.
```

-   **`main.jsx`**: Es el punto de entrada. Renderiza el componente `App`.
-   **`App.jsx`**: Actúa como el componente contenedor principal. Es responsable de invocar el hook `useUser` y pasar los datos a los componentes de presentación.
-   **`api/`**: Este directorio aísla la lógica de comunicación con la API externa. Cada archivo se encarga de un "recurso" específico (usuarios, publicaciones).
-   **`hooks/useUser.js`**: El corazón de la lógica de la aplicación. Este hook se encarga de:
    -   Realizar las llamadas asíncronas a la API.
    -   Gestionar los estados de carga (`isLoading`).
    -   Capturar y almacenar errores (`isError`).
    -   Almacenar los datos del usuario y sus publicaciones.
    -   Devolver estos datos y estados para que los componentes los consuman.
-   **`components/`**: Contiene todos los componentes de React, que son principalmente "presentacionales" (se enfocan en mostrar la UI a partir de las props que reciben).

---

## 7. Cómo Ejecutar el Proyecto Localmente

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

## 8. Configuración del Despliegue

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
