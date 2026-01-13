# TODO: Testing Implementation

## 📋 Pendiente: Implementación de Testing

Este documento registra las tareas pendientes relacionadas con la implementación de testing en el proyecto.

---

## 🎯 Objetivo

Implementar un framework de testing completo para alcanzar **70% de cobertura de código** y garantizar la calidad del proyecto.

---

## 📦 Instalación de Dependencias

```bash
# Testing framework
pnpm add -D vitest @vitest/ui

# React Testing Library
pnpm add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Coverage
pnpm add -D @vitest/coverage-v8
```

---

## ⚙️ Configuración

### 1. Configurar Vitest

Crear `vitest.config.js`:

```javascript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.config.js',
        'dist/',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### 2. Setup de Testing

Crear `src/test/setup.js`:

```javascript
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

### 3. Actualizar package.json

Agregar scripts:

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

## 📝 Tests a Implementar

### Prioridad Alta 🔴

#### 1. Custom Hooks

**`src/features/user-search/hooks/__tests__/useUser.test.js`**

```javascript
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useUser } from '../useUser';
import { store } from '@/redux/store';

describe('useUser', () => {
  const wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  it('should initialize with default user ID', () => {
    const { result } = renderHook(() => useUser(1), { wrapper });
    expect(result.current.inputValue).toBe('1');
  });

  it('should validate input correctly', () => {
    const { result } = renderHook(() => useUser(1), { wrapper });
    
    // Test valid input
    const event = { target: { value: '5' } };
    result.current.handleInputChange(event);
    expect(result.current.inputValue).toBe('5');
    
    // Test invalid input
    const invalidEvent = { target: { value: '15' } };
    result.current.handleInputChange(invalidEvent);
    expect(result.current.inputValue).toBe('5'); // Should not change
  });

  // TODO: Add more tests
});
```

**`src/hooks/__tests__/useTheme.test.js`**

```javascript
import { renderHook, act } from '@testing-library/react';
import { useTheme } from '../useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('should initialize with light theme by default', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.isDark).toBe(false);
  });

  it('should toggle theme', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.isDark).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  // TODO: Add more tests
});
```

#### 2. Services

**`src/features/user-search/services/__tests__/user-service.test.js`**

```javascript
import { describe, it, expect, vi } from 'vitest';
import { fetchUserProfile } from '../user-service';
import * as userApi from '../api/user.api';
import * as postApi from '../api/post.api';

vi.mock('../api/user.api');
vi.mock('../api/post.api');

describe('fetchUserProfile', () => {
  it('should fetch user and posts in parallel', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    const mockPosts = [{ id: 1, title: 'Post 1' }];
    
    vi.mocked(userApi.getUser).mockResolvedValue(mockUser);
    vi.mocked(postApi.getPostsByUser).mockResolvedValue(mockPosts);
    
    const result = await fetchUserProfile(1);
    
    expect(result).toEqual({ user: mockUser, posts: mockPosts });
    expect(userApi.getUser).toHaveBeenCalledWith(1);
    expect(postApi.getPostsByUser).toHaveBeenCalledWith(1);
  });

  it('should handle empty user response', async () => {
    vi.mocked(userApi.getUser).mockResolvedValue({});
    vi.mocked(postApi.getPostsByUser).mockResolvedValue([]);
    
    const result = await fetchUserProfile(1);
    
    expect(result).toEqual({ user: null, posts: [] });
  });

  // TODO: Add more tests
});
```

#### 3. Redux Slices

**`src/features/user-search/redux/__tests__/userSlice.test.js`**

```javascript
import { describe, it, expect } from 'vitest';
import userReducer, { fetchUserAndPosts } from '../userSlice';

describe('userSlice', () => {
  const initialState = {
    status: 'idle',
    error: null,
    user: null,
    posts: [],
  };

  it('should return initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchUserAndPosts.pending', () => {
    const actual = userReducer(initialState, fetchUserAndPosts.pending());
    expect(actual.status).toBe('loading');
    expect(actual.error).toBe(null);
  });

  // TODO: Add more tests for fulfilled and rejected cases
});
```

### Prioridad Media 🟡

#### 4. Componentes UI

**`src/features/user-search/components/__tests__/UserProfile.test.jsx`**

```javascript
import { render, screen } from '@testing-library/react';
import UserProfile from '../UserProfile';

describe('UserProfile', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    website: 'example.com',
    company: { name: 'Acme Inc', catchPhrase: 'Innovation' },
    address: { city: 'New York' },
  };

  it('renders user information correctly', () => {
    render(<UserProfile user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    expect(screen.getByText('Acme Inc')).toBeInTheDocument();
  });

  // TODO: Add more tests
});
```

**`src/features/user-search/components/__tests__/PostList.test.jsx`**

```javascript
import { render, screen } from '@testing-library/react';
import PostList from '../PostList';

describe('PostList', () => {
  const mockPosts = [
    { id: 1, title: 'Post 1', body: 'Body 1' },
    { id: 2, title: 'Post 2', body: 'Body 2' },
  ];

  it('renders list of posts', () => {
    render(<PostList posts={mockPosts} />);
    
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });

  // TODO: Add more tests
});
```

**`src/components/ui/__tests__/ErrorMessage.test.jsx`**

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('renders error message', () => {
    render(<ErrorMessage message="Test error" onRetry={() => {}} />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('calls onRetry when button is clicked', () => {
    const onRetry = vi.fn();
    render(<ErrorMessage message="Test error" onRetry={onRetry} />);
    
    fireEvent.click(screen.getByText(/reintentar/i));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  // TODO: Add more tests
});
```

### Prioridad Baja 🟢

#### 5. Tests de Integración

**`src/features/user-search/__tests__/UserSearchPage.integration.test.jsx`**

```javascript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { UserSearchPage } from '../index';

describe('UserSearchPage Integration', () => {
  it('should search for user and display results', async () => {
    render(
      <Provider store={store}>
        <UserSearchPage />
      </Provider>
    );

    const input = screen.getByLabelText(/ID de Usuario/i);
    const button = screen.getByRole('button');

    await userEvent.clear(input);
    await userEvent.type(input, '1');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByText(/buscando/i)).not.toBeInTheDocument();
    });

    // TODO: Add assertions for rendered user data
  });

  // TODO: Add more integration tests
});
```

---

## 📊 Objetivo de Cobertura

| Categoría | Objetivo | Prioridad |
|-----------|----------|-----------|
| **Hooks** | 80% | Alta |
| **Services** | 80% | Alta |
| **Redux Slices** | 80% | Alta |
| **Componentes** | 60% | Media |
| **Integración** | 50% | Baja |
| **Total** | 70% | - |

---

## 🚀 Comandos de Testing

```bash
# Ejecutar todos los tests
pnpm test

# Ejecutar tests en modo watch
pnpm test --watch

# Ejecutar tests con UI
pnpm test:ui

# Generar reporte de cobertura
pnpm test:coverage

# Ejecutar tests de un archivo específico
pnpm test src/hooks/__tests__/useUser.test.js
```

---

## ✅ Checklist de Implementación

- [ ] Instalar dependencias de testing
- [ ] Configurar Vitest
- [ ] Crear setup de testing
- [ ] Actualizar scripts en package.json
- [ ] Implementar tests de hooks (useUser, useTheme)
- [ ] Implementar tests de services
- [ ] Implementar tests de Redux slices
- [ ] Implementar tests de componentes UI
- [ ] Implementar tests de integración
- [ ] Alcanzar 70% de cobertura
- [ ] Configurar CI/CD para ejecutar tests automáticamente

---

## 📚 Recursos

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Fecha de Creación:** 12 de Enero, 2026  
**Estado:** Pendiente de Implementación
