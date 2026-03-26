# 💻 Ejercicios Prácticos de React

> **Nivel:** Intermedio  
> **Duración:** 3-5 horas  
> **Prerrequisitos:** Conocimientos básicos de JavaScript y React

---

## 🎯 Objetivos de Aprendizaje

1. Manipular el DOM con JSX y componentes
2. Gestionar estado con useState y useReducer
3. Manejar efectos secundarios con useEffect
4. Crear hooks personalizados
5. Implementar contextos y providers
6. Aplicar patrones de rendering condicional

---

## 📋 Ejercicio 1: Contador Simple

### Objetivo
Crear un contador que increment, decremente y reinicie.

### Requisitos
- Mostrar valor actual
- Botón para incrementar (+1)
- Botón para decrementar (-1)
- Botón para reiniciar a 0
- Estilizar con Tailwind

### Solución
```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 space-x-2">
      <span className="text-2xl">Count: {count}</span>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <button onClick={() => setCount(c => c - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### Desafío Extra
- Limitar el conteo entre 0 y 100
- Agregar animaciones con CSS

---

## 📋 Ejercicio 2: Lista de Tareas (Todo List)

### Objetivo
Crear una lista interactiva de tareas con agregar, marcar y eliminar.

### Requisitos
- Input para nueva tarea
- Lista de tareas pendientes
- Marcar tarea como completada
- Eliminar tarea
- Contador de tareas pendientes

### Estructura Recomendada
```
src/features/todo/
├── components/
│   ├── TodoItem.jsx
│   └── TodoList.jsx
├── hooks/
│   └── useTodo.js
└── index.js
```

### Solución Parcial (useTodo hook)
```javascript
// src/features/todo/hooks/useTodo.js
import { useState, useCallback } from "react";

export function useTodo() {
  const [todos, setTodos] = useState([]);

  const addTodo = useCallback((text) => {
    setTodos(prev => [...prev, { 
      id: Date.now(), 
      text, 
      completed: false 
    }]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  return { todos, addTodo, toggleTodo, deleteTodo };
}
```

### Desafío Extra
- Persistir en localStorage
- Agregar filtro: todas, pendientes, completadas

---

## 📋 Ejercicio 3: Buscador con API

### Objetivo
Consumir una API pública y mostrar resultados.

### API a Usar
```javascript
// JSONPlaceholder
const USERS_API = "https://jsonplaceholder.typicode.com/users";
const POSTS_API = "https://jsonplaceholder.typicode.com/posts?userId=";
```

### Requisitos
- Input de búsqueda
- Llamada a API con fetch
- Loading state
- Mostrar resultados
- Manejar errores

### Solución
```javascript
// src/hooks/useUserSearch.js
import { useState, useEffect } from "react";

export function useUserSearch(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  return { user, loading, error };
}
```

---

## 📋 Ejercicio 4: Carrito de Compras con Reducer

### Objetivo
Implementar un carrito usando useReducer para lógica compleja.

### Requisitos
- Agregar productos
- Cambiar cantidad
- Eliminar productos
- Calcular total
- Aplicar descuento si total > $100

### Acciones del Reducer
```javascript
const ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QTY: "UPDATE_QTY",
  CLEAR_CART: "CLEAR_CART"
};

function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id
              ? { ...i, qty: i.qty + 1 }
              : i
          )
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    
    case ACTIONS.UPDATE_QTY:
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, qty: action.payload.qty }
            : i
        )
      };
    
    // ... más casos
    
    default:
      return state;
  }
}
```

---

## 📋 Ejercicio 5: Theme Toggle con Context

### Objetivo
Crear un sistema de temas usando React Context.

### Estructura
```javascript
// src/contexts/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggle = () => setIsDark(d => !d);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

### Uso en Componente
```jsx
function Header() {
  const { isDark, toggle } = useTheme();
  
  return (
    <button onClick={toggle}>
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
```

---

## 📋 Ejercicio 6: Componente con Error Boundary

### Objetivo
Manejar errores en componentes hijos.

### Implementación
```javascript
// src/components/ErrorBoundary.jsx
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-700">
          <h2>Algo salió mal</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Reintentar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

---

## 📋 Ejercicio 7: Infinite Scroll

### Objetivo
Implementar scroll infinito con Intersection Observer.

### Código Base
```javascript
// src/hooks/useInfiniteScroll.js
import { useEffect, useRef, useState } from "react";

export function useInfiniteScroll(fetchMore, hasMore) {
  const observerRef = useRef();
  const [lastElementRef, setLastElementRef] = useState(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchMore();
      }
    });

    if (lastElementRef) {
      observer.observe(lastElementRef);
    }

    return () => observer.disconnect();
  }, [lastElementRef, hasMore, fetchMore]);

  return [setLastElementRef];
}
```

---

## 📋 Ejercicio 8: Formulario con Validación

### Objetivo
Crear formulario con validación en tiempo real.

### Requisitos
- Campos: nombre, email, contraseña
- Validación: nombre min 3 chars, email válido, contraseña min 8 chars
- Mensajes de error
- Submit solo si todo válido

### Solución
```javascript
function useFormValidation(initial) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    switch (name) {
      case "name":
        return value.length < 3 ? "Mínimo 3 caracteres" : "";
      case "email":
        return !/^\S+@\S+\.\S+$/.test(value) ? "Email inválido" : "";
      case "password":
        return value.length < 8 ? "Mínimo 8 caracteres" : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  const isValid = () => {
    const newErrors = Object.keys(values).reduce((acc, key) => {
      acc[key] = validate(key, values[key]);
      return acc;
    }, {});
    setErrors(newErrors);
    return !Object.values(newErrors).some(e => e);
  };

  return { values, errors, handleChange, isValid };
}
```

---

## ✅ Ejercicios Completados

| # | Ejercicio | Conceptos Clave |
|---|-----------|-----------------|
| 1 | Contador | useState, event handlers |
| 2 | Todo List | useState, arrays, map |
| 3 | Buscador API | useEffect, fetch, async/await |
| 4 | Carrito | useReducer, lógica compleja |
| 5 | Theme Toggle | Context, Provider pattern |
| 6 | Error Boundary | Component, error handling |
| 7 | Infinite Scroll | Intersection Observer |
| 8 | Form Validation | Validación en tiempo real |

---

## 🚀 Próximos Pasos

1. Implementar todos los ejercicios
2. Agregar tests con Vitest
3. Aplicar los patrones a tu proyecto real

> **Nota:** Cada ejercicio aumenta en complejidad. Se recomienda completar en orden.
