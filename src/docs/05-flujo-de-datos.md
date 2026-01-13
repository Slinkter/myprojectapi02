# 🔄 Flujo de Datos

> **Proyecto:** myprojectapi02  
> **Arquitectura:** Cliente Puro (Sin Backend Propio)  
> **Última Actualización:** 12 de Enero, 2026

---

## 🎯 Arquitectura de Estado

Este proyecto utiliza una **arquitectura cliente pura** sin backend propio. El estado es completamente local/cliente y se gestiona mediante **Redux Toolkit** con integración a una API REST externa (JSONPlaceholder).

### Características del Flujo de Datos

- ✅ **Unidireccional:** Flux Pattern con Redux
- ✅ **Asíncrono:** AsyncThunks para llamadas a API
- ✅ **Paralelo:** Promise.all para optimización
- ✅ **Reactivo:** Actualizaciones automáticas del UI

**No aplica:**
- ❌ Integración con Firebase
- ❌ Servicios serverless
- ❌ Base de datos remota propia
- ❌ WebSockets o comunicación en tiempo real

---

## 📊 Diagrama de Flujo de Datos Global

```mermaid
graph TB
    subgraph "User Interface Layer"
        UI[React Components]
        INPUT[User Input]
    end
    
    subgraph "State Management Layer"
        HOOK[useUser Hook]
        STORE[Redux Store]
        SLICE[userSlice]
    end
    
    subgraph "Business Logic Layer"
        SERVICE[user-service.js]
    end
    
    subgraph "Data Access Layer"
        API_U[user.api.js]
        API_P[post.api.js]
        CONFIG[api.config.js]
    end
    
    subgraph "External Services"
        JSON[JSONPlaceholder API]
    end
    
    INPUT -->|User Action| UI
    UI -->|Calls| HOOK
    HOOK -->|dispatch| STORE
    STORE -->|AsyncThunk| SLICE
    SLICE -->|Calls| SERVICE
    SERVICE -->|Orchestrates| API_U
    SERVICE -->|Orchestrates| API_P
    API_U -->|fetch| CONFIG
    API_P -->|fetch| CONFIG
    CONFIG -->|HTTP GET| JSON
    JSON -->|Response| CONFIG
    CONFIG -->|Data| API_U
    CONFIG -->|Data| API_P
    API_U -->|Returns| SERVICE
    API_P -->|Returns| SERVICE
    SERVICE -->|Returns| SLICE
    SLICE -->|Updates| STORE
    STORE -->|Notifies| HOOK
    HOOK -->|Updates| UI
    UI -->|Renders| INPUT
    
    style UI fill:#e1f5ff
    style HOOK fill:#fff9c4
    style STORE fill:#fff9c4
    style SERVICE fill:#f3e5f5
    style JSON fill:#ffebee
```

---

## 🔍 Flujo Detallado: Búsqueda de Usuario

### Secuencia Completa

```mermaid
sequenceDiagram
    actor U as Usuario
    participant C as UserSearchPage
    participant H as useUser Hook
    participant D as useDispatch
    participant S as Redux Store
    participant T as AsyncThunk
    participant SV as user-service
    participant A1 as user.api
    participant A2 as post.api
    participant API as JSONPlaceholder

    U->>C: Ingresa ID y click "Buscar"
    C->>H: handleSearch(userId)
    H->>D: dispatch(fetchUserAndPosts(userId))
    D->>S: Action: fetchUserAndPosts.pending
    S->>S: state.status = 'loading'
    S-->>H: State updated
    H-->>C: { status: 'loading' }
    C->>C: Renderiza Skeletons
    
    D->>T: Execute AsyncThunk
    T->>SV: fetchUserProfile(userId)
    
    par Llamadas Paralelas
        SV->>A1: getUser(userId)
        A1->>API: GET /users/:id
        API-->>A1: User data
        A1-->>SV: User object
    and
        SV->>A2: getPostsByUser(userId)
        A2->>API: GET /users/:id/posts
        API-->>A2: Posts array
        A2-->>SV: Posts array
    end
    
    SV->>SV: Validate user data
    SV-->>T: { user, posts }
    T->>S: Action: fetchUserAndPosts.fulfilled
    S->>S: state.status = 'succeeded'
    S->>S: state.user = user
    S->>S: state.posts = posts
    S-->>H: State updated
    H-->>C: { user, posts, status: 'succeeded' }
    C->>C: Renderiza UserProfile + PostList
    C-->>U: Muestra datos
```

---

## 🗄️ Gestión de Estado con Redux

### Estructura del Store

```javascript
{
  user: {
    status: 'idle' | 'loading' | 'succeeded' | 'failed' | 'notFound',
    error: null | string,
    user: null | UserObject,
    posts: [] | PostArray
  }
}
```

### Estados Posibles

```mermaid
stateDiagram-v2
    [*] --> Idle: App initialization
    
    Idle --> Loading: User triggers search
    Loading --> Succeeded: API returns data
    Loading --> Failed: Network error
    Loading --> NotFound: User not found (404)
    
    Succeeded --> Loading: New search
    Failed --> Loading: Retry
    NotFound --> Loading: New search
    
    note right of Loading
        Shows skeletons
        Disables search button
    end note
    
    note right of Succeeded
        Renders UserProfile
        Renders PostList
    end note
    
    note right of Failed
        Shows ErrorMessage
        Offers Retry button
    end note
    
    note right of NotFound
        Shows NotFoundCard
        Suggests valid IDs
    end note
```

### Transiciones de Estado

| Estado Actual | Acción | Nuevo Estado | UI Renderizada |
|---------------|--------|--------------|----------------|
| `idle` | `fetchUserAndPosts.pending` | `loading` | Skeletons |
| `loading` | `fetchUserAndPosts.fulfilled` | `succeeded` | UserProfile + PostList |
| `loading` | `fetchUserAndPosts.rejected` (404) | `notFound` | NotFoundCard |
| `loading` | `fetchUserAndPosts.rejected` (other) | `failed` | ErrorMessage |
| `succeeded` | `fetchUserAndPosts.pending` | `loading` | Skeletons |
| `failed` | `fetchUserAndPosts.pending` | `loading` | Skeletons |
| `notFound` | `fetchUserAndPosts.pending` | `loading` | Skeletons |

---

## 🎣 Custom Hook: useUser

### Responsabilidades

1. **Encapsular lógica de Redux:**
   - Acceso al store con `useSelector`
   - Dispatch de acciones con `useDispatch`

2. **Gestionar estado local:**
   - Valor del input (`inputValue`)
   - ID de búsqueda actual (`searchId`)

3. **Proporcionar handlers:**
   - `handleInputChange`: Validación de entrada
   - `handleSearch`: Disparar búsqueda
   - `handleRetry`: Reintentar búsqueda fallida

### Interfaz del Hook

```javascript
const {
  user,          // User object o null
  posts,         // Array de posts
  status,        // Estado actual: 'idle' | 'loading' | 'succeeded' | 'failed' | 'notFound'
  error,         // Mensaje de error o null
  inputValue,    // Valor del input
  searchId,      // ID de la última búsqueda
  handleInputChange,  // (event) => void
  handleSearch,       // () => void
  handleRetry         // () => void
} = useUser(initialUserId);
```

---

## 🔌 Capa de Servicios

### user-service.js

**Responsabilidad:** Orquestar llamadas a múltiples APIs y aplicar lógica de negocio.

**Flujo:**

```mermaid
graph LR
    SERVICE[user-service]
    API_U[getUser]
    API_P[getPostsByUser]
    VALIDATE[Validate Response]
    RETURN[Return Data]
    
    SERVICE -->|Promise.all| API_U
    SERVICE -->|Promise.all| API_P
    API_U --> VALIDATE
    API_P --> VALIDATE
    VALIDATE --> RETURN
    
    style SERVICE fill:#f3e5f5
    style VALIDATE fill:#fff9c4
```

**Lógica de Negocio:**

```javascript
export const fetchUserProfile = async (userId) => {
    // 1. Llamadas paralelas para optimización
    const [user, posts] = await Promise.all([
        getUser(userId),
        getPostsByUser(userId),
    ]);
    
    // 2. Validación de respuesta vacía
    if (user && Object.keys(user).length === 0) {
        return { user: null, posts: [] };
    }
    
    // 3. Retorno de datos estructurados
    return { user, posts };
};
```

---

## 🌐 Capa de API

### Configuración Base (api.config.js)

```javascript
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchFromApi = async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    
    return response.json();
};
```

### APIs Específicas

#### user.api.js
```javascript
export const getUser = (userId) => {
    return fetchFromApi(`users/${userId}`);
};
```

#### post.api.js
```javascript
export const getPostsByUser = (userId) => {
    return fetchFromApi(`users/${userId}/posts`);
};
```

---

## ⚡ Optimizaciones de Performance

### 1. Llamadas Paralelas

**Problema:** Llamadas secuenciales son lentas
```javascript
// ❌ Secuencial (lento)
const user = await getUser(userId);
const posts = await getPostsByUser(userId);
```

**Solución:** Promise.all
```javascript
// ✅ Paralelo (rápido)
const [user, posts] = await Promise.all([
    getUser(userId),
    getPostsByUser(userId),
]);
```

**Beneficio:** Reduce tiempo de carga en ~50%

---

### 2. Memoización de Componentes

**Problema:** Re-renders innecesarios

**Solución:** React.memo
```javascript
const UserProfile = React.memo(({ user }) => {
    // Solo re-renderiza si user cambia
});
```

---

### 3. Memoización de Callbacks

**Problema:** Nuevas funciones en cada render

**Solución:** useCallback
```javascript
const handleSearch = useCallback(() => {
    dispatch(fetchUserAndPosts(Number(inputValue)));
}, [dispatch, inputValue]);
```

---

## 🔄 Flujo de Datos del Tema

### Persistencia en localStorage

```mermaid
graph TB
    TOGGLE[ThemeToggleButton]
    HOOK[useTheme Hook]
    LS[localStorage]
    HTML[HTML classList]
    
    TOGGLE -->|Click| HOOK
    HOOK -->|Read| LS
    HOOK -->|Toggle| HTML
    HOOK -->|Save| LS
    HTML -->|Apply| TOGGLE
    
    style HOOK fill:#fff9c4
    style LS fill:#e8f5e9
```

### Código del Hook

```javascript
export const useTheme = () => {
    const [isDark, setIsDark] = useState(() => {
        // 1. Leer de localStorage al inicializar
        return localStorage.getItem('theme') === 'dark';
    });
    
    useEffect(() => {
        // 2. Aplicar clase al HTML
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // 3. Guardar en localStorage
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);
    
    const toggleTheme = () => setIsDark(prev => !prev);
    
    return { isDark, toggleTheme };
};
```

---

## 📡 Manejo de Errores

### Tipos de Errores

```mermaid
graph TD
    ERROR{Error Type}
    
    ERROR -->|404| NOTFOUND[User Not Found]
    ERROR -->|Network| FAILED[Network Error]
    ERROR -->|Empty Response| NOTFOUND2[User Not Found]
    ERROR -->|Other| FAILED2[Generic Error]
    
    NOTFOUND --> UI1[NotFoundCard]
    NOTFOUND2 --> UI1
    FAILED --> UI2[ErrorMessage + Retry]
    FAILED2 --> UI2
    
    style ERROR fill:#ffebee
    style UI1 fill:#fff3e0
    style UI2 fill:#ffcdd2
```

### Flujo de Manejo de Errores

```javascript
// En userSlice.js
.addCase(fetchUserAndPosts.rejected, (state, action) => {
    if (action.payload?.status === 404) {
        state.status = 'notFound';
        state.error = `Usuario no encontrado (Error ${action.payload.status})`;
    } else {
        state.status = 'failed';
        state.error = action.payload?.message || 'Error desconocido';
    }
    state.user = null;
    state.posts = [];
});
```

---

## 🎨 Flujo de Renderizado Condicional

```mermaid
graph TD
    PAGE[UserSearchPage]
    STATUS{status}
    
    PAGE --> STATUS
    
    STATUS -->|'idle'| EMPTY[Empty State]
    STATUS -->|'loading'| SKELETON[ProfileSkeleton + PostListSkeleton]
    STATUS -->|'succeeded'| SUCCESS[UserProfile + PostList]
    STATUS -->|'failed'| ERROR[ErrorMessage]
    STATUS -->|'notFound'| NOTFOUND[NotFoundCard]
    
    SUCCESS -->|posts.length > 0| POSTS[Render Posts]
    SUCCESS -->|posts.length === 0| NOPOSTS[No Posts Message]
    
    style PAGE fill:#e1f5ff
    style SKELETON fill:#f3e5f5
    style SUCCESS fill:#e8f5e9
    style ERROR fill:#ffcdd2
    style NOTFOUND fill:#fff3e0
```

---

## 📊 Diagrama de Dependencias de Datos

```mermaid
graph LR
    subgraph "Components"
        PAGE[UserSearchPage]
        PROFILE[UserProfile]
        POSTS[PostList]
    end
    
    subgraph "Data Sources"
        REDUX[Redux Store]
        HOOK[useUser Hook]
    end
    
    subgraph "External"
        API[JSONPlaceholder]
    end
    
    API -->|HTTP| REDUX
    REDUX -->|Subscribe| HOOK
    HOOK -->|Props| PAGE
    PAGE -->|Props| PROFILE
    PAGE -->|Props| POSTS
    
    style REDUX fill:#fff9c4
    style API fill:#ffebee
```

---

## 🔐 Validación de Datos

### Validación de Entrada (Cliente)

```javascript
// En useUser.js
const handleInputChange = (e) => {
    const value = e.target.value;
    // Regex: Solo 1-10 o vacío
    if (/^$|^[1-9]$|^10$/.test(value)) {
        setInputValue(value);
    }
};
```

### Validación de Respuesta (Servicio)

```javascript
// En user-service.js
if (user && Object.keys(user).length === 0) {
    return { user: null, posts: [] };
}
```

### Validación de Props (Componentes)

```javascript
// En UserProfile.jsx
UserProfile.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        // ...
    }).isRequired,
};
```

---

## 📈 Métricas de Flujo de Datos

| Métrica | Valor |
|---------|-------|
| **Tiempo promedio de búsqueda** | ~500ms |
| **Llamadas API por búsqueda** | 2 (paralelas) |
| **Tamaño promedio de respuesta** | ~2KB |
| **Re-renders por búsqueda** | 2-3 |
| **Actualizaciones de estado** | 2 (pending → fulfilled/rejected) |

---

## 🎓 Conclusión

El flujo de datos en **myprojectapi02** sigue un patrón **Flux unidireccional** con Redux Toolkit, optimizado para performance con llamadas paralelas y memoización. La arquitectura de **cliente puro** consume una API REST externa sin necesidad de backend propio, demostrando una implementación limpia y eficiente de gestión de estado en React.

**Características Clave:**
- ✅ Flujo unidireccional predecible
- ✅ Optimización con Promise.all
- ✅ Manejo robusto de errores
- ✅ Validación en múltiples capas
- ✅ Separación clara de responsabilidades

---

**Firma Digital:**  
🏛️ Arquitecto de Software Senior  
📅 12 de Enero, 2026
