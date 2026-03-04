import { Typography } from "@material-tailwind/react";
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
 * Implementa la composición de hooks para separar lógica de UI y Dominio.
 * 
 * @component
 * @category Features/UserSearch
 */
function UserSearchPage() {
  // Hook de UI: Maneja el estado del input
  const { inputValue, handleInputChange } = useSearchInput("1");
  
  // Hook de Dominio: Maneja los datos y Redux
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

  /**
   * Orquesta la búsqueda llamando al hook de dominio con el valor del hook de UI.
   */
  const handleSearch = () => {
    performSearch(inputValue);
  };

  return (
    <div className="user-search">
      <Typography variant="h3" color="blue-gray" className="user-search__title">
        Buscar Perfil de Usuario por ID
      </Typography>

      <SearchBar 
        value={inputValue} 
        onChange={handleInputChange} 
        onSearch={handleSearch} 
        isLoading={isLoading} 
      />

      {status === "loading" && (
        <div className="results-wrapper">
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
  );
}

export default UserSearchPage;
