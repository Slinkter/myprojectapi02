/**
 * @fileoverview Punto de entrada público (Barrel File) para la funcionalidad de búsqueda de usuarios.
 * Facilita el acceso limpio a los componentes, hooks y páginas de este contexto de dominio.
 * 
 * @module user-search-feature
 */

// Exportación de la página principal de la funcionalidad.
export { default as UserSearchPage } from "./UserSearchPage";

// Exportación de los hooks especializados para consumo externo o pruebas.
export { useSearchInput } from "./hooks/useSearchInput";
export { useUserSearch } from "./hooks/useUserSearch";

// Exportación de componentes internos (opcional, para mayor flexibilidad en la composición).
export { default as SearchBar } from "./components/SearchBar";
export { default as UserView } from "./components/UserView";
