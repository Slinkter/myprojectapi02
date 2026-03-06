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
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Componente que agrupa los esqueletos para el StateBoundary.
 */
const LoadingView = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <ProfileSkeleton />
    <PostListSkeleton />
  </div>
);

/**
 * Cabecera de la página - Componente Presentacional Puro.
 */
const Header = () => {
  const { t } = useTranslation();
  return (
    <header className="text-center mb-12">
      <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
        {t("search.title")}
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        {t("search.description")}
      </p>
    </header>
  );
};

/**
 * Página de Búsqueda de Usuarios - Versión Alta Ingeniería.
 * Sigue Clean Code: Uso de traducciones jerárquicas y lógica desacoplada.
 */
function UserSearchPage() {
  const { searchValue, helperMessage, hasError, onInputChange } = useSearchInput("1");
  const {
    user,
    posts,
    status,
    error,
    searchId,
    performSearch,
  } = useUserSearch(1);

  const handleSearch = useCallback(() => {
    performSearch(searchValue);
  }, [performSearch, searchValue]);
  
  const handlePrefetch = useCallback(() => {
    if (!hasError && searchValue) {
      if (/^\d+$/.test(searchValue)) {
        // Pre-fetch logic
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
        <StateBoundary 
          status={status} 
          error={error}
          loadingComponent={LoadingView}
          errorComponent={ErrorMessage}
          notFoundComponent={() => <NotFoundCard attemptedId={searchId} />}
        >
          {user && <UserView user={user} posts={posts} />}
        </StateBoundary>
      </main>
    </div>
  );
}

export default UserSearchPage;
