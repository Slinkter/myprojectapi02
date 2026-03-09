# SearchBar

## Descripción
Componente de entrada interactivo que permite realizar búsquedas por ID numérico (1-10) o nombre de usuario. Proporciona feedback visual de carga y validación.

## Ubicación
`src/features/user-search/components/SearchBar.jsx`

## Props

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| value | string | ✅ | — | Valor controlado del input. |
| onChange | func | ✅ | — | Callback de cambio de texto. |
| onSearch | func | ✅ | — | Callback al pulsar buscar. |
| onPrefetch | func | ❌ | — | Lógica de precarga al hover. |
| isLoading | bool | ✅ | — | Estado de carga global. |
| helperText | string | ❌ | — | Mensaje descriptivo inferior. |
| isError | bool | ❌ | false | Flag de estado de error visual. |

## Uso
```jsx
<SearchBar 
  value={searchValue} 
  onChange={onInputChange} 
  onSearch={handleSearch} 
  isLoading={status === 'loading'} 
/>
```

## Estados internos
- Ninguno (Componente controlado).

## Dependencias
- Iconos: `MagnifyingGlassIcon` (@heroicons/react)
- Utils: `cn` (clsx + tailwind-merge)

## Diagrama
```
    ╔══════════════╗
   /              /║
  ╔══════════════╗ ║───► [onSearch]
  ║ [ Input ]    ║ ║◄─── [value]
  ║ [ Button ]   ║ ║
  ╚══════════════╝/
   ╚───────────────╝
```
