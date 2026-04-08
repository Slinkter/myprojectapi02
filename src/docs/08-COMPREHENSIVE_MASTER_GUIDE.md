# 📘 Guía Maestra Completa: UserApp Pro (Arquitectura, Hooks y Diseño)

Esta guía representa la documentación técnica exhaustiva del proyecto **UserApp Pro**. Aquí no solo explicamos *qué* hace el código, sino *por qué* se diseñó así, justificando cada patrón, utilidad, y decisión de arquitectura. Si quieres pedir que te explique un proyecto en el futuro, puedes usar el prompt: *"Crea una guía maestra desde cero explicando cada función, custom hook, justificando el uso de mappers, utilidades, y detallando los patrones de diseño, sistema de diseño y paleta de colores."*

---

## Índice
1. [Sistema de Diseño y Paleta de Colores (UI/UX)](#1-sistema-de-diseño-y-paleta-de-colores-uiux)
2. [Patrones de Diseño Arquitectónicos](#2-patrones-de-diseño-arquitectónicos)
3. [Catálogo de Custom Hooks](#3-catálogo-de-custom-hooks)
4. [Capa Anti-Corrupción (Mappers)](#4-capa-anti-corrupción-mappers)
5. [Infraestructura y Cliente API](#5-infraestructura-y-cliente-api)
6. [Utilidades Transversales (Utils)](#6-utilidades-transversales-utils)
7. [Gestión Declarativa de UI (StateBoundary)](#7-gestión-declarativa-de-ui-stateboundary)

---

## 1. Sistema de Diseño y Paleta de Colores (UI/UX)

El proyecto utiliza **Tailwind CSS v4** configurado en `src/index.css`. No dependemos de librerías de componentes pesadas; en su lugar, hemos construido un sistema de diseño propio basado en variables CSS y utilidades nativas.

### Paleta de Colores y Variables Root
- **Fondo (Light):** `#f1f5f9` (Slate 100) - Un gris muy suave y elegante que cansa menos la vista que un blanco puro.
- **Texto Principal (Light):** `#1e293b` (Slate 800) - Alto contraste para legibilidad.
- **Acento / Focus:** `#2563eb` (Blue 600) - Usado para el `outline` de accesibilidad.

### Patrón Glassmorphism
Hemos creado una utilidad CSS personalizada `@utility glass` para aplicar un efecto de cristal esmerilado en las tarjetas. Esto da un aspecto moderno y premium:
- **Background:** `rgba(255, 255, 255, 0.85)`
- **Border:** `rgba(255, 255, 255, 0.4)`
- **Shadow:** `rgba(31, 38, 135, 0.2)` con un blur de 40px y desenfoque de fondo de `12px` (`backdrop-filter`).

### Accesibilidad (A11y)
Se incluye un anillo de enfoque global para usuarios que navegan con teclado:
```css
*:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
```

### Animaciones Custom
- **`.animate-loading`**: Una animación horizontal (`transform: translateX()`) usada en los Skeletons para dar feedback de carga fluida, superando el clásico `animate-pulse`.

---

## 2. Patrones de Diseño Arquitectónicos

1. **Defensive Programming (Programación Defensiva):** Se asume que los datos de entrada (APIs, usuarios) pueden ser maliciosos, nulos o corruptos. Lo vemos en los Mappers y en el API Client.
2. **Early Return:** Se evitan anidaciones profundas (`if-else`). Si una validación falla, la función retorna inmediatamente (ej. `if (!id) return {};`).
3. **Separation of Concerns (SoC):** La UI no hace fetch. Los hooks no renderizan HTML. El estado global no guarda inputs temporales.
4. **State Machine (Máquina de Estados) para UI:** El componente `StateBoundary` trata las peticiones HTTP como estados finitos: `idle -> loading -> succeeded | failed | notFound`.

---

## 3. Catálogo de Custom Hooks

Los custom hooks encapsulan lógica compleja para que los componentes de React sean "tontos" (Dumb Components) y fáciles de leer.

### A. `useTheme` (`src/shared/hooks/useTheme.js`)
**Propósito:** Gestionar el modo oscuro/claro con persistencia.
- **Cómo funciona:** 
  1. Inicializa leyendo `localStorage.getItem("theme")`.
  2. Un `useEffect` escucha `window.matchMedia` para detectar la preferencia del sistema operativo del usuario.
  3. Al cambiar `isDark`, inyecta la clase `.dark` en el tag `<html>`.
- **Justificación:** Centraliza la lógica del DOM y el almacenamiento local, evitando que los componentes de la Navbar tengan que lidiar con la API del navegador.

### B. `useSearchInput` (`src/features/user-search/hooks/useSearchInput.js`)
**Propósito:** Validar el input de búsqueda en tiempo real, separando esta lógica del componente visual.
- **Cómo funciona:** 
  - Maneja `searchValue`, `helperMessage` y `hasError`.
  - Implementa **Debouncing** (`setTimeout` guardado en un `useRef`): No valida cada tecla que el usuario pulsa, sino que espera un breve retardo (`UX_CONFIG.DEBOUNCE_DELAY`).
  - **Lógica de negocio:** Si el input es numérico, verifica que esté dentro de un rango permitido (`SEARCH_LIMITS.MIN_ID` y `MAX_ID`).
- **Justificación:** Mejora enormemente el rendimiento y centraliza las reglas de validación (saber qué IDs son válidos no es responsabilidad de la UI).

### C. `useUserSearch` (`src/features/user-search/hooks/useUserSearch.js`)
**Propósito:** Orquestador principal de la característica de búsqueda. Une la UI con Redux.
- **Cómo funciona:** 
  - Expone los selectores de Redux (`user`, `posts`, `status`, `error`).
  - Provee `performSearch(input)`, que decide (vía un servicio) si la búsqueda es por ID o por nombre, y despacha la acción (Thunk) correspondiente a Redux (`fetchUserAndPosts`).
- **Justificación:** Mantiene los componentes limpios de llamadas a `dispatch`. El componente solo dice "busca a Juan", y el hook sabe cómo hacerlo.

---

## 4. Capa Anti-Corrupción (Mappers)

Ubicados en `src/entities/user/domain/user.mappers.js`.

**Justificación Arquitectónica:** Las APIs de terceros (como JSONPlaceholder) cambian. Si mapeamos la respuesta de la API directamente a los componentes, un cambio en la API rompe toda la app. Los Mappers actúan como escudos.

- **`mapRawUser(raw)`**: 
  - Recibe el JSON sucio de la API.
  - Usa el patrón Early Return: `if (!raw || !raw.id) return null;`
  - Transforma tipos de forma segura: `String(raw.username)`, `Number(raw.id)`. Si falta un dato (ej. `company.name`), provee fallbacks (`"N/A"`, `"Unknown User"`).
- **`mapRawPosts(rawList)`**:
  - Filtra datos corruptos antes de mostrarlos: `rawList.filter(p => p && p.id && p.title)`.

---

## 5. Infraestructura y Cliente API

Ubicados en `src/shared/api/api-client.js` y `src/entities/user/api/user.api.js`.

### A. `fetchFromApi(endpoint, options)`
- Envuelve el `fetch` nativo del navegador.
- **Manejo Estandarizado de Errores:** Verifica `!response.ok` y lanza errores que incluyen el código de estado (`error.status = response.status`). Atrapa problemas de red y lanza errores HTTP 500.
- Re-lanza los `AbortError` limpiamente (útil para la cancelación de peticiones).

### B. Adaptadores (`getUser`, `getAllUsers`)
- **Resiliencia:** Si `getUser` falla con un 404 (Usuario no encontrado), no revienta la aplicación; captura el error y retorna un objeto vacío `{}`. Esto permite a la capa de servicios interpretar limpiamente que el usuario no existe, en lugar de manejar excepciones sucias.
- En `getAllUsers`, si hay un error crítico, falla en silencio retornando `[]` para que el resto de la app siga funcionando.

---

## 6. Utilidades Transversales (Utils)

Ubicadas en `src/shared/lib/utils.js`. Funciones puras que pueden ser usadas en cualquier lugar de la app.

- **`cn(...inputs)`**: 
  - **Justificación:** En Tailwind, si haces `className={`p-4 ${isLarge ? 'p-8' : ''}`}`, puedes terminar con clases duplicadas que el navegador no sabe resolver (`p-4 p-8`). `cn()` utiliza `clsx` (para lógica condicional) y `tailwind-merge` (para resolver conflictos CSS de Tailwind). Es un estándar en la industria (usado en `shadcn/ui`).
- **`normalizeText(text)`**: 
  - **Justificación:** Las búsquedas por texto fallan con las tildes y mayúsculas ("García" vs "garcia"). Esta función pasa el texto a minúsculas y elimina los acentos usando `.normalize("NFD")` y una expresión regular (`/[\u0300-\u036f]/g`).

---

## 7. Gestión Declarativa de UI (StateBoundary)

Ubicado en `src/shared/ui/StateBoundary.jsx`.

**El Problema:** El infierno de los if-else en React:
```jsx
if (status === 'loading') return <Spinner />;
if (status === 'failed') return <ErrorMessage />;
if (status === 'notFound') return <NotFoundCard />;
return <UserProfile data={user} />;
```
Esto ensucia los componentes y duplica la lógica visual en cada pantalla de la app.

**La Solución (`StateBoundary`):**
Un componente de orden superior (wrapper) que recibe la prop `status` (`'idle'`, `'loading'`, `'succeeded'`, etc.).
Basado en un `switch`, decide automáticamente qué mostrar.
- Permite inyectar componentes personalizados (`loadingComponent`, `errorComponent`) o usar diseños por defecto que ya tienen clases Tailwind incorporadas.
- **Justificación:** Abstrae el ciclo de vida asíncrono, dejando el componente padre totalmente limpio, enfocándose únicamente en el "Happy Path" (estado exitoso).