# 🏗️ Guía: Cómo Agregar Nuevos Features

> **Enfoque:** Feature-Driven Development  
> **Arquitectura:** Domain-Driven Design + Clean Architecture

---

## 📋 Paso 1: Definir el Feature

### Documentar Antes de Codificar

```markdown
## Feature: [Nombre]

### Descripción
[Qué hace y por qué es necesario]

### Requerimientos
- [ ] RF1: [Requerimiento funcional]
- [ ] RF2: [Requerimiento funcional]

### No Scope
- [Lo que NO incluye el feature]

### Dependencias
- [APIs externas, paquetes, otros features]
```

### Ejemplo
```markdown
## Feature: Historial de Búsqueda

### Descripción
Guardar el historial de búsquedas recientes del usuario para acceso rápido.

### Requerimientos
- [ ] Guardar última búsqueda en localStorage
- [ ] Mostrar hasta 5 búsquedas recientes
- [ ] Permitir borrar historial
- [ ] Persistir entre sesiones

### No Scope
- [ ] Sincronización con servidor
- [ ] Búsquedas en tiempo real

### Dependencias
- localStorage API
- useSearchInput hook existente
```

---

## 🗂️ Paso 2: Estructura de Carpetas

### Patrón Feature-Based

```
src/features/[feature-name]/
├── api/                    # Llamadas HTTP
│   └── [feature-name].api.js
├── components/             # Componentes específicos
│   ├── [ComponentName].jsx
│   └── index.js
├── domain/                 # Lógica de negocio
│   ├── [feature-name].mappers.js
│   └── types.js
├── hooks/                  # Hooks personalizados
│   └── use[FeatureName].js
├── services/               # Servicios
│   └── [feature-name].service.js
├── store/                  # Redux slice
│   └── [feature-name]Slice.js
└── index.js               # Barrel file
```

### Ejemplo Práctico
```
src/features/search-history/
├── api/
│   └── history.api.js
├── components/
│   ├── HistoryList.jsx
│   ├── HistoryItem.jsx
│   └── index.js
├── domain/
│   └── history.mappers.js
├── hooks/
│   └── useSearchHistory.js
├── store/
│   └── historySlice.js
└── index.js
```

---

## 🎯 Paso 3: Implementar el Feature

### 3.1 Crear el Redux Slice

```javascript
// src/features/search-history/store/historySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const STORAGE_KEY = "search_history";

const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (history) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const historySlice = createSlice({
  name: "searchHistory",
  initialState: {
    items: loadFromStorage(),
    maxItems: 5
  },
  reducers: {
    addToHistory: (state, action) => {
      const { query, userId } = action.payload;
      const newItem = { query, userId, timestamp: Date.now() };
      
      // Remover duplicados
      state.items = state.items.filter(i => i.query !== query);
      
      // Agregar al inicio
      state.items.unshift(newItem);
      
      // Limitar cantidad
      if (state.items.length > state.maxItems) {
        state.items = state.items.slice(0, state.maxItems);
      }
      
      saveToStorage(state.items);
    },
    removeFromHistory: (state, action) => {
      state.items = state.items.filter(i => i.timestamp !== action.payload);
      saveToStorage(state.items);
    },
    clearHistory: (state) => {
      state.items = [];
      saveToStorage(state.items);
    }
  }
});

export const { addToHistory, removeFromHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;
```

### 3.2 Crear el Hook

```javascript
// src/features/search-history/hooks/useSearchHistory.js
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  addToHistory, 
  removeFromHistory, 
  clearHistory 
} from "../store/historySlice";

export function useSearchHistory() {
  const dispatch = useDispatch();
  const history = useSelector(state => state.searchHistory.items);

  const add = useCallback((query, userId) => {
    if (query && userId) {
      dispatch(addToHistory({ query, userId: parseInt(userId) }));
    }
  }, [dispatch]);

  const remove = useCallback((timestamp) => {
    dispatch(removeFromHistory(timestamp));
  }, [dispatch]);

  const clear = useCallback(() => {
    dispatch(clearHistory());
  }, [dispatch]);

  return {
    history,
    add,
    remove,
    clear,
    isEmpty: history.length === 0
  };
}
```

### 3.3 Crear Componentes

```jsx
// src/features/search-history/components/HistoryItem.jsx
import { memo } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

const HistoryItem = memo(({ item, onSelect, onRemove }) => {
  return (
    <div 
      className={cn(
        "flex items-center justify-between p-2 rounded-lg",
        "hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer",
        "transition-colors"
      )}
      onClick={() => onSelect(item.userId)}
    >
      <div className="flex flex-col">
        <span className="text-sm font-medium">User #{item.userId}</span>
        <span className="text-xs text-slate-500">{item.query}</span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(item.timestamp);
        }}
        className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  );
});

HistoryItem.displayName = "HistoryItem";
export default HistoryItem;
```

```jsx
// src/features/search-history/components/HistoryList.jsx
import { memo } from "react";
import HistoryItem from "./HistoryItem";
import { useSearchHistory } from "../hooks/useSearchHistory";

const HistoryList = memo(({ onSelectUser }) => {
  const { history, remove, clear } = useSearchHistory();

  if (history.length === 0) {
    return (
      <div className="p-4 text-center text-slate-500">
        No hay búsquedas recientes
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold">Historial</h3>
        <button 
          onClick={clear}
          className="text-xs text-red-500 hover:text-red-700"
        >
          Limpiar todo
        </button>
      </div>
      <div className="space-y-1">
        {history.map(item => (
          <HistoryItem
            key={item.timestamp}
            item={item}
            onSelect={onSelectUser}
            onRemove={remove}
          />
        ))}
      </div>
    </div>
  );
});

HistoryList.displayName = "HistoryList";
export default HistoryList;
```

### 3.4 Exportar en Barrel File

```javascript
// src/features/search-history/index.js
export { default as HistoryList } from "./components/HistoryList";
export { useSearchHistory } from "./hooks/useSearchHistory";
export { default as historyReducer } from "./store/historySlice";
```

---

## 🔌 Paso 4: Integrar en la App

### 4.1 Agregar al Store Principal

```javascript
// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userSearchReducer from "@/features/user-search/store/userSlice";
import historyReducer from "@/features/search-history/store/historySlice";

export const store = configureStore({
  reducer: {
    userSearch: userSearchReducer,
    searchHistory: historyReducer
  }
});
```

### 4.2 Integrar en Página

```jsx
// src/features/user-search/UserSearchPage.jsx
import { HistoryList } from "@/features/search-history";

function UserSearchPage() {
  const handleSearch = (userId) => {
    // ... existing search logic
    addToHistory(`Busqueda #${userId}`, userId);  // Nuevo
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <SearchBar />
        <UserView />
      </div>
      <div className="col-span-1">
        <HistoryList onSelectUser={handleSearch} />
      </div>
    </div>
  );
}
```

---

## 🧪 Paso 5: Testing

### Test del Slice
```javascript
// src/features/search-history/store/__tests__/historySlice.test.js
import { describe, it, expect, beforeEach } from "vitest";
import historyReducer, { 
  addToHistory, 
  removeFromHistory, 
  clearHistory 
} from "../historySlice";

describe("historySlice", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("agrega item al historial", () => {
    const state = historyReducer(
      { items: [], maxItems: 5 },
      addToHistory({ query: "test", userId: 1 })
    );
    expect(state.items).toHaveLength(1);
    expect(state.items[0].query).toBe("test");
  });

  it("remueve duplicados", () => {
    const initialState = {
      items: [{ query: "test", userId: 1, timestamp: 100 }],
      maxItems: 5
    };
    const state = historyReducer(
      initialState,
      addToHistory({ query: "test", userId: 1 })
    );
    expect(state.items).toHaveLength(1);
  });

  it("limita a maxItems", () => {
    const state = historyReducer(
      { items: [], maxItems: 3 },
      addToHistory({ query: "1", userId: 1 })
    );
    // ... agregar 3 más y verificar límite
  });
});
```

### Test del Hook
```javascript
// src/features/search-history/hooks/__tests__/useSearchHistory.test.js
import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useSearchHistory } from "../useSearchHistory";
import historyReducer from "../store/historySlice";

const createTestStore = () => 
  configureStore({ reducer: { searchHistory: historyReducer } });

const wrapper = ({ children }) => (
  <Provider store={createTestStore()}>{children}</Provider>
);

describe("useSearchHistory", () => {
  it("agrega búsqueda al historial", () => {
    const { result } = renderHook(() => useSearchHistory(), { wrapper });
    
    act(() => {
      result.current.add("test query", "1");
    });
    
    expect(result.current.history).toHaveLength(1);
  });
});
```

---

## ✅ Checklist de Feature

- [ ] Documentar requerimiento
- [ ] Crear estructura de carpetas
- [ ] Implementar Redux slice
- [ ] Crear hook personalizado
- [ ] Crear componentes
- [ ] Exportar en barrel file
- [ ] Integrar al store principal
- [ ] Integrar en página/componente
- [ ] Escribir tests unitarios
- [ ] Verificar con ESLint
- [ ] Verificar con React Doctor

---

## 📌 Convenciones

| Aspecto | Convención |
|---------|------------|
| **Nombres** | camelCase para archivos, PascalCase para componentes |
| **exports** | Usar barrel file para clean imports |
| **hooks** | Prefijo `use` |
| **slice** | Sufijo `Slice` |
| **tests** | Extensión `.test.js` en `__tests__/` |
| **styles** | Tailwind inline, sin CSS modules |
| **props** | PropTypes + TypeScript (si aplica) |
