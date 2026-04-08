# useSearchInput

## Descripción
Hook de UI (UI Hook) especializado en la gestión y validación del campo de texto del buscador. Desacopla completamente la lógica de validación de sintaxis y la presentación de mensajes de asistencia (Helper Text) del componente presentacional.

## Ubicación
`src/features/user-search/hooks/useSearchInput.js`

## Parámetros

| Parámetro | Tipo | Requerido | Default | Descripción |
|-----------|------|-----------|---------|-------------|
| initialSearch | string\|number | ❌ | `""` | Valor inicial para poblar el campo de búsqueda. |

## Valores de Retorno (API Pública)

| Retorno | Tipo | Descripción |
|---------|------|-------------|
| `searchValue` | string | El valor actual tipeado en el campo de entrada. |
| `helperMessage` | string | Mensaje de asistencia visual dinámico basado en la validación actual. |
| `hasError` | boolean | Bandera (`true`/`false`) que indica si la validación actual falló (ej: ID fuera de rango). Útil para pintar bordes rojos en el input. |
| `onInputChange` | function | `(event) => void`. Manejador del evento `onChange` nativo para el input. |
| `setSearchValue` | function | `(value) => void`. Permite forzar la actualización del valor del input de forma programática. |

## Uso
```jsx
import { useSearchInput } from "@/features/user-search/hooks/useSearchInput";

function BuscadorDumb() {
  const { searchValue, onInputChange, helperMessage, hasError } = useSearchInput("");

  return (
    <div>
      <input 
        value={searchValue} 
        onChange={onInputChange} 
        className={hasError ? "border-red-500" : "border-gray-200"}
      />
      <p>{helperMessage}</p>
    </div>
  );
}
```

## Lógica Interna
- **Debouncing**: Implementa un retraso (`UX_CONFIG.DEBOUNCE_DELAY`, por defecto 400ms) usando `useRef` y `setTimeout` para evitar ejecutar la lógica de validación pesada en cada pulsación de tecla, mejorando el rendimiento (hilo principal).
- **Validación Dinámica**: 
  - Comprueba si el input está vacío para limpiar mensajes.
  - Verifica si es un número válido y comprueba que esté dentro de `SEARCH_LIMITS.MIN_ID` y `SEARCH_LIMITS.MAX_ID`.
  - Si es texto libre, informa proactivamente que se realizará una "búsqueda por nombre".

## Dependencias
- React: `useState`, `useCallback`, `useEffect`, `useRef`.
- Configuración: Constantes centralizadas `SEARCH_LIMITS` y `UX_CONFIG` desde `@/shared/config/constants`.
