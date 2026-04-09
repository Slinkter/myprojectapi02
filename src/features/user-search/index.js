/**
 * @fileoverview Punto de entrada público (Barrel File) para la funcionalidad de búsqueda de usuarios.
 * Facilita el acceso limpio a los componentes, hooks y páginas de este contexto de dominio.
 *
 * @module user-search-feature
 */

// Exportación de la página principal de la funcionalidad.
export { default as UserSearchPage } from "@/pages/user-search/UserSearchPage";

// Exportación de los hooks especializados para consumo externo o pruebas.
export { useSearchInput } from "@/features/user-search/hooks/useSearchInput";
export { useUserSearch } from "@/features/user-search/hooks/useUserSearch";

// Exportación de componentes internos (opcional, para mayor flexibilidad en la composición).
export { default as SearchBar } from "@/features/user-search/components/SearchBar";
export { default as UserView } from "@/features/user-search/components/UserView";
