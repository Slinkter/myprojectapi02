// Importaciones de componentes de la biblioteca de UI @material-tailwind/react.
import { Input, Button, Typography } from "@material-tailwind/react";
// Importaciones de componentes de la aplicación.
import UserProfile from "./components/UserProfile";
import PostList from "./components/PostList";
import ErrorMessage from "./components/ErrorMessage";
import NotFoundCard from "./components/NotFoundCard";
// Importaciones de componentes de esqueleto (placeholders de carga).
import ProfileSkeleton from "./components/skeletons/ProfileSkeleton";
import PostListSkeleton from "./components/skeletons/PostListSkeleton";
import MainLayout from "./components/layout/MainLayout";
// Se importa el custom hook `useUser`.
// Un custom hook es una función de JavaScript que utiliza otros hooks de React
// para encapsular y reutilizar lógica con estado entre componentes.
// En este caso, `useUser` maneja la lógica para buscar un usuario y sus publicaciones.
import { useUser } from "./hooks/useUser";

// El componente principal de la aplicación.
function App() {
    // Se utiliza el custom hook `useUser` para obtener el estado y las funciones necesarias.
    // `useUser` devuelve un objeto con el usuario, sus publicaciones, el estado de carga,
    // errores, y manejadores de eventos. Se inicializa con el ID de usuario 1.
    const {
        user,
        posts,
        isLoading,
        error,
        inputValue,
        searchId,
        handleInputChange,
        handleSearch,
        handleRetry,
    } = useUser(1);

    return (
        // `MainLayout` es un componente que proporciona la estructura visual base de la página.
        <MainLayout>
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
                        className="search-form__button"
                        disabled={!inputValue || isLoading}
                    >
                        {isLoading ? "Buscando..." : "Buscar"}
                    </Button>
                </div>

                {/* Renderizado condicional: Muestra los esqueletos de carga mientras `isLoading` es true. */}
                {isLoading && (
                    <div className="results-wrapper">
                        <ProfileSkeleton />
                        <PostListSkeleton />
                    </div>
                )}

                {/* Renderizado condicional: Muestra un mensaje de error si `error` tiene un valor. */}
                {error && (
                    <ErrorMessage message={error} onRetry={handleRetry} />
                )}

                {/* Renderizado condicional: Muestra el perfil del usuario y sus publicaciones si la carga ha terminado, no hay errores y se encontró un usuario. */}
                {!isLoading && !error && user && (
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

                {/* Renderizado condicional: Muestra una tarjeta de "no encontrado" si la búsqueda se completó sin errores pero no se encontró un usuario. */}
                {!isLoading && !error && !user && searchId && (
                    <NotFoundCard numberId={searchId} />
                )}
            </div>
        </MainLayout>
    );
}

export default App;
