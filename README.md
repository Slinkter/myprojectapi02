# UserApp Pro - Consumidor de API Empresarial

Una aplicación React de alto rendimiento diseñada bajo los estándares de **Feature-Sliced Design (FSD)** y patrones de **Clean Architecture**, enfocada en la resiliencia de datos, optimización de UX y excelencia en ingeniería de software.

---

## 🗺️ Arquitectura FSD (Feature-Sliced Design)

El proyecto implementa una arquitectura de capas estrictas para garantizar la escalabilidad y el desacoplamiento total:

```
src/
├── app/           # Configuración global, Providers y Store root
├── pages/         # Vistas compuestas que orquestan widgets y features
├── widgets/       # Componentes complejos que combinan múltiples entidades
├── features/      # Lógica de negocio interactiva y acciones del usuario
├── entities/      # Modelos de negocio, Mappers, Slices y UI básica
└── shared/        # UI Kit atómico, hooks globales, clientes de API y utilidades
```

---

## 🚀 Características Principales

### 🧠 Lógica de Negocio & State
- **Domain-Driven**: Separación estricta entre la API externa y el dominio interno mediante **Mappers** (Capa Anti-Corrupción).
- **Smart Search**: Motor de búsqueda desacoplado con normalización de texto para búsquedas insensibles a acentos y mayúsculas.
- **Resiliencia**: Implementación de `AbortController` para evitar *race conditions* y manejo de errores parciales.

### 🎨 Design System & UX
- **Tailwind CSS v4**: Sistema de diseño moderno con efecto **Glassmorphism**.
- **Modo Oscuro**: Toggle con persistencia y detección de preferencia del sistema.
- **State Boundary**: Gestión declarativa de estados `loading`, `error`, `notFound`.
- **Skeleton Loaders**: Feedback visual premium durante la carga.

### ⚡ React 19 Patterns
- **useTransition**: Transiciones no urgentes para búsquedas.
- **useDeferredValue**: Renderizado diferido de componentes pesados.
- **Suspense**: Integración con Concurrent Mode.

---

## 📦 Stack Tecnológico

| Tecnología | Propósito |
|------------|-----------|
| **React 18** | UI declarativa y concurrente |
| **Redux Toolkit** | Gestión de estado global |
| **Tailwind CSS v4** | Sistema de diseño utilitario |
| **Vite** | Build tool y dev server |
| **Vitest** | Testing framework |
| **Zod** | Validación de esquemas |

---

## 📖 Documentación

### 📚 Índice de Documentos
| Archivo | Descripción |
|---------|-------------|
| [docs/README_TECHNICAL.md](./docs/README_TECHNICAL.md) | Documentación técnica maestra completa |
| [docs/DIAGRAMS.md](./docs/DIAGRAMS.md) | 7 diagramas ASCII de arquitectura |
| [docs/MIGRATION_PLAN.md](./docs/MIGRATION_PLAN.md) | Roadmap a Next.js + TypeScript |
| [AGENTS.md](./AGENTS.md) | Guías para agentes de IA |

---

## 🛠️ Comandos

```bash
# Instalación
pnpm install

# Desarrollo
pnpm dev          # Servidor en http://localhost:5173

# Build y Test
pnpm build        # Build de producción
pnpm preview      # Preview del build
pnpm test         # Ejecutar tests
pnpm test:watch  # Modo watch

# Calidad
pnpm lint         # ESLint (0 warnings obligatorios)
```

---

## 📂 Estructura de Archivos

```
myprojectapi02/
├── docs/                      # Documentación técnica
│   ├── README.md              # Índice de documentación
│   ├── README_TECHNICAL.md    # Documentación maestra
│   ├── DIAGRAMS.md            # Diagramas ASCII
│   ├── THEME.md               # Sistema de temas
│   ├── PERFORMANCE.md         # Optimizaciones
│   └── MIGRATION_PLAN.md      # Roadmap futuro
├── src/
│   ├── app/                   # Configuración global
│   ├── pages/                 # Vistas compuestas
│   ├── widgets/               # Componentes complejos
│   ├── features/              # Lógica de negocio
│   ├── entities/              # Entidades (user, post)
│   ├── shared/                # UI atómica y utilidades
│   └── test/                  # Suite de tests
├── AGENTS.md                  # Guía para agentes de IA
├── MASTER_PROMPT.md           # Constitución técnica
└── GEMINI.md                  # Resumen para IAs
```

---

## 🎯 Flujo de Trabajo FSD

Para añadir una nueva funcionalidad:

1. **Entidad** → `src/entities/[name]/` (API, Mapper, Store, UI)
2. **Feature** → `src/features/[name]/` (Hooks, Componentes, Servicios)
3. **Widget** → `src/widgets/[name]/` (Composición de features)
4. **Page** → `src/pages/[name]/` (Orquestación final)
5. **Test** → `src/test/` (Validación)

---

## ✅ Calidad de Código

- **Lint**: 0 warnings obligatorios
- **Build**: Verificado en cada commit
- **ESLint**: Reglas estrictas con `react-hooks` y `react-refresh`
- **JSDoc**: Documentación obligatoria en hooks y componentes

---

> **Referencia Técnica:** Para convenciones detalladas de codificación, consulta [AGENTS.md](./AGENTS.md).
> 
> **Para Agentes IA:** El archivo [MASTER_PROMPT.md](./MASTER_PROMPT.md) contiene la constitución técnica completa.
