/**
 * @fileoverview Orquestador principal de la funcionalidad de búsqueda de usuarios.
 * Integra la lógica de estado, validación y renderizado condicional en una página coherente.
 *
 * @module UserSearchPage
 */

import { useCallback } from "react";
import ProfileSkeleton from "./components/skeletons/ProfileSkeleton";
import PostListSkeleton from "./components/skeletons/PostListSkeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import NotFoundCard from "@/components/ui/NotFoundCard";
import StateBoundary from "@/components/ui/StateBoundary";
import SearchBar from "./components/SearchBar";
import UserView from "./components/UserView";
import { useUserSearch } from "./hooks/useUserSearch";
import { useSearchInput } from "./hooks/useSearchInput";

/**
 * Vista de carga que agrupa esqueletos de perfil y publicaciones.
 * Se utiliza como fallback visual en el StateBoundary.
 *
 * @component
 */
const LoadingView = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
        <ProfileSkeleton />
        <PostListSkeleton />
    </div>
);

/**
 * Cabecera de la página de búsqueda.
 * Componente presentacional puro que muestra el título y descripción.
 *
 * @component
 */
const Header = () => {
    return (
        <header className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                Buscador de Usuarios
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Busca por ID numérico (1-10)
            </p>
        </header>
    );
};
/**
 * Página principal del dominio User Search.
 * Implementa la orquestación entre `useSearchInput` para la gestión de la UI del input
 * y `useUserSearch` para la lógica de negocio y comunicación con la API.
 *
 * @component
 * @returns {JSX.Element} El contenedor principal de la búsqueda de usuarios.
 */
function UserSearchPage() {
    // Gestión del estado local del input y validaciones.
    const { searchValue, helperMessage, hasError, onInputChange } =
        useSearchInput("1");

    // Gestión del estado global, búsqueda y orquestación de la API.
    const { user, posts, status, error, searchId, performSearch } =
        useUserSearch(1);

    /** Maneja la ejecución de la búsqueda al pulsar el botón. */
    const handleSearch = useCallback(() => {
        performSearch(searchValue);
    }, [performSearch, searchValue]);

    /** Lógica opcional de pre-fetching (actualmente placeholder). */
    const handlePrefetch = useCallback(() => {
        if (!hasError && searchValue) {
            if (/^\d+$/.test(searchValue)) {
                // Posible lógica futura: pre-fetchUser(searchValue)
            }
        }
    }, [hasError, searchValue]);

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <Header />

            <SearchBar
                value={searchValue}
                onChange={onInputChange}
                onSearch={handleSearch}
                onPrefetch={handlePrefetch}
                isLoading={status === "loading"}
                helperText={helperMessage}
                isError={hasError}
            />

            <main className="min-h-[400px]">
                {/* Límite de estado: gestiona carga, error, no encontrado y éxito. */}
                <StateBoundary
                    status={status}
                    error={error}
                    loadingComponent={LoadingView}
                    errorComponent={ErrorMessage}
                    notFoundComponent={() => (
                        <NotFoundCard attemptedId={searchId} />
                    )}
                >
                    {user && <UserView user={user} posts={posts} />}
                </StateBoundary>
            </main>
        </div>
    );
}

export default UserSearchPage;
