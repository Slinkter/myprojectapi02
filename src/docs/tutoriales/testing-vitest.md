# 🧪 Guía de Testing con Vitest

> **Nivel:** Intermedio  
> **Duración:** 2-4 horas  
> **Tecnologías:** Vitest, React Testing Library, Jest

---

## 🚀 1. Configuración Inicial

### Instalación
```bash
pnpm add -D vitest @vitejs/plugin-react jsdom
```

### Configuración (vite.config.js)
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    include: ["src/**/*.{test,spec}.{js,jsx}"],
  },
});
```

### setup.js
```javascript
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});
```

### package.json
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

---

## 📝 2. Test Unitarios - Hooks

### Test de useState
```javascript
// src/hooks/__tests__/useCounter.test.js
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useCounter } from "../useCounter";

describe("useCounter", () => {
  it("inicializa con valor por defecto", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it("acepta valor inicial", () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it("incrementa correctamente", () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it("decrementa correctamente", () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });
});
```

### Test de useEffect
```javascript
// src/hooks/__tests__/useUserSearch.test.js
import { renderHook, waitFor } from "@testing-library/react";
import { useUserSearch } from "../useUserSearch";
import { server } from "./mockServer";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("useUserSearch", () => {
  it("busca usuario por ID", async () => {
    const { result } = renderHook(() => useUserSearch("1"));
    
    await waitFor(() => {
      expect(result.current.user).not.toBeNull();
    });
    
    expect(result.current.user.name).toBe("Leanne Graham");
  });

  it("maneja estado de carga", () => {
    const { result } = renderHook(() => useUserSearch("1"));
    expect(result.current.loading).toBe(true);
  });

  it("maneja errores", async () => {
    const { result } = renderHook(() => useUserSearch("999"));
    
    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });
  });
});
```

---

## 🧩 3. Test de Componentes

### Test de Componente Simple
```javascript
// src/components/__tests__/Button.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "../Button";

describe("Button", () => {
  it("renderiza correctamente", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("llama al handler en click", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("muestra texto correcto", () => {
    render(<Button>Submit</Button>);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("está deshabilitado cuando prop disabled", () => {
    render(<Button disabled>Submit</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
```

### Test de Componente con Props
```javascript
// src/components/__tests__/UserCard.test.jsx
import { render, screen } from "@testing-library/react";
import UserCard from "../UserCard";

const mockUser = {
  id: 1,
  name: "Juan Pérez",
  email: "juan@example.com",
  avatar: "https://example.com/avatar.jpg"
};

describe("UserCard", () => {
  it("muestra nombre del usuario", () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
  });

  it("muestra email del usuario", () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByText("juan@example.com")).toBeInTheDocument();
  });

  it("renderiza avatar", () => {
    render(<UserCard user={mockUser} />);
    const img = screen.getByRole("img");
    expect(img.src).toBe("https://example.com/avatar.jpg");
  });
});
```

---

## 🏭 4. Test de Redux Slice

### Test de Slice
```javascript
// src/store/__tests__/userSlice.test.js
import { describe, it, expect } from "vitest";
import userReducer, { 
  setSearchQuery, 
  setUser, 
  setLoading, 
  setError,
  clearUser 
} from "../userSlice";

describe("userSlice", () => {
  const initialState = {
    searchQuery: "",
    user: null,
    loading: false,
    error: null
  };

  it("retorna initial state", () => {
    expect(userReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("maneja setSearchQuery", () => {
    const actual = userReducer(initialState, setSearchQuery("john"));
    expect(actual.searchQuery).toBe("john");
  });

  it("maneja setUser", () => {
    const mockUser = { id: 1, name: "Test" };
    const actual = userReducer(initialState, setUser(mockUser));
    expect(actual.user).toEqual(mockUser);
    expect(actual.loading).toBe(false);
    expect(actual.error).toBeNull();
  });

  it("maneja setLoading", () => {
    const actual = userReducer(initialState, setLoading(true));
    expect(actual.loading).toBe(true);
  });

  it("maneja setError", () => {
    const actual = userReducer(initialState, setError("Not found"));
    expect(actual.error).toBe("Not found");
    expect(actual.loading).toBe(false);
  });

  it("maneja clearUser", () => {
    const stateWithUser = { ...initialState, user: { id: 1, name: "Test" } };
    const actual = userReducer(stateWithUser, clearUser());
    expect(actual.user).toBeNull();
  });
});
```

### Test de Selectores
```javascript
// src/store/__tests__/selectors.test.js
import { describe, it, expect } from "vitest";
import { selectUser, selectIsLoading, selectErrorMessage } from "../userSlice";

describe("userSlice selectors", () => {
  const state = {
    userSearch: {
      user: { id: 1, name: "Test" },
      loading: true,
      error: "Error message"
    }
  };

  it("selectUser retorna usuario", () => {
    expect(selectUser(state)).toEqual({ id: 1, name: "Test" });
  });

  it("selectIsLoading retorna estado", () => {
    expect(selectIsLoading(state)).toBe(true);
  });

  it("selectErrorMessage retorna error", () => {
    expect(selectErrorMessage(state)).toBe("Error message");
  });
});
```

---

## 🎭 5. Mocks y Stubbing

### Mock de API con MSW
```javascript
// src/test/mockServer.js
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const server = setupServer(
  http.get("https://jsonplaceholder.typicode.com/users/:id", () => {
    return HttpResponse.json({
      id: 1,
      name: "Leanne Graham",
      email: "Sincere@april.biz"
    });
  }),
  
  http.get("https://jsonplaceholder.typicode.com/posts", ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    
    return HttpResponse.json([
      { id: 1, userId: userId, title: "Post 1" },
      { id: 2, userId: userId, title: "Post 2" }
    ]);
  })
);
```

### Mock de Módulos
```javascript
// Mock de función externa
vi.mock("../lib/api-client", () => ({
  fetchUser: vi.fn(() => Promise.resolve({ id: 1, name: "Mock" }))
}));

// Mock de dependencia
vi.mock("@heroicons/react/24/outline", () => ({
  SunIcon: () => <span>Sun</span>,
  MoonIcon: () => <span>Moon</span>
}));
```

### Stub de localStorage
```javascript
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};

beforeAll(() => {
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
});
```

---

## ⚡ 6. Testing Asíncrono

### waitFor
```javascript
import { renderHook, waitFor } from "@testing-library/react";

test("espera a que dato esté disponible", async () => {
  const { result } = renderHook(() => useFetchData());
  
  await waitFor(() => {
    expect(result.current.data).toBeDefined();
  });
  
  expect(result.current.data).toEqual(expectedData);
});
```

### waitForElementToBeRemoved
```javascript
import { waitForElementToBeRemoved, screen } from "@testing-library/react";

test("espera que loading desaparezca", async () => {
  render(<UserProfile userId="1" />);
  
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  
  await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
  
  expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
});
```

---

## 🎯 7. Mejores Prácticas

### Arrange-Act-Assert (AAA)
```javascript
test("incrementa contador", () => {
  // Arrange
  const { result } = renderHook(() => useCounter());
  
  // Act
  act(() => result.current.increment());
  
  // Assert
  expect(result.current.count).toBe(1);
});
```

### Nombres Descriptivos
```javascript
// ❌ Bad
test("test1", () => {});

// ✅ Good
test("incrementa el contador en 1 cuando se hace click en botón +", () => {});
```

### Evitar Implementation Details
```javascript
// ❌ Bad - depende de implementación interna
test("renders 3 list items", () => {
  const { container } = render(<List items={items} />);
  expect(container.querySelectorAll("li")).toHaveLength(3);
});

// ✅ Good - testa comportamiento
test("muestra todos los elementos de la lista", () => {
  render(<List items={items} />);
  items.forEach(item => {
    expect(screen.getByText(item.name)).toBeInTheDocument();
  });
});
```

### Tests Independientes
```javascript
// ❌ Un test depende de otro
test("crea usuario", () => {
  createUser("test");
});
test("verifica usuario creado", () => {
  expect(getUser("test")).toBeDefined();
});

// ✅ Tests independientes
test("crea usuario exitosamente", () => {
  const result = createUser("test");
  expect(result.success).toBe(true);
});

test("maneja error al crear usuario duplicado", () => {
  const result = createUser("existing");
  expect(result.success).toBe(false);
});
```

---

## 📊 8. Cobertura de Tests

### Ejecutar Coverage
```bash
pnpm test:coverage
```

### Objetivos
| Tipo | Objetivo Mínimo |
|------|-----------------|
| Unit Tests | 70% |
| Components | 80% |
| Hooks | 90% |
| Reducers | 100% |

### Archivos Prioritarios
1. `store/*.js` - Lógica de estado
2. `hooks/*.js` - Lógica de negocio
3. `components/ui/*.jsx` - Componentes reutilizables
4. `features/*/services/*.js` - Servicios API

---

## ✅ Checklist de Testing

- [ ] Tests unitarios para todos los hooks
- [ ] Tests para todos los componentes UI
- [ ] Tests para reducers y actions
- [ ] Tests para selectores
- [ ] Mock de API externo
- [ ] Coverage > 70%
- [ ] Tests pasan en CI/CD
- [ ] documentar casos edge

---

## 📚 Recursos

- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [MSW - Mock Service Worker](https://mswjs.io/)
- [Testing Library Cheatsheet](https://testing-library.com/docs/dom-testing-library/cheatsheet)
