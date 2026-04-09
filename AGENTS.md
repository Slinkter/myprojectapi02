# Agents Guide: myprojectapi02

Este documento proporciona instrucciones operativas para agentes de codificación que trabajan en este repositorio.

## 🛠 Herramientas y Comandos

### Desarrollo
- `pnpm dev` - Servidor de desarrollo (Vite)
- `pnpm build` - Build de producción
- `pnpm preview` - Preview del build

### Calidad
- `pnpm lint` - ESLint (0 warnings obligatorios)

### Testing
- `pnpm test` - Ejecutar todos los tests
- `pnpm test:watch` - Modo watch

---

## 🏗 Arquitectura: Feature-Sliced Design (FSD)

```
src/
├── app/           # Configuración global (store, providers)
├── pages/         # Vistas compuestas
├── widgets/       # Bloques complejos de UI
├── features/      # Lógica de negocio interactiva
├── entities/      # Entidades de dominio (user, post)
└── shared/        # UI atómica, hooks, api-client
```

---

## 📚 Documentación

| Archivo | Descripción |
|---------|-------------|
| `docs/README_TECHNICAL.md` | Documentación maestra completa |
| `docs/DIAGRAMS.md` | Diagramas ASCII de arquitectura |
| `MASTER_PROMPT.md` | Constitución técnica del proyecto |

---

## 🎨 Estándares de Código

### React Patterns
- **Memoización**: `memo()` para componentes presentacionales
- **Hooks**: Extraer lógica compleja en custom hooks
- **Display Names**: Siempre setear `ComponentName.displayName`

### State Management
- **Redux Toolkit**: Estado global mediante slices
- **Selectores Memoizados**: `createSelector` para derivadas
- **AbortController**: Cancelación obligatoria en thunks asíncronos

### Estilos (Tailwind CSS 4)
- **Utilidades**: Usar clases utilitarias exclusivamente
- **Dynamic Classes**: `cn()` para clases condicionales
- **Dark Mode**: Soporte vía hook `useTheme`

### Data Flow
```
UI → Hook → Thunk → API → Mapper → Store → UI
```

---

## ✅ Workflow para Features

1. **Entity**: `src/entities/[name]/` (API, Mapper, Store, UI)
2. **Feature**: `src/features/[name]/` (Hooks, Componentes)
3. **Widget**: `src/widgets/[name]/` (Composición)
4. **Page**: `src/pages/[name]/` (Orquestación)
5. **Test**: `src/test/` (Validación)

---

## 🚦 Checklist Pre-commit

1. Ejecutar `pnpm lint` - 0 warnings
2. Verificar estructura FSD correcta
3. Asegurar dark mode y responsive
4. Sin imports sin usar ni console.log
