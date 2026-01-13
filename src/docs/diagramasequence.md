# 🔄 Diagrama de Secuencia - Búsqueda de Usuario

> **Proyecto:** myprojectapi02  
> **Arquitectura:** Feature-Based Architecture  
> **Última Actualización:** 12 de Enero, 2026

---

## 📊 Flujo Completo de Búsqueda de Usuario

Este diagrama muestra el flujo completo desde que el usuario hace clic en "Buscar" hasta que se muestran los resultados.

```mermaid
sequenceDiagram
    actor Usuario
    participant UI as UserSearchPage<br/>(features/user-search)
    participant Hook as useUser Hook<br/>(features/user-search/hooks)
    participant Redux as Redux Store<br/>(redux/store.js)
    participant Slice as userSlice<br/>(features/user-search/redux)
    participant Service as user-service<br/>(features/user-search/services)
    participant API_U as user.api<br/>(features/user-search/api)
    participant API_P as post.api<br/>(features/user-search/api)
    participant Config as api.config<br/>(lib)
    participant External as JSONPlaceholder API

    Usuario->>UI: Ingresa ID y click "Buscar"
    UI->>Hook: handleSearch(userId)
    Hook->>Redux: dispatch(fetchUserAndPosts(userId))
    
    Redux->>Slice: Action: fetchUserAndPosts.pending
    Slice->>Slice: state.status = 'loading'
    Slice-->>Hook: State updated
    Hook-->>UI: { status: 'loading' }
    UI->>UI: Renderiza Skeletons
    
    Redux->>Slice: Execute AsyncThunk
    Slice->>Service: fetchUserProfile(userId)
    
    par Llamadas Paralelas (Promise.all)
        Service->>API_U: getUser(userId)
        API_U->>Config: fetchFromApi('users/:id')
        Config->>External: GET /users/:id
        External-->>Config: User data
        Config-->>API_U: User object
        API_U-->>Service: User object
    and
        Service->>API_P: getPostsByUser(userId)
        API_P->>Config: fetchFromApi('posts?userId=:id')
        Config->>External: GET /posts?userId=:id
        External-->>Config: Posts array
        Config-->>API_P: Posts array
        API_P-->>Service: Posts array
    end
    
    Service->>Service: Validate user data<br/>(check if empty object)
    Service-->>Slice: { user, posts }
    
    Slice->>Slice: Action: fetchUserAndPosts.fulfilled
    Slice->>Slice: state.status = 'succeeded'
    Slice->>Slice: state.user = user
    Slice->>Slice: state.posts = posts
    Slice-->>Hook: State updated
    Hook-->>UI: { user, posts, status: 'succeeded' }
    UI->>UI: Renderiza UserProfile + PostList
    UI-->>Usuario: Muestra datos del usuario
```

---

## 🔄 Flujo de Estados

```mermaid
stateDiagram-v2
    [*] --> Idle: App initialization
    
    Idle --> Loading: Usuario hace búsqueda
    Loading --> Succeeded: API retorna datos válidos
    Loading --> Failed: Error de red/servidor
    Loading --> NotFound: Usuario no existe (404 o vacío)
    
    Succeeded --> Loading: Nueva búsqueda
    Failed --> Loading: Retry
    NotFound --> Loading: Nueva búsqueda
    
    note right of Loading
        UI: Muestra Skeletons
        Button: Deshabilitado
    end note
    
    note right of Succeeded
        UI: UserProfile + PostList
        Data: user, posts
    end note
    
    note right of Failed
        UI: ErrorMessage
        Action: Retry button
    end note
    
    note right of NotFound
        UI: NotFoundCard
        Suggestion: Intentar otro ID
    end note
```

---

## 📁 Estructura de Archivos Involucrados

### Feature: user-search

```
src/features/user-search/
├── UserSearchPage.jsx          # UI Component (Container)
├── hooks/
│   └── useUser.js              # Custom Hook (Logic Layer)
├── redux/
│   └── userSlice.js            # Redux Slice (State Management)
├── services/
│   └── user-service.js         # Business Logic (Service Layer)
└── api/
    ├── user.api.js             # User API Client
    └── post.api.js             # Post API Client
```

### Global Configuration

```
src/
├── lib/
│   └── api.config.js           # Base API Configuration
└── redux/
    └── store.js                # Redux Store Configuration
```

---

## 🎯 Responsabilidades por Capa

### 1. UI Layer (UserSearchPage.jsx)
- Renderizar interfaz de usuario
- Capturar eventos del usuario
- Mostrar estados visuales (loading, success, error)
- **NO** contiene lógica de negocio

### 2. Logic Layer (useUser.js)
- Encapsular lógica de interacción con Redux
- Gestionar estado local (inputValue, searchId)
- Proporcionar handlers (handleSearch, handleRetry)
- Conectar UI con Redux Store

### 3. State Management (userSlice.js)
- Definir estructura del estado
- Gestionar estados asíncronos (pending, fulfilled, rejected)
- Actualizar estado de forma inmutable
- **NO** contiene lógica de negocio

### 4. Service Layer (user-service.js)
- Orquestar llamadas a múltiples APIs
- Aplicar lógica de negocio (validaciones, transformaciones)
- Ejecutar llamadas en paralelo (Promise.all)
- **NO** accede directamente a Redux

### 5. Data Access Layer (*.api.js)
- Realizar llamadas HTTP
- Manejar errores de red
- Retornar datos crudos
- **NO** contiene lógica de negocio

### 6. Configuration Layer (api.config.js)
- Configuración base de fetch
- Manejo de errores HTTP
- Transformación de respuestas
- **NO** conoce endpoints específicos

---

## 🔍 Flujo de Datos Detallado

### Paso 1: Usuario Inicia Búsqueda
```javascript
// UserSearchPage.jsx
<Button onClick={handleSearch}>Buscar</Button>
```

### Paso 2: Hook Despacha Acción
```javascript
// useUser.js
const handleSearch = useCallback(() => {
    dispatch(fetchUserAndPosts(Number(inputValue)));
}, [dispatch, inputValue]);
```

### Paso 3: Redux Ejecuta AsyncThunk
```javascript
// userSlice.js
export const fetchUserAndPosts = createAsyncThunk(
    'user/fetchUserAndPosts',
    async (userId, { rejectWithValue }) => {
        const data = await fetchUserProfile(userId);
        return data;
    }
);
```

### Paso 4: Servicio Orquesta APIs
```javascript
// user-service.js
export const fetchUserProfile = async (userId) => {
    const [user, posts] = await Promise.all([
        getUser(userId),
        getPostsByUser(userId),
    ]);
    
    if (user && Object.keys(user).length === 0) {
        return { user: null, posts: [] };
    }
    
    return { user, posts };
};
```

### Paso 5: APIs Realizan Llamadas
```javascript
// user.api.js
export const getUser = (userId) => {
    return fetchFromApi(`users/${userId}`);
};

// post.api.js
export const getPostsByUser = (userId) => {
    return fetchFromApi(`posts?userId=${userId}`);
};
```

### Paso 6: Configuración Base Ejecuta Fetch
```javascript
// api.config.js
export const fetchFromApi = async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    
    return response.json();
};
```

---

## ✅ Ventajas de Esta Arquitectura

1. **Separación de Responsabilidades**
   - Cada capa tiene una responsabilidad única y bien definida

2. **Testabilidad**
   - Cada capa puede testearse de forma aislada
   - Fácil mockear dependencias

3. **Mantenibilidad**
   - Cambios en una capa no afectan a otras
   - Código organizado y predecible

4. **Escalabilidad**
   - Fácil agregar nuevos features
   - Estructura consistente

5. **Reutilización**
   - Servicios y APIs pueden reutilizarse
   - Custom Hooks encapsulan lógica compleja

---

**Última Actualización:** 12 de Enero, 2026  
**Arquitectura:** Feature-Based + Layered
