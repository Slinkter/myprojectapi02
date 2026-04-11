# 3_ARQUITECTURA_Y_DISEÑO/ARCHITECTURE.md

## Arquitectura FSD (Feature-Sliced Design)

El proyecto organiza el código en capas jerárquicas para mantener una separación clara de responsabilidades:

### Diagrama de Flujo de Datos
```text
  [ UI Components ] <--- (Zod PropTypes)
         |
  [ Custom Hooks ] 
         |
  [ Redux Toolkit Thunk ]
         |
  [ API Client ] <--- (fetchFromApi)
         |
  [ Zod Mapper (ACL) ] <--- (Sanitización O(n))
         |
  [ Redux Store ] <--- (Hash Maps O(1))
```

### Optimización Algorítmica
Hemos reemplazado las búsquedas $O(n)$ por estructuras de datos $O(1)$:
- **`cachedUsersById`**: Diccionario para acceso directo a entidades.
- **`cachedUsersByUsername`**: Diccionario normalizado para búsqueda instantánea de usuarios.

### Estrategia Mobile-First
- Uso de `will-change: transform` para animaciones.
- Degradación elegante de filtros CSS (`backdrop-filter`) mediante media queries.
