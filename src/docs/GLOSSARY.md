# 📖 Glosario de Términos

> **Proyecto:** myprojectapi02  
> **Última Actualización:** 12 de Enero, 2026

---

## 🎯 Propósito

Este glosario define los términos técnicos, conceptos de React, arquitectura frontend, librerías y patrones de diseño utilizados en el proyecto **myprojectapi02**.

---

## 📚 Conceptos de React

### Component (Componente)
Bloque de construcción fundamental de React. Función o clase que retorna JSX y puede recibir props.

**Ejemplo:**
```jsx
function UserProfile({ user }) {
    return <div>{user.name}</div>;
}
```

### Props
Propiedades que se pasan de un componente padre a un componente hijo. Son inmutables (read-only).

**Ejemplo:**
```jsx
<UserProfile user={userData} />
```

### State (Estado)
Datos que pueden cambiar a lo largo del tiempo y causan re-renders cuando se actualizan.

**Ejemplo:**
```jsx
const [count, setCount] = useState(0);
```

### Hook
Función especial que permite "enganchar" características de React (estado, efectos, contexto) en componentes funcionales.

**Hooks Nativos:**
- `useState` - Gestión de estado local
- `useEffect` - Efectos secundarios
- `useCallback` - Memoización de funciones
- `useMemo` - Memoización de valores
- `useContext` - Acceso a contexto
- `useReducer` - Estado complejo con reducer

### Custom Hook
Hook personalizado que encapsula lógica reutilizable. Debe comenzar con `use`.

**Ejemplo:**
```jsx
function useUser(userId) {
    const [user, setUser] = useState(null);
    // Lógica...
    return { user, loading, error };
}
```

### JSX (JavaScript XML)
Extensión de sintaxis de JavaScript que permite escribir HTML dentro de JavaScript.

**Ejemplo:**
```jsx
const element = <h1>Hello, World!</h1>;
```

### Virtual DOM
Representación en memoria del DOM real. React lo usa para optimizar actualizaciones.

### Reconciliation (Reconciliación)
Proceso por el cual React actualiza el DOM comparando el Virtual DOM anterior con el nuevo.

### Re-render
Proceso de volver a ejecutar un componente para actualizar la UI cuando cambia el estado o las props.

### Memoization (Memoización)
Técnica de optimización que almacena resultados de cálculos costosos para reutilizarlos.

**Herramientas:**
- `React.memo` - Memoiza componentes
- `useMemo` - Memoiza valores
- `useCallback` - Memoiza funciones

### Effect (Efecto)
Operación secundaria que se ejecuta después del render (fetch de datos, suscripciones, etc.).

**Ejemplo:**
```jsx
useEffect(() => {
    fetchData();
}, [dependency]);
```

### Dependency Array
Array de dependencias en `useEffect` o `useCallback` que determina cuándo re-ejecutar.

**Ejemplo:**
```jsx
useEffect(() => {
    // Se ejecuta cuando userId cambia
}, [userId]);
```

---

## 🏗️ Arquitectura Frontend

### SPA (Single Page Application)
Aplicación web que carga una sola página HTML y actualiza dinámicamente el contenido sin recargar.

### Feature-Based Architecture
Organización de código por funcionalidades de negocio en lugar de por tipo de archivo.

**Estructura:**
```
features/
├── user-search/
│   ├── components/
│   ├── hooks/
│   └── services/
```

### Layered Architecture
Organización de código en capas con responsabilidades específicas.

**Capas:**
1. Presentation Layer (UI)
2. Logic Layer (Hooks, Redux)
3. Service Layer (Business Logic)
4. Data Layer (API Clients)

### Separation of Concerns
Principio de diseño que separa responsabilidades en módulos independientes.

### Container/Presenter Pattern
Patrón que separa componentes con lógica (Containers) de componentes de presentación (Presenters).

**Container:**
```jsx
function UserSearchPage() {
    const { user, handleSearch } = useUser();
    return <UserProfile user={user} />;
}
```

**Presenter:**
```jsx
function UserProfile({ user }) {
    return <div>{user.name}</div>;
}
```

### Service Layer Pattern
Capa intermedia que orquesta llamadas a APIs y aplica lógica de negocio.

### Repository Pattern
Abstracción de acceso a datos que oculta detalles de implementación de la fuente de datos.

---

## 🔄 Redux y Gestión de Estado

### Redux
Librería de gestión de estado global predecible para JavaScript.

### Redux Toolkit (RTK)
Conjunto de herramientas oficial para simplificar el uso de Redux.

### Store
Objeto que contiene todo el estado global de la aplicación.

**Ejemplo:**
```javascript
const store = configureStore({
    reducer: { user: userReducer }
});
```

### Slice
Fragmento del estado global con sus reducers y actions.

**Ejemplo:**
```javascript
const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {}
});
```

### Reducer
Función pura que toma el estado actual y una acción, y retorna un nuevo estado.

**Ejemplo:**
```javascript
function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        default:
            return state;
    }
}
```

### Action
Objeto que describe un cambio en el estado.

**Ejemplo:**
```javascript
{ type: 'INCREMENT', payload: 1 }
```

### Dispatch
Función que envía una acción al store para actualizar el estado.

**Ejemplo:**
```javascript
dispatch({ type: 'INCREMENT' });
```

### Selector
Función que extrae datos específicos del estado global.

**Ejemplo:**
```javascript
const user = useSelector(state => state.user);
```

### AsyncThunk
Función de Redux Toolkit para manejar lógica asíncrona.

**Ejemplo:**
```javascript
export const fetchUser = createAsyncThunk(
    'user/fetch',
    async (userId) => {
        const response = await api.getUser(userId);
        return response.data;
    }
);
```

### Flux Pattern
Patrón de arquitectura con flujo unidireccional de datos.

**Flujo:**
```
Component → Action → Reducer → Store → Component
```

---

## 🎨 CSS y Estilos

### TailwindCSS
Framework CSS utility-first que proporciona clases predefinidas para estilos.

**Ejemplo:**
```html
<div class="flex items-center gap-4 p-6">
```

### Utility-First
Enfoque de CSS que usa clases de utilidad pequeñas y composables.

### BEM (Block Element Modifier)
Metodología de naming para CSS que estructura clases de manera predecible.

**Formato:**
- Block: `.user-profile`
- Element: `.user-profile__avatar`
- Modifier: `.user-profile--compact`

### Glassmorphism
Estilo de diseño que simula vidrio esmerilado con transparencias y blur.

**Ejemplo:**
```css
background: rgba(255, 255, 255, 0.3);
backdrop-filter: blur(10px);
```

### Dark Mode
Esquema de colores oscuro para reducir fatiga visual en ambientes con poca luz.

### Responsive Design
Diseño que se adapta a diferentes tamaños de pantalla.

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: >= 1024px

### Mobile-First
Enfoque de diseño que comienza con la versión móvil y escala hacia arriba.

---

## 📦 Librerías y Herramientas

### Vite
Build tool moderno y rápido para desarrollo frontend.

**Características:**
- Hot Module Replacement (HMR)
- Build optimizado con Rollup
- Soporte nativo para ES modules

### Material Tailwind
Librería de componentes UI basada en Material Design y TailwindCSS.

**Componentes:**
- Card, Button, Input, Typography, Avatar, Tooltip

### Heroicons
Conjunto de iconos SVG diseñados por los creadores de TailwindCSS.

### PropTypes
Librería para validación de tipos de props en componentes React.

**Ejemplo:**
```javascript
UserProfile.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired
};
```

### ESLint
Herramienta de linting para identificar y reportar patrones en código JavaScript.

### PostCSS
Herramienta para transformar CSS con plugins de JavaScript.

### Autoprefixer
Plugin de PostCSS que agrega prefijos de navegador automáticamente.

---

## 🌐 APIs y Networking

### REST API
Interfaz de programación de aplicaciones que sigue principios REST.

### JSONPlaceholder
API REST pública de prueba que proporciona datos fake.

**Endpoints:**
- `/users/:id` - Obtener usuario
- `/users/:id/posts` - Obtener posts de usuario

### Fetch API
API nativa del navegador para hacer peticiones HTTP.

**Ejemplo:**
```javascript
const response = await fetch('https://api.example.com/users');
const data = await response.json();
```

### Promise
Objeto que representa la eventual finalización o falla de una operación asíncrona.

**Estados:**
- Pending (pendiente)
- Fulfilled (cumplida)
- Rejected (rechazada)

### Promise.all
Método que ejecuta múltiples promesas en paralelo.

**Ejemplo:**
```javascript
const [user, posts] = await Promise.all([
    getUser(id),
    getPosts(id)
]);
```

### Async/Await
Sintaxis para trabajar con promesas de manera más legible.

**Ejemplo:**
```javascript
async function fetchData() {
    const data = await api.get('/users');
    return data;
}
```

---

## 🧪 Testing (Conceptos)

### Unit Test
Test que verifica el comportamiento de una unidad de código aislada.

### Integration Test
Test que verifica la interacción entre múltiples unidades de código.

### E2E Test (End-to-End)
Test que verifica el flujo completo de la aplicación desde la perspectiva del usuario.

### Test Coverage
Porcentaje de código cubierto por tests.

### Vitest
Framework de testing rápido para proyectos Vite.

### React Testing Library
Librería para testear componentes React de manera que simula el uso real.

---

## 🔧 Patrones de Diseño

### SOLID Principles
Conjunto de 5 principios de diseño orientado a objetos.

- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

### DRY (Don't Repeat Yourself)
Principio que promueve la reutilización de código.

### KISS (Keep It Simple, Stupid)
Principio que favorece soluciones simples sobre complejas.

### YAGNI (You Aren't Gonna Need It)
Principio que desaconseja agregar funcionalidad hasta que sea necesaria.

---

## 🚀 DevOps y Despliegue

### GitHub Pages
Servicio de hosting estático gratuito de GitHub.

### Build
Proceso de compilar y optimizar código para producción.

### Bundle
Archivo o conjunto de archivos resultantes del proceso de build.

### Tree-Shaking
Eliminación de código no utilizado durante el build.

### Code-Splitting
División del bundle en múltiples archivos para carga bajo demanda.

### Hot Module Replacement (HMR)
Actualización de módulos en el navegador sin recargar la página completa.

### CI/CD (Continuous Integration/Continuous Deployment)
Práctica de automatizar tests y despliegues.

---

## 📊 Métricas y Performance

### Lighthouse
Herramienta de Google para auditar performance, accesibilidad y SEO.

### Bundle Size
Tamaño total del código JavaScript y CSS enviado al navegador.

### Time to Interactive (TTI)
Tiempo hasta que la página es completamente interactiva.

### First Contentful Paint (FCP)
Tiempo hasta que se renderiza el primer contenido.

---

## 🔐 Seguridad

### XSS (Cross-Site Scripting)
Vulnerabilidad que permite inyectar scripts maliciosos.

### CSRF (Cross-Site Request Forgery)
Ataque que fuerza a un usuario a ejecutar acciones no deseadas.

### Content Security Policy (CSP)
Header HTTP que previene ataques XSS especificando fuentes confiables.

### CORS (Cross-Origin Resource Sharing)
Mecanismo que permite solicitudes entre diferentes orígenes.

---

## 📝 Convenciones de Naming

### camelCase
Primera palabra en minúscula, siguientes capitalizadas.

**Ejemplo:** `userName`, `fetchData`

### PascalCase
Todas las palabras capitalizadas.

**Ejemplo:** `UserProfile`, `MainLayout`

### kebab-case
Palabras separadas por guiones.

**Ejemplo:** `user-profile.jsx`, `main-layout.css`

### UPPER_SNAKE_CASE
Palabras en mayúsculas separadas por guiones bajos.

**Ejemplo:** `API_BASE_URL`, `MAX_RETRIES`

---

## 🎓 Acrónimos Comunes

| Acrónimo | Significado |
|----------|-------------|
| **SPA** | Single Page Application |
| **API** | Application Programming Interface |
| **REST** | Representational State Transfer |
| **HTTP** | Hypertext Transfer Protocol |
| **JSON** | JavaScript Object Notation |
| **JSX** | JavaScript XML |
| **DOM** | Document Object Model |
| **CSS** | Cascading Style Sheets |
| **HTML** | Hypertext Markup Language |
| **UI** | User Interface |
| **UX** | User Experience |
| **RTK** | Redux Toolkit |
| **HMR** | Hot Module Replacement |
| **CI/CD** | Continuous Integration/Continuous Deployment |
| **SEO** | Search Engine Optimization |
| **WCAG** | Web Content Accessibility Guidelines |
| **ARIA** | Accessible Rich Internet Applications |

---

## 📚 Referencias

- [React Documentation](https://react.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript Info](https://javascript.info/)

---

**Firma Digital:**  
🏛️ Arquitecto de Software Senior  
📅 12 de Enero, 2026
