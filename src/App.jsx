import { useState, useEffect } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAndPosts } from "./redux/slices/userSlice";
import UserProfile from "./components/UserProfile";
import PostList from "./components/PostList";
import ErrorMessage from "./components/ErrorMessage";
import NotFoundCard from "./components/NotFoundCard";
import ProfileSkeleton from "./components/skeletons/ProfileSkeleton";
import PostListSkeleton from "./components/skeletons/PostListSkeleton";
import MainLayout from "./components/layout/MainLayout";

function App() {
    const [userId, setUserId] = useState(1);
    const [searchId, setSearchId] = useState(null);
    const dispatch = useDispatch();
    const { user, posts, isLoading, error } = useSelector(
        (state) => state.user
    );

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^$|^[1-9]$|^10$/.test(value)) {
            setUserId(value);
        }
    };

    const handleSearch = () => {
        if (userId) {
            setSearchId(userId);
            dispatch(fetchUserAndPosts(userId));
        }
    };

    const handleRetry = () => {
        if (searchId) {
            dispatch(fetchUserAndPosts(searchId));
        }
    };

    useEffect(() => {
        dispatch(fetchUserAndPosts(1));
    }, [dispatch]);

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
                        value={userId}
                        onChange={handleInputChange}
                        min="1"
                        max="10"
                    />
                    <Button
                        onClick={handleSearch}
                        disabled={!userId || isLoading}
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
