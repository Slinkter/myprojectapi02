# 🏛️ Constitución Técnica: UserApp Pro

## 🤖 Quick Reference para Agentes

### Stack
- React 18 + Vite
- Redux Toolkit (estado global)
- Tailwind CSS v4 (utilidades)
- Vitest (testing)

### Arquitectura FSD
```
src/
├── app/       → Configuración global
├── pages/     → Vistas compuestas
├── widgets/   → Bloques UI complejos
├── features/  → Lógica de negocio
├── entities/  → Dominio (user, post)
└── shared/    → UI atómica y utilidades
```

### Data Flow
```
UI → Hook → Thunk → API → Mapper → Store → UI
```

### Patrones Clave
- **Mappers**: Capa Anti-Corrupción (transforman datos de API)
- **StateBoundary**: Gestor declarativo de estados (loading/error/notFound)
- **AbortController**: Cancelación de peticiones en thunks
- **useTransition/useDeferredValue**: React 19 Concurrent Mode

---

## 📖 Documentación Principal

| Documento | Propósito |
|-----------|-----------|
| `docs/README_TECHNICAL.md` | Guía maestra completa |
| `docs/DIAGRAMS.md` | 7 diagramas ASCII |
| `AGENTS.md` | Este archivo |

---

## 🛠️ Comandos

```bash
pnpm dev      # Desarrollo
pnpm build    # Producción
pnpm lint     # Quality check (0 warnings)
pnpm test     # Tests
```

---

## ✅ Checklist Pre-commit

1. `pnpm lint` → 0 warnings
2. Estructura FSD correcta
3. Dark mode + responsive
4. Sin console.log o imports sin usar
