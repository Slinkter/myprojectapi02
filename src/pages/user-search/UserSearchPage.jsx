/**
 * @fileoverview Orquestador principal de la funcionalidad de búsqueda de usuarios.
 * Implementa la composición de la barra de búsqueda y la vista de resultados,
 * gestionando el estado global de la página mediante un StateBoundary.
 *
 * @module UserSearchPage
 */

import { memo, useDeferredValue } from "react";
import ProfileSkeleton from "@/entities/user/ui/skeletons/ProfileSkeleton";
import PostListSkeleton from "@/entities/post/ui/skeletons/PostListSkeleton";
import ErrorMessage from "@/shared/ui/ErrorMessage";
import NotFoundCard from "@/shared/ui/NotFoundCard";
import StateBoundary from "@/shared/ui/StateBoundary";
import SearchBar from "@/features/user-search/components/SearchBar";
import UserView from "@/widgets/user-view/UserView";
import { useUserSearch } from "@/features/user-search/hooks/useUserSearch";
import { cn } from "@/shared/lib/utils";

/**
 * Vista de carga que agrupa esqueletos de perfil y publicaciones.
 * Proporciona feedback visual mientras se recuperan los datos del usuario.
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
 * Componente presentacional que describe la funcionalidad de la página.
 *
 * @component
 */
const Header = memo(() => (
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
));

Header.displayName = "Header";

/**
 * Página principal de búsqueda de usuarios.
 * Coordina la interacción entre la búsqueda (SearchBar) y la visualización (UserView).
 * Utiliza un StateBoundary para gestionar los estados de la petición de forma declarativa.
 * Implementa useDeferredValue para diferir el renderizado de componentes pesados.
 *
 * @component
 * @returns {JSX.Element} El layout completo de la página de búsqueda.
 */
const UserSearchPage = memo(() => {
    const { user, status, error, lastSearchQuery, performSearch, handleRetry } =
        useUserSearch(1);

    const deferredUserId = useDeferredValue(user?.id);

    const handleSearch = (term) => {
        performSearch(term);
    };

    const handlePrefetch = (term) => {
        performSearch(term);
    };

    return (
        <div
            className={cn(
                "w-full max-w-6xl mx-auto px-golden-base py-golden-lg lg:py-golden-xl",
            )}
        >
            <Header />

            <SearchBar
                onSearch={handleSearch}
                onPrefetch={handlePrefetch}
                isLoading={status === "loading"}
            />

            <main className={cn("min-h-100")}>
                <StateBoundary
                    status={status}
                    error={lastSearchQuery !== 1 && error}
                    onRetry={handleRetry}
                    loadingComponent={LoadingView}
                    errorComponent={ErrorMessage}
                    notFoundComponent={() => (
                        <NotFoundCard attemptedId={lastSearchQuery} />
                    )}
                >
                    {user && <UserView userId={deferredUserId} />}
                </StateBoundary>
            </main>
        </div>
    );
});

UserSearchPage.displayName = "UserSearchPage";

export default UserSearchPage;
