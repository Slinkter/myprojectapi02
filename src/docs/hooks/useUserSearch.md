# useUserSearch

## Descripción
Hook de dominio (Domain Hook) que orquesta la búsqueda de usuarios. Encapsula toda la lógica de negocio necesaria para buscar por ID en la API o realizar coincidencias parciales de texto (nombres/usernames) utilizando una lista en caché local, integrándose directamente con el estado global de Redux.

## Ubicación
`src/features/user-search/hooks/useUserSearch.js`

## Parámetros

| Parámetro | Tipo | Requerido | Default | Descripción |
|-----------|------|-----------|---------|-------------|
| initialUserId | number\|string | ❌ | — | Identificador inicial para cargar datos automáticamente al montar el componente. |

## Valores de Retorno (API Pública)

| Retorno | Tipo | Descripción |
|---------|------|-------------|
| `user` | object\|null | Objeto con los datos del perfil del usuario encontrado, o `null` si no hay resultados. |
| `posts` | array | Lista de publicaciones asociadas al usuario actual. |
| `status` | string | Estado de la petición a la API (`idle`, `loading`, `succeeded`, `failed`, `notFound`). |
| `error` | string\|null | Mensaje de error legible si la última búsqueda falló. |
| `searchId` | number\|string | El ID o término de texto de la última búsqueda realizada. |
| `performSearch` | function | `(input) => void`. Inicia una nueva búsqueda aplicando normalización (acentos, espacios) e inteligencia de ruteo (API vs Caché). |
| `handleRetry` | function | `() => void`. Reintenta la última búsqueda utilizando el `searchId` almacenado. |

## Uso
```jsx
import { useUserSearch } from "@/features/user-search/hooks/useUserSearch";

function MiComponente() {
  const { user, status, performSearch } = useUserSearch(1);

  const onSubmit = (term) => {
    performSearch(term);
  };
  
  // Renderizado dependiente de 'status' y 'user'...
}
```

## Lógica Interna
- **Normalización**: Limpia espacios en blanco, ignora mayúsculas/minúsculas y elimina acentos (`NFD`) para búsquedas por nombre más robustas.
- **Enrutamiento Inteligente**:
  - Si el input es estrictamente numérico (`/^\d+$/`), realiza un dispatch directo del thunk `fetchUserAndPosts` hacia la API.
  - Si el input es texto, busca una coincidencia en `cachedUsers` (obtenida previamente vía `fetchUsersList`). Si la encuentra, dispara la API con el ID encontrado. Si no, fuerza un estado `404` en Redux.

## Dependencias
- Redux: `useDispatch`, `useSelector`.
- Store Slices: `fetchUserAndPosts`, `fetchUsersList`, y selectores memoizados.
- React: `useState`, `useEffect`, `useCallback`.
