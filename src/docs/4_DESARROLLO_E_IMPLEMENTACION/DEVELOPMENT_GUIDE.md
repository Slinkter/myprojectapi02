# 4_DESARROLLO_E_IMPLEMENTACION/DEVELOPMENT_GUIDE.md

## Guía de Desarrollo

### 1. Clean Code
- **Naming:** Usa nombres de dominio específicos (no `utils.js` genérico).
- **Semántica:** Funciones cortas (<50 líneas), archivos <200 líneas.
- **Early Return:** Usa retornos anticipados para reducir anidación.

### 2. Performance (Optimización de Memoria)
- **React.memo:** Úsalo en componentes de UI repetitivos.
- **useCallback / useMemo:** Aplícalos solo en rutas críticas de performance o cuando las dependencias sean funciones/objetos que cambian.
- **Race Conditions:** Todo `useEffect` asíncrono DEBE limpiar mediante `promise.abort()`.

### 3. Git & Estándares
- **Lint:** Ejecuta `pnpm run lint` antes de cada commit.
- **Build:** Ejecuta `pnpm run build` para asegurar la integridad del bundle.
