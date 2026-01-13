# 👨‍💻 Guía para Desarrolladores

> **Proyecto:** myprojectapi02  
> **Última Actualización:** 12 de Enero, 2026

---

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js:** >= 16.x
- **pnpm:** >= 8.x (recomendado) o npm >= 9.x
- **Git:** Para clonar el repositorio

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/slinkter/myprojectapi02.git
cd myprojectapi02

# 2. Instalar dependencias
pnpm install

# 3. Iniciar servidor de desarrollo
pnpm run dev

# 4. Abrir en navegador
# http://localhost:5173
```

---

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| **Desarrollo** | `pnpm run dev` | Inicia servidor de desarrollo con HMR |
| **Build** | `pnpm run build` | Genera bundle de producción optimizado |
| **Preview** | `pnpm run preview` | Previsualiza build de producción localmente |
| **Lint** | `pnpm run lint` | Ejecuta ESLint para verificar calidad de código |
| **Deploy** | `pnpm run deploy` | Despliega a GitHub Pages |

### Detalles de Scripts

#### Desarrollo
```bash
pnpm run dev
```
- Inicia Vite dev server en puerto 5173
- Hot Module Replacement (HMR) activado
- Source maps para debugging

#### Build
```bash
pnpm run build
```
- Genera bundle optimizado en `/dist`
- Minificación de JS y CSS
- Tree-shaking automático
- Code-splitting

#### Lint
```bash
pnpm run lint
```
- Verifica código con ESLint
- Reporta errores y warnings
- Configuración: `.eslintrc.cjs`

#### Deploy
```bash
pnpm run deploy
```
- Ejecuta `pnpm run build` automáticamente
- Despliega `/dist` a GitHub Pages
- URL: `https://slinkter.github.io/myprojectapi02`

---

## 🏗️ Estructura del Proyecto

### Estructura Actual

```
myprojectapi02/
├── public/                  # Archivos estáticos
│   └── vite.svg
├── src/
│   ├── api/                 # Clientes API
│   │   ├── api.js          # Configuración base
│   │   ├── user.js         # API de usuarios
│   │   └── post.js         # API de posts
│   ├── components/          # Componentes UI
│   │   ├── layout/
│   │   │   └── MainLayout.jsx
│   │   ├── skeletons/
│   │   │   ├── ProfileSkeleton.jsx
│   │   │   └── PostListSkeleton.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── NotFoundCard.jsx
│   │   ├── PostList.jsx
│   │   ├── ThemeToggleButton.jsx
│   │   └── UserProfile.jsx
│   ├── features/            # Features (módulos de dominio)
│   │   └── UserSearch/
│   │       └── UserSearchPage.jsx
│   ├── hooks/               # Custom hooks
│   │   ├── useTheme.js
│   │   └── useUser.js
│   ├── redux/               # Redux store
│   │   ├── slices/
│   │   │   └── userSlice.js
│   │   └── store.js
│   ├── services/            # Servicios de negocio
│   │   └── user-service.js
│   ├── docs/                # Documentación
│   │   ├── 00-diagnostico-tecnico.md
│   │   ├── 01-overview-del-sistema.md
│   │   ├── 02-arquitectura.md
│   │   ├── 03-casos-de-uso.md
│   │   ├── 04-requerimientos.md
│   │   ├── 05-flujo-de-datos.md
│   │   └── 06-guia-para-desarrolladores.md (este archivo)
│   ├── assets/              # Recursos estáticos
│   │   └── react.svg
│   ├── App.jsx              # Componente raíz
│   ├── App.css              # Estilos de App
│   ├── main.jsx             # Entry point
│   └── index.css            # Estilos globales (BEM)
├── .eslintrc.cjs            # Configuración ESLint
├── .gitignore
├── index.html               # HTML principal
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js        # Configuración PostCSS
├── tailwind.config.js       # Configuración Tailwind
├── vite.config.js           # Configuración Vite
└── README.md
```

---

## 🎨 Guía de Estilos

### Metodología CSS: BEM + TailwindCSS

Este proyecto utiliza una **combinación híbrida**:
- **TailwindCSS** para utility classes
- **BEM (Block Element Modifier)** para clases custom en `index.css`

#### Uso de TailwindCSS

**Utility-First Approach:**
```jsx
<div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800">
  <Typography className="text-lg font-bold text-gray-900 dark:text-gray-100">
    Título
  </Typography>
</div>
```

**Configuración en `tailwind.config.js`:**
```javascript
module.exports = withMT({
    darkMode: 'class',  // Modo oscuro con clase 'dark'
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Playwrite CU', 'Open Sans', 'sans-serif'],
        },
        extend: {},
    },
    plugins: [],
});
```

**Características:**
- ✅ Dark mode con estrategia `class`
- ✅ Fuente custom: Playwrite CU
- ✅ Integración con Material Tailwind (`withMT`)

#### Uso de BEM

**Para componentes custom en `index.css`:**

```css
/* Block */
.user-profile {
    @apply w-full shadow-lg rounded-2xl;
}

/* Element */
.user-profile__avatar {
    @apply mx-auto mb-4 border-4;
}

/* Modifier */
.user-profile--compact {
    @apply max-w-sm;
}
```

**Uso en JSX:**
```jsx
<Card className="user-profile">
  <Avatar className="user-profile__avatar" />
</Card>
```

#### Convenciones de Naming para CSS

| Tipo | Formato | Ejemplo |
|------|---------|---------|
| **Block** | `kebab-case` | `.user-profile` |
| **Element** | `block__element` | `.user-profile__avatar` |
| **Modifier** | `block--modifier` | `.user-profile--compact` |

**Prohibiciones:**
- ❌ NO mezclar BEM con Tailwind en la misma clase
- ❌ NO usar BEM para utility classes (usar Tailwind)
- ❌ NO anidar más de 3 niveles en BEM

---

## 📐 Convenciones del Proyecto

### Naming Conventions

#### Archivos

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| **Componentes** | PascalCase.jsx | `UserProfile.jsx` |
| **Hooks** | camelCase.js con `use` | `useUser.js` |
| **Services** | kebab-case.service.js | `user-service.js` |
| **APIs** | kebab-case.js | `user.js`, `post.js` |
| **Slices** | camelCase.js | `userSlice.js` |
| **Utils** | kebab-case.util.js | `validators.util.js` |

#### Variables y Funciones

```javascript
// Variables: camelCase
const userId = 1;
const isLoading = false;

// Constantes: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRIES = 3;

// Funciones: camelCase
function fetchUser() {}

// Componentes: PascalCase
function UserProfile() {}

// Handlers: camelCase con prefijo 'handle'
const handleSearch = () => {};
const handleRetry = () => {};

// Boolean: prefijo is/has/should
const isLoading = true;
const hasError = false;
const shouldRender = true;
```

### Estructura de Archivos

#### Componentes

```jsx
// Imports (orden específico)
import React from 'react';                    // 1. React
import { useSelector } from 'react-redux';    // 2. Librerías externas
import { Card } from '@material-tailwind/react';  // 3. UI libraries
import PropTypes from 'prop-types';           // 4. PropTypes

import { useUser } from '@/hooks/useUser';    // 5. Hooks propios
import ErrorMessage from '@/components/ErrorMessage';  // 6. Componentes

import './styles.css';                        // 7. Estilos

/**
 * JSDoc del componente
 * @param {object} props - Props del componente
 * @returns {JSX.Element}
 */
function MyComponent({ prop1, prop2 }) {
    // 1. Hooks
    const data = useSelector(state => state.data);
    
    // 2. Estado local
    const [value, setValue] = useState('');
    
    // 3. Efectos
    useEffect(() => {
        // ...
    }, []);
    
    // 4. Handlers
    const handleClick = () => {
        // ...
    };
    
    // 5. Render
    return (
        <div>
            {/* JSX */}
        </div>
    );
}

// PropTypes
MyComponent.propTypes = {
    prop1: PropTypes.string.isRequired,
    prop2: PropTypes.number,
};

export default MyComponent;
```

#### Custom Hooks

```javascript
import { useState, useEffect } from 'react';

/**
 * JSDoc del hook
 * @param {any} initialValue - Valor inicial
 * @returns {object} Estado y funciones
 */
export const useMyHook = (initialValue) => {
    const [state, setState] = useState(initialValue);
    
    useEffect(() => {
        // Lógica del hook
    }, []);
    
    return {
        state,
        setState,
    };
};
```

---

## 🔧 Configuración de Herramientas

### ESLint

**Archivo:** `.eslintrc.cjs`

```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
```

### Vite

**Archivo:** `vite.config.js`

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: 'https://slinkter.github.io/myprojectapi02',
});
```

**Recomendación:** Usar variables de entorno
```javascript
export default defineConfig({
    plugins: [react()],
    base: process.env.NODE_ENV === 'production' 
        ? '/myprojectapi02' 
        : '/',
});
```

### PostCSS

**Archivo:** `postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 🛠️ Buenas Prácticas

### 1. Componentes

✅ **DO:**
- Mantener componentes pequeños (< 150 líneas)
- Un componente = una responsabilidad
- Usar PropTypes para validación
- Memoizar componentes pesados con `React.memo`
- Extraer lógica a Custom Hooks

❌ **DON'T:**
- Mezclar lógica de negocio con UI
- Componentes de más de 200 líneas
- Prop drilling excesivo (usar Context o Redux)
- Lógica compleja en JSX

### 2. Hooks

✅ **DO:**
- Nombrar con prefijo `use`
- Encapsular lógica reutilizable
- Memoizar callbacks con `useCallback`
- Memoizar valores computados con `useMemo`

❌ **DON'T:**
- Llamar hooks condicionalmente
- Hooks dentro de loops
- Hooks en funciones regulares (solo en componentes/hooks)

### 3. Redux

✅ **DO:**
- Usar Redux Toolkit (no Redux vanilla)
- AsyncThunks para lógica asíncrona
- Normalizar estado cuando sea necesario
- Slices por feature

❌ **DON'T:**
- Mutar estado directamente (usar Immer de RTK)
- Lógica de negocio en reducers (usar thunks o services)
- Estado global para todo (usar estado local cuando sea apropiado)

### 4. Estilos

✅ **DO:**
- Usar Tailwind para utility classes
- Usar BEM para componentes custom
- Dark mode con clases condicionales
- Responsive design mobile-first

❌ **DON'T:**
- Inline styles (excepto dinámicos)
- !important (excepto casos extremos)
- Mezclar metodologías (BEM + utility en misma clase)

---

## 📦 Agregar Nuevos Features

### Estructura Recomendada

```
src/features/new-feature/
├── components/
│   ├── FeatureComponent.jsx
│   └── skeletons/
│       └── FeatureSkeleton.jsx
├── hooks/
│   └── useFeature.js
├── redux/
│   └── featureSlice.js
├── services/
│   └── feature-service.js
├── api/
│   └── feature.api.js
├── FeaturePage.jsx
└── index.js  # Barrel export
```

### Pasos

1. **Crear carpeta del feature**
   ```bash
   mkdir -p src/features/new-feature/{components,hooks,redux,services,api}
   ```

2. **Crear componentes**
   ```jsx
   // src/features/new-feature/FeaturePage.jsx
   function FeaturePage() {
       return <div>New Feature</div>;
   }
   export default FeaturePage;
   ```

3. **Crear slice de Redux**
   ```javascript
   // src/features/new-feature/redux/featureSlice.js
   import { createSlice } from '@reduxjs/toolkit';
   
   const featureSlice = createSlice({
       name: 'feature',
       initialState: {},
       reducers: {},
   });
   
   export default featureSlice.reducer;
   ```

4. **Registrar en store**
   ```javascript
   // src/redux/store.js
   import featureReducer from '@/features/new-feature/redux/featureSlice';
   
   export const store = configureStore({
       reducer: {
           user: userReducer,
           feature: featureReducer,  // Nuevo
       },
   });
   ```

5. **Crear barrel export**
   ```javascript
   // src/features/new-feature/index.js
   export { default as FeaturePage } from './FeaturePage';
   ```

6. **Usar en App**
   ```jsx
   // src/App.jsx
   import { FeaturePage } from '@/features/new-feature';
   ```

---

## 🧪 Testing (Futuro)

### Framework Recomendado

- **Vitest** para unit tests
- **React Testing Library** para component tests

### Instalación

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
```

### Ejemplo de Test

```javascript
// src/components/__tests__/UserProfile.test.jsx
import { render, screen } from '@testing-library/react';
import UserProfile from '../UserProfile';

describe('UserProfile', () => {
    it('renders user name', () => {
        const user = { name: 'John Doe', /* ... */ };
        render(<UserProfile user={user} />);
        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
});
```

---

## 🐛 Debugging

### React DevTools

1. Instalar extensión de navegador
2. Inspeccionar componentes
3. Ver props y estado
4. Profiler para performance

### Redux DevTools

1. Instalar extensión de navegador
2. Ver estado global
3. Time-travel debugging
4. Inspeccionar acciones

### Vite DevTools

- Source maps activados en desarrollo
- Hot Module Replacement para cambios rápidos

---

## 📚 Recursos Adicionales

### Documentación Oficial

- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Material Tailwind](https://www.material-tailwind.com/)

### Documentación del Proyecto

- [00 - Diagnóstico Técnico](./00-diagnostico-tecnico.md)
- [01 - Overview del Sistema](./01-overview-del-sistema.md)
- [02 - Arquitectura](./02-arquitectura.md)
- [03 - Casos de Uso](./03-casos-de-uso.md)
- [04 - Requerimientos](./04-requerimientos.md)
- [05 - Flujo de Datos](./05-flujo-de-datos.md)

---

## 🤝 Contribución

### Workflow de Git

```bash
# 1. Crear rama para feature
git checkout -b feature/nueva-funcionalidad

# 2. Hacer cambios y commits
git add .
git commit -m "feat: agregar nueva funcionalidad"

# 3. Push a remoto
git push origin feature/nueva-funcionalidad

# 4. Crear Pull Request en GitHub
```

### Convenciones de Commits

Seguir [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: cambios de formato (no afectan código)
refactor: refactorización de código
test: agregar o modificar tests
chore: cambios en build, dependencias, etc.
```

---

**Firma Digital:**  
🏛️ Arquitecto de Software Senior  
📅 12 de Enero, 2026
