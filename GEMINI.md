# GEMINI.md

## Resumen del Proyecto
**UserApp Pro - Enterprise API Consumer** es una aplicación React de alto rendimiento construida con **Vite**, **Redux Toolkit** y **Tailwind CSS v4**. Sigue los principios de **Arquitectura Limpia** (Arquitectura de Cebolla) para garantizar una estricta separación de responsabilidades entre la infraestructura, la lógica de dominio y la interfaz de usuario (UI).

El proyecto está estructurado como un sistema basado en características (`src/features/`), centrado específicamente en el dominio de `user-search` (búsqueda de usuarios). Consume datos de la API JSONPlaceholder, empleando **Mappers de Datos** (Capa Anti-Corrupción) para sanear y transformar los datos externos en entidades de dominio limpias.

### Tecnologías Clave
- **Frontend:** React 18 (Componentes Funcionales, Hooks)
- **Gestión de Estado:** Redux Toolkit (Slices, Thunks, Selectores Memoizados)
- **Estilos:** Tailwind CSS v4 (Utilidades puras, basado en temas)
- **Herramienta de Construcción:** Vite
- **Despliegue:** GitHub Pages (`gh-pages`)
- **Resiliencia:** `AbortController` nativo para cancelación de peticiones, `StateBoundary` para la gestión del ciclo de vida asíncrono.

---

## Arquitectura y Capas
El sistema se divide en cuatro capas distintas:
1.  **Infraestructura (`api/`, `lib/`):** Lógica de bajo nivel para peticiones fetch y adaptadores REST.
2.  **Dominio (`domain/`):** Mappers de datos y definiciones de entidades.
3.  **Aplicación (`store/`, `hooks/`):** Lógica de Redux, thunks y hooks personalizados.
4.  **Presentación (`components/`):** Componentes de React (Smart/Dumb).

---

## Gestión de Estado
El proyecto emplea una estrategia híbrida para manejar el estado, priorizando la predictibilidad y el rendimiento:

1.  **Redux Toolkit (Núcleo):** Es el sistema principal para el estado global y los datos de dominio.
    - Se organiza en **Slices** (`userSlice`, `uiSlice`).
    - Utiliza **Thunks** para la lógica asíncrona y **Selectores Memoizados** (`createSelector`) para el acceso eficiente a los datos.
2.  **Context API:** Se reserva para estados transversales de la UI que no requieren la complejidad de Redux.
    - **Uso:** Implementado principalmente para el sistema de temas (**Dark/Light Mode**) a través de `useTheme`.
3.  **useReducer vs Redux:** No se utiliza `useReducer` de forma explícita en los componentes, ya que **Redux Toolkit** (`createSlice`) centraliza esta lógica de reductores de manera más robusta y escalable.
4.  **useState:** Utilizado estrictamente para estados locales y efímeros (ej. valores temporales de inputs).

---

## Construcción y Ejecución

### Requisitos Previos
- Node.js (v18+)
- pnpm (Gestor de paquetes preferido)

### Comandos Clave
- `pnpm install`: Instala las dependencias.
- `pnpm dev`: Inicia el servidor de desarrollo (Vite).
- `pnpm build`: Genera el paquete de producción.
- `pnpm lint`: Ejecuta las comprobaciones de ESLint.
- `pnpm preview`: Vista previa local de la compilación de producción.
- `pnpm deploy`: Construye y despliega la aplicación en GitHub Pages.

---

## Convenciones de Desarrollo

### Estructura Basada en Características
Toda nueva funcionalidad debe encapsularse dentro de `src/features/[nombre-caracteristica]/`. Cada carpeta de característica suele contener:
- `api/`: Adaptadores específicos de endpoints.
- `domain/`: Mappers y lógica de negocio.
- `hooks/`: Hooks de dominio especializados.
- `components/`: UI específica de la característica.
- `store/`: Slices y thunks de Redux.

### Estándares de Codificación
- **Código Limpio:** Adherirse al SRP (Principio de Responsabilidad Única).
- **Estilos:** Usar exclusivamente utilidades de **Tailwind CSS v4**. Evitar archivos CSS externos.
- **JSDoc:** Documentación obligatoria para todos los nuevos hooks y componentes.
- **i18n:** Usar el hook `useTranslation` para todo el texto visible al usuario.
- **Gestión de Estado:** Usar siempre `StateBoundary` para manejar los estados de `loading`, `error` y `success` en operaciones asíncronas.
- **Rendimiento:** 
    - Implementar `AbortSignal` en todos los thunks que realicen llamadas a la API para evitar condiciones de carrera.
    - Usar selectores memoizados (`createSelector`) para el acceso al estado.
    - Usar debouncing para operaciones con entradas frecuentes (inputs).

### Extensión del Sistema
Para agregar un nuevo campo de datos desde la API:
1.  Actualizar el mapper en `src/features/user-search/api/user.mappers.js`.
2.  Agregar el campo al componente de UI correspondiente (ej. `UserProfile.jsx`).
3.  Agregar la clave de traducción en `src/lib/translations.js`.
4.  Actualizar las definiciones de `PropTypes` o TypeScript.
