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
 * Componente que agrupa los esqueletos para el StateBoundary.
 */
const LoadingView = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <ProfileSkeleton />
    <PostListSkeleton />
  </div>
);

/**
 * Página de Búsqueda de Usuarios - Versión Alta Ingeniería.
 * @component
 */
function UserSearchPage() {
  const { inputValue, helperText, isError, handleInputChange } = useSearchInput("1");
  const {
    user,
    posts,
    status,
    error,
    searchId,
    performSearch,
  } = useUserSearch(1);

  const handleSearch = () => performSearch(inputValue);
  
  // Vercel Best Practice: Pre-fetch inteligente
  const handlePrefetch = () => {
    if (!isError && inputValue) {
      // Solo pre-fetch si es un ID numérico (lógica de dominio)
      if (/^\d+$/.test(inputValue)) {
        // Podríamos disparar una acción de pre-cache aquí si fuera necesario
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Buscador de Usuarios
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Ingeniería de alto rendimiento con Tailwind v4 y Redux Toolkit.
        </p>
      </header>

      <SearchBar 
        value={inputValue} 
        onChange={handleInputChange} 
        onSearch={handleSearch} 
        onPrefetch={handlePrefetch}
        isLoading={status === "loading"} 
        helperText={helperText}
        isError={isError}
      />

      <div className="min-h-[400px]">
        {/* Patrón State Boundary: Abstracción total del estado de carga/error */}
        <StateBoundary 
          status={status} 
          error={error}
          loadingComponent={LoadingView}
          errorComponent={ErrorMessage}
          notFoundComponent={() => <NotFoundCard numberId={searchId} />}
        >
          {user && <UserView user={user} posts={posts} />}
        </StateBoundary>
      </div>
    </div>
  );
}

export default UserSearchPage;
