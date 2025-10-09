import { useState } from "react";
import {
    Input,
    Typography,
} from "@material-tailwind/react";
import { useUser } from "./hooks/useUser";
import UserCard from "./components/UserCard";
import PostList from "./components/PostList";
import NotFoundCard from "./components/NotFoundCard";
import CardPlaceholder from "./components/common/CardPlaceholder";

const MIN_USER_ID = 1;
const MAX_USER_ID = 10;

const App = () => {
    const [numberId, setNumberId] = useState(MIN_USER_ID);
    const { user, posts, isLoading, isError } = useUser(numberId);

    const handleInputChange = (e) => {
        const value = e.target.value;
        // Allow empty input to clear it, but treat it as 0 for validation
        const numericValue = value === '' ? 0 : Number(value);
        setNumberId(numericValue);
    };

    const isInputValid = numberId >= MIN_USER_ID && numberId <= MAX_USER_ID;

    return (
        <div className="container-custom">
            <Typography variant="h2" color="blue-gray text-center">
                JSON Placeholder Fake API
            </Typography>
            <Typography variant="lead" color="blue-gray">
                React + Material-Tailwind
            </Typography>
            <div className="w-3/4 md:w-2/4 flex flex-col justify-center items-center gap-4 mt-4">
                <Input
                    size="lg"
                    color="blue"
                    label={`Entre [${MIN_USER_ID}-${MAX_USER_ID}]`}
                    name="numberId"
                    type="number"
                    value={numberId === 0 ? '' : numberId}
                    onChange={handleInputChange}
                    error={!isInputValid && numberId !== 0}
                />
                {isLoading ? (
                    <div className="w-full">
                        <CardPlaceholder />
                        <CardPlaceholder />
                    </div>
                ) : isError ? (
                    <div className="error-message">An error occurred: {isError}</div>
                ) : !isInputValid ? (
                    <NotFoundCard numberId={numberId} />
                ) : (
                    user && (
                        <div className="flex flex-col justify-center gap-6 w-full">
                            <UserCard user={user} />
                            {posts.length > 0 && <PostList posts={posts} />}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default App;