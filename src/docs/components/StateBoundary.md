# StateBoundary

## Descripción
Componente de orquestación de UI que gestiona el renderizado condicional basado en estados de carga, error o éxito. Implementa el patrón *State Boundary* para desacoplar la lógica de renderizado del componente principal.

## Ubicación
`src/components/ui/StateBoundary.jsx`

## Props

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| status | string | ✅ | — | Estado (`loading`, `failed`, `notFound`, `succeeded`). |
| error | string | ❌ | — | Mensaje de error para pasar al ErrorComponent. |
| onRetry | func | ❌ | — | Callback de reintento ante errores. |
| loadingComponent | element | ❌ | — | Fallback visual de carga. |
| errorComponent | element | ❌ | — | Vista personalizada de error. |
| children | node | ✅ | — | Contenido para renderizar en `succeeded`. |

## Uso
```jsx
<StateBoundary 
  status={status} 
  error={error} 
  onRetry={handleRetry}
  loadingComponent={LoadingSkeleton}
>
  <MainContent />
</StateBoundary>
```

## Diagrama
```
    ╔══════════════╗
   /  StateBound  /║
  ╔══════════════╗ ║───► if (loading) -> LoadingView
  ║   [ Switch ] ║ ║───► if (failed)  -> ErrorMessage
  ║   [ Status ] ║ ║───► if (success) -> children
  ╚══════════════╝/
   ╚───────────────╝
```
