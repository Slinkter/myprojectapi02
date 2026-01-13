// Barrel export for user-search feature

/**
 * @fileoverview Barrel export para el feature user-search.
 * Simplifica las importaciones exportando todos los elementos públicos del feature.
 *
 * @module user-search
 * @category Features
 * @since 1.0.0
 */

/**
 * Página principal del feature de búsqueda de usuarios.
 * @see {@link module:user-search/UserSearchPage}
 */
export { default as UserSearchPage } from "./UserSearchPage";

/**
 * Custom hook para gestionar la lógica de búsqueda de usuarios.
 * @see {@link module:user-search/hooks/useUser}
 */
export { useUser } from "./hooks/useUser";

/**
 * @example
 * // Importar desde el barrel export
 * import { UserSearchPage, useUser } from '@/features/user-search';
 *
 * @example
 * // En lugar de múltiples imports
 * import UserSearchPage from '@/features/user-search/UserSearchPage';
 * import { useUser } from '@/features/user-search/hooks/useUser';
 */
