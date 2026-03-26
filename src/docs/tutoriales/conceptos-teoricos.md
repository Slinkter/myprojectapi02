# 📚 Conceptos Teóricos de Ingeniería de Software

> **Nivel:** Intermedio-Avanzado  
> **Enfoque:** Fundamentos teóricos con aplicación práctica en React

---

## 🔄 1. Cycle of Computation (Ciclo de Computación)

### Definición
Patrón que describe el ciclo de vida de datos en una aplicación: **Input → Proceso → Output → Actualización**.

### En React
```
User Input → Event Handler → State Update → Re-render → UI Update
```

### Aplicación Práctica
```jsx
function SearchComponent() {
  const [query, setQuery] = useState("");     // Input
  const [results, setResults] = useState([]);  // Output
  
  useEffect(() => {
    // Proceso asíncrono
    fetchResults(query).then(setResults);
  }, [query]);                                // Trigger
  
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

### Diagrama
```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  Input  │───▶│ Proceso │───▶│ Output  │───▶│  UI     │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
     ▲                                                │
     └────────────────────────────────────────────────┘
                    (Re-render Loop)
```

---

## 🎯 2. Pure Functions (Funciones Puras)

### Definición
Una función es pura si:
1. **Mismo input → Mismo output** (determinista)
2. **No produce side effects** (no modifica estado externo)

### Ejemplos

#### ❌ Impura
```javascript
let counter = 0;

function increment() {
  counter++;           // Side effect: modifica variable externa
  return counter;
}
```

#### ✅ Pura
```javascript
function increment(n) {
  return n + 1;       // Sin side effects, mismo input = mismo output
}
```

### En React
```jsx
// ❌ Impuro - зависит del estado global
function UserName() {
  const user = useSelector(state => state.user);
  return <h1>{user.name}</h1>;
}

// ✅ Puro - solo usa sus props
function UserCard({ name, email }) {
  return <div>{name} - {email}</div>;
}
```

---

## 🔒 3. Inmutabilidad

### Definición
Principio de no modificar datos existentes, sino crear nuevas copias.

### Por qué importa en React
- React compara referencias para detectar cambios
- Inmutabilidad permite optimización con `memo()`
- Facilita el debugging (state history)

### Ejemplo Práctico

#### ❌ Mutación directa (MAL)
```javascript
const user = { name: "Juan", age: 25 };
user.age = 26;  // Modifica el objeto original
```

#### ✅ Inmutable (BIEN)
```javascript
const user = { name: "Juan", age: 25 };
const updatedUser = { ...user, age: 26 };  // Nueva copia
```

### En Redux
```javascript
// ❌ Incorrecto
state.items.push(newItem);
return state;

// ✅ Correcto
return { ...state, items: [...state.items, newItem] };
```

---

## 🎭 4. Render Props Pattern

### Definición
Técnica para compartir código entre componentes usando una prop que es una función que retorna React elements.

### Ejemplo
```jsx
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);
  
  return render(position);
}

// Uso
<MouseTracker render={({ x, y }) => (
  <p>X: {x}, Y: {y}</p>
)} />
```

### Evolución
El patrón Render Props fue precursor de **Hooks**. Hoy se usa más `useCustomHook`.

```jsx
// Equivalente con Hook
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // ... same logic
  return position;
}

function Component() {
  const pos = useMousePosition();
  return <p>X: {pos.x}, Y: {pos.y}</p>;
}
```

---

## 🏭 5. Higher-Order Functions (HOF)

### Definición
Funciones que reciben funciones como argumento o retornan funciones.

### En JavaScript
```javascript
// map, filter, reduce son HOF
const nums = [1, 2, 3, 4];
const doubled = nums.map(n => n * 2);  // [2, 4, 6, 8]

// createFormatter es una HOF
function createFormatter(prefix) {
  return (value) => `${prefix}: ${value}`;
}

const formatCurrency = createFormatter("$");
formatCurrency(100);  // "$: 100"
```

### En React
```jsx
// memo es una HOF
const MemoizedComponent = memo(Component);

// createSelector es una HOF (Redux)
const selectUserName = createSelector(
  state => state.user.data,
  data => data?.name
);
```

---

## 🔗 6. Dependency Injection (DI)

### Definición
Patrón donde los objetos reciben sus dependencias desde fuera, en lugar de crearlas internamente.

### En React
```jsx
// ❌ Acoplamiento fuerte
function UserService() {
  const api = new ApiClient();  // Crea su propia dependencia
  return api.getUser();
}

// ✅ Inyección de dependencias
function UserService({ api = new ApiClient() }) {
  return api.getUser();
}

// Uso
const api = new ApiClient();
<UserService api={api} />
```

### Beneficios
- Testing más fácil (mock de dependencias)
- Código más flexible
- Mejor separación de preocupaciones

---

## 📊 7. Teorema CAP

### Definición
En sistemas distribuidos, solo 2 de 3 propiedades pueden garantizarse simultáneamente:
- **Consistency** (Consistencia)
- **Availability** (Disponibilidad)
- **Partition Tolerance** (Tolerancia a particiones)

### Aplicación en Frontend

| Escenario | Trade-off |
|-----------|-----------|
| Optimistic UI | Availability > Consistency |
| Server-first data | Consistency > Availability |
| Cache local | Partition Tolerance |

### Ejemplo Práctico
```jsx
// Optimistic Update - Prioriza UX (Availability)
function addTodo(text) {
  // 1. Actualizar UI inmediatamente
  dispatch(addTodoLocal({ id: Date.now(), text }));
  
  // 2. Enviar al servidor
  api.addTodo(text).catch(() => {
    // Revertir si falla
    dispatch(removeTodo(id));
    toast.error("Error al guardar");
  });
}
```

---

## 🎲 8. Ley de Demetra (Law of Demeter)

### Definición
Principio que establece que un objeto debe solo conocer:
1. A sí mismo
2. Sus objetos directos
3. Objetos que crea

### Ejemplo

#### ❌ Violación
```jsx
// Too much knowledge
user.address.city.zipCode
```

#### ✅ Cumple
```jsx
user.getCityZipCode()
```

### En React
```jsx
// ❌ Acoplamiento excesivo
function Component() {
  const user = useSelector(s => s.auth.user);
  return <div>{user.profile.settings.theme}</div>;
}

// ✅ Abstracción correcta
const selectTheme = createSelector(
  state => state.auth.user,
  user => user?.profile?.settings?.theme ?? "light"
);

function Component() {
  const theme = useSelector(selectTheme);
  return <div>{theme}</div>;
}
```

---

## 🔄 9. CQRS (Command Query Responsibility Segregation)

### Definición
Separación de operaciones de lectura (Query) y escritura (Command).

### En Redux
```javascript
// Queries (lectura)
export const selectUser = (state, userId) => state.users.entities[userId];
export const selectUserPosts = (state, userId) => 
  state.posts.entities.filter(p => p.userId === userId);

// Commands (escritura)
function userSlice = createSlice({
  name: 'user',
  reducers: {
    fetchUser: async (id, api) => {
      const response = await api.getUser(id);
      return response.data;
    }
  }
});
```

---

## 🎯 10. Idempotency (Idempotencia)

### Definición
Una operación es idempotente si ejecutarla múltiples veces produce el mismo resultado que ejecutarla una vez.

### Ejemplos

#### ✅ Idempotente
```javascript
// Delete puede llamarse mil veces, siempre resulta en "eliminado"
DELETE /api/users/1

// setState con mismo valor
setCount(5);  // 5ta vez = mismo resultado
```

#### ❌ No idempotente
```javascript
// Increment NO es idempotente
counter.increment();  // 1, 2, 3, 4...
```

### Importancia en React
```jsx
// ✅ useEffect con dependencias correctas
useEffect(() => {
  fetchUser(userId);
}, [userId]);  // Se re-ejecuta solo si cambia

// ❌ Sin dependencias - se ejecuta infinito
useEffect(() => {
  fetchUser(userId);
});
```

---

## 📐 11. Single Responsibility Principle (SRP)

### Definición
Cada módulo, clase o función debe tener una única razón para cambiar.

### Aplicación en React
```jsx
// ❌ Muchas responsabilidades
function UserCard({ user }) {
  return (
    <div>
      {/* Renderizado UI */}
      <img src={user.avatar} />
      <h2>{user.name}</h2>
      
      {/* Lógica de fecha */}
      <p>{new Date(user.createdAt).toLocaleDateString()}</p>
      
      {/* Formateo */}
      <p>{user.email}</p>
    </div>
  );
}

// ✅ Separación de responsabilidades
function UserCard({ user }) {
  return (
    <div>
      <Avatar src={user.avatar} />
      <UserName name={user.name} />
      <JoinedDate date={user.createdAt} />
      <UserEmail email={user.email} />
    </div>
  );
}
```

---

## 🔄 12. Closure (Clausura)

### Definición
Función que retain acceso a variables de su scope externo, incluso después de que ese scope haya terminado.

### Ejemplo Clásico
```javascript
function createCounter() {
  let count = 0;  // Variable "capturada"
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  };
}

const counter = createCounter();
counter.increment();  // 1
counter.increment();  // 2
counter.getValue();   // 2
```

### En React Hooks
```jsx
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  
  // El callback "cierra" sobre count
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  
  return { count, increment, decrement };
}
```

---

## 🎓 Resumen de Conceptos

| # | Concepto | Aplicación Principal |
|---|----------|---------------------|
| 1 | Cycle of Computation | Flujo de datos en React |
| 2 | Pure Functions | Componentes predecibles |
| 3 | Inmutabilidad | Redux, memo, performance |
| 4 | Render Props | Composición de componentes |
| 5 | Higher-Order Functions | selectores, memo |
| 6 | Dependency Injection | Testing, flexibilidad |
| 7 | Teorema CAP | Decisiones de arquitectura |
| 8 | Ley de Demetra | Selectores de Redux |
| 9 | CQRS | Separación lectura/escritura |
| 10 | Idempotency | useEffect, API calls |
| 11 | SRP | Componentes pequeños |
| 12 | Closure | Hooks, callbacks |

---

## 📖 Referencias

- "Clean Code" - Robert C. Martin
- "You Don't Know JS" - Kyle Simpson
- Documentación oficial de React
- Redux Style Guide
