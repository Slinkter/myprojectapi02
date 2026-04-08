/**
 * @fileoverview Orquestador principal de la funcionalidad de búsqueda de usuarios.
 * Integra la lógica de estado, validación y renderizado condicional en una página coherente.
 *
 * @module UserSearchPage
 */

import { useCallback, memo } from "react";
import ProfileSkeleton from "@/entities/user/ui/skeletons/ProfileSkeleton";
import PostListSkeleton from "@/entities/post/ui/skeletons/PostListSkeleton";
import ErrorMessage from "@/shared/ui/ErrorMessage";
import NotFoundCard from "@/shared/ui/NotFoundCard";
import StateBoundary from "@/shared/ui/StateBoundary";
import SearchBar from "@/features/user-search/components/SearchBar";
import UserView from "@/widgets/user-view/UserView";
import { useUserSearch } from "@/features/user-search/hooks/useUserSearch";
import { useSearchInput } from "@/features/user-search/hooks/useSearchInput";
import { cn } from "@/shared/lib/utils";

/**
 * Vista de carga que agrupa esqueletos de perfil y publicaciones.
 * Se utiliza como fallback visual en el StateBoundary.
 *
 * @component
 */
const LoadingView = memo(() => (
    <div className={cn("space-y-8 animate-in fade-in duration-500")}>
        <ProfileSkeleton />
        <PostListSkeleton />
    </div>
));

LoadingView.displayName = "LoadingView";

/**
 * Cabecera de la página de búsqueda.
 * Componente presentacional puro que muestra el título y descripción.
 *
 * @component
 */
const Header = memo(() => {
    return (
        <header className={cn("text-center mb-golden-xl")}>
            <h2
                className={cn(
                    "text-golden-h2 md:text-golden-h1 font-extrabold text-slate-900 dark:text-white tracking-tight mb-golden-sm leading-tight",
                )}
            >
                Buscador de Usuarios
            </h2>
            <p
                className={cn(
                    "text-golden-p md:text-golden-h3 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed",
                )}
            >
                Busca por ID numérico (1-10) o por nombre de usuario.
            </p>
        </header>
    );
});

Header.displayName = "Header";

/**
 * Página principal del dominio User Search.
 * Implementa la orquestación entre `useSearchInput` para la gestión de la UI del input
 * y `useUserSearch` para la lógica de negocio y comunicación con la API.
 *
 * @component
 * @returns {JSX.Element} El contenedor principal de la búsqueda de usuarios.
 */
const UserSearchPage = memo(() => {
    // Gestión del estado local del input y validaciones.
    const { searchValue, helperMessage, hasError, onInputChange } =
        useSearchInput(1);

    // Gestión del estado global, búsqueda y orquestación de la API.
    const { user, posts, status, error, lastSearchQuery, performSearch, handleRetry } =
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
        <div className={cn("w-full max-w-6xl mx-auto px-golden-base py-golden-lg lg:py-golden-xl")}>
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

            <main className={cn("min-h-100")}>
                {/* Límite de estado: gestiona carga, error, no encontrado y éxito. */}
                <StateBoundary
                    status={status}
                    error={error}
                    onRetry={handleRetry}
                    loadingComponent={LoadingView}
                    errorComponent={ErrorMessage}
                    notFoundComponent={() => (
                        <NotFoundCard attemptedId={lastSearchQuery} />
                    )}

                >
                    {user && <UserView user={user} posts={posts} />}
                </StateBoundary>
            </main>
        </div>
    );
});

UserSearchPage.displayName = "UserSearchPage";

export default UserSearchPage;
