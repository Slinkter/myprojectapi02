// Importaciones de componentes de esqueleto (placeholders de carga).
import ProfileSkeleton from "../../components/skeletons/ProfileSkeleton";
import PostListSkeleton from "../../components/skeletons/PostListSkeleton";
// Importaciones de componentes de la aplicación.
import UserProfile from "../../components/UserProfile";
import PostList from "../../components/PostList";
import ErrorMessage from "../../components/ErrorMessage";
import NotFoundCard from "../../components/NotFoundCard";
// Se importa el custom hook `useUser`.
import { useUser } from "../../hooks/useUser";
// Importaciones de componentes de la biblioteca de UI @material-tailwind/react.
import { Input, Button, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

// El componente de la página de búsqueda de usuarios.
function UserSearchPage() {
    // Se utiliza el custom hook `useUser` para obtener el estado y las funciones necesarias.
    const {
        user,
        posts,
        status,
        error,
        searchId,
        inputValue,
        handleInputChange,
        handleSearch,
        handleRetry,
    } = useUser(1);

    // Derivamos si la UI está en estado de carga para deshabilitar controles.
    const isLoading = status === "loading";

    return (
        <div className="user-search">
            <Typography
                variant="h3"
                color="blue-gray"
                className="user-search__title"
            >
                Buscar Perfil de Usuario por ID
            </Typography>
            {/* Sección del formulario de búsqueda */}
            <div className="search-form">
                <Input
                    type="number"
                    label="ID de Usuario (1-10)"
                    value={inputValue}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                />
                <Button
                    onClick={handleSearch}
                    className="search-form__button flex items-center gap-2"
                    disabled={!inputValue || isLoading}
                >
                    {isLoading ? (
                        "Buscando..."
                    ) : (
                        <MagnifyingGlassIcon className="h-5 w-5" />
                    )}
                </Button>
            </div>

            {/* Renderizado basado en el estado 'status' */}
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
                <div className="results-wrapper">
                    <UserProfile user={user} />
                    {posts.length > 0 ? (
                        <PostList posts={posts} />
                    ) : (
                        <Typography className="no-posts__text">
                            Este usuario aún no tiene publicaciones.
                        </Typography>
                    )}
                </div>
            )}

            {/* La tarjeta 'NotFound' se muestra si el estado de la búsqueda es 'notFound'. */}
            {status === "notFound" && <NotFoundCard numberId={searchId} />}
        </div>
    );
}

export default UserSearchPage;
