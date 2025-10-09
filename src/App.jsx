import { Input, Button, Typography } from "@material-tailwind/react";
import UserProfile from "./components/UserProfile";
import PostList from "./components/PostList";
import ErrorMessage from "./components/ErrorMessage";
import NotFoundCard from "./components/NotFoundCard";
import ProfileSkeleton from "./components/skeletons/ProfileSkeleton";
import PostListSkeleton from "./components/skeletons/PostListSkeleton";
import MainLayout from "./components/layout/MainLayout";
import { useUser } from "./hooks/useUser";

function App() {
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
    } = useUser(1); // Inicializamos con el ID de usuario 1

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto">
                <Typography
                    variant="h3"
                    color="blue-gray"
                    className="font-bold mb-4 text-center "
                >
                    Buscar Perfil de Usuario por ID
                </Typography>
                <div className="flex items-center gap-4 mb-8 ">
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
                        disabled={!inputValue || isLoading}
                    >
                        {isLoading ? "Buscando..." : "Buscar"}
                    </Button>
                </div>

                {isLoading && (
                    <div className="space-y-8">
                        <ProfileSkeleton />
                        <PostListSkeleton />
                    </div>
                )}

                {error && (
                    <ErrorMessage message={error} onRetry={handleRetry} />
                )}

                {!isLoading && !error && user && (
                    <div className="space-y-8">
                        <UserProfile user={user} />
                        {posts.length > 0 ? (
                            <PostList posts={posts} />
                        ) : (
                            <Typography className="text-center text-gray-500">
                                Este usuario aún no tiene publicaciones.
                            </Typography>
                        )}
                    </div>
                )}

                {!isLoading && !error && !user && searchId && (
                    <NotFoundCard numberId={searchId} />
                )}
            </div>
        </MainLayout>
    );
}

export default App;
