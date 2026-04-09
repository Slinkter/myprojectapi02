# UserApp Pro - Quick Reference

> Resumen del proyecto para agentes de IA

## Stack
- **React 18** + Vite
- **Redux Toolkit** (estado global)
- **Tailwind CSS v4** (utilidades)
- **Vitest** (testing)

## Arquitectura FSD
```
src/
├── app/       → Store y providers
├── pages/     → Vistas
├── widgets/   → Bloques UI
├── features/  → Lógica de negocio
├── entities/  → user, post (API + Mappers + Store)
└── shared/    → UI atómica, hooks, utils
```

## Data Flow
```
UI → Hook → Thunk → API → Mapper → Store → UI
```

## Patrones
- **Mappers**: transforman datos API → dominio
- **StateBoundary**: loading/error/notFound
- **AbortController**: cancelación en thunks

## Docs
- `docs/README_TECHNICAL.md` - Guía completa
- `docs/DIAGRAMS.md` - 7 diagramas ASCII
- `AGENTS.md` - Estándares de código

## Commands
```bash
pnpm dev    # http://localhost:5173
pnpm build # producción
pnpm lint   # 0 warnings
```
