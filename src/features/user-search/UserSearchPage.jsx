import ProfileSkeleton from "./components/skeletons/ProfileSkeleton";
import PostListSkeleton from "./components/skeletons/PostListSkeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import NotFoundCard from "@/components/ui/NotFoundCard";
import SearchBar from "./components/SearchBar";
import UserView from "./components/UserView";
import { useUserSearch } from "./hooks/useUserSearch";
import { useSearchInput } from "./hooks/useSearchInput";

/**
 * Página de Búsqueda de Usuarios.
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
    handleRetry,
  } = useUserSearch(1);

  const isLoading = status === "loading";

  const handleSearch = () => {
    performSearch(inputValue);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
          Buscador de Usuarios
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors">
          Busca por ID numérico (1-10) o por nombre de usuario para ver su perfil y posts.
        </p>
      </div>

      <SearchBar 
        value={inputValue} 
        onChange={handleInputChange} 
        onSearch={handleSearch} 
        isLoading={isLoading} 
        helperText={helperText}
        isError={isError}
      />

      <div className="min-h-[400px]">
        {status === "loading" && (
          <div className="space-y-8">
            <ProfileSkeleton />
            <PostListSkeleton />
          </div>
        )}

        {status === "failed" && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {status === "succeeded" && user && (
          <UserView user={user} posts={posts} />
        )}

        {status === "notFound" && <NotFoundCard numberId={searchId} />}
      </div>
    </div>
  );
}

export default UserSearchPage;
