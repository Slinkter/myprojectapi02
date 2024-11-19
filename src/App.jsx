import { useCallback, useEffect, useState, useMemo, memo } from "react";
import {
    Input,
    Card,
    CardBody,
    Typography,
    Spinner,
} from "@material-tailwind/react";
import { getUser } from "./components/getUserApi";
import { getPost } from "./components/getPostApi";

const App = () => {
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [numberId, setNumberId] = useState(1);
    const [user, setUser] = useState({});
    const [post, setPost] = useState([]);

    // Función para obtener el usuario
    const fetchUser = useCallback(async () => {
        try {
            setIsLoading(true);
            const dataUser = await getUser(numberId);
            setUser(dataUser);
            console.log(dataUser);
        } catch (err) {
            setIsError("Error fetching user");
        } finally {
            setIsLoading(false);
        }
    }, [numberId]);

    // Función para obtener los posts
    const fetchPost = useCallback(async () => {
        try {
            const data = await getPost(user.id);
            setPost(data);
            console.log(data);
        } catch (err) {
            setIsError("Error fetching posts");
        }
    }, [user.id]);

    useEffect(() => {
        fetchUser();
    }, [numberId, fetchUser]);

    useEffect(() => {
        if (!user.id) {
            setPost([]);
        } else {
            fetchPost();
        }
    }, [user, fetchPost]);

    // Memorizar la lista de posts
    const postList = useMemo(
        () =>
            post.map((item, idx) => (
                <Typography key={item.id} variant="par">
                    <span>{idx}</span>) {item.title}.
                </Typography>
            )),
        [post]
    );

    if (isError) {
        return (
            <div className="error-message">An error occurred: {isError}</div>
        );
    }

    return (
        <div className="container-custom">
            <>
                <Typography variant="h2" color="blue-gray text-center">
                    JSON Placeholder Fake API
                </Typography>
                <Typography variant="lead" color="blue-gray">
                    React + Material-Tailwind
                </Typography>
                <div className="w-3/4 md:w-2/4 flex flex-col justify-center items-center ">
                    <Input
                        className="2/4"
                        size="lg"
                        color="blue"
                        label="Entre [1-10]"
                        name="numberId"
                        value={numberId}
                        onChange={(e) => setNumberId(Number(e.target.value))}
                    />
                    {isLoading ? (
                        <div className="flex flex-col justify-center items-center gap-6 w-full">
                            {/*    <Spinner className="h-24 w-24 mt-5" /> */}
                            <CardPlaceholder />
                        </div>
                    ) : (
                        <>
                            {numberId <= 0 || numberId > 10 ? (
                                <CardNotFound />
                            ) : (
                                <div className="flex flex-col justify-center gap-6 w-full">
                                    <CardUser user={user} />
                                    <CardPostUser postList={postList} />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </>
        </div>
    );
};

const CardNotFound = () => {
    return (
        <Card className="mt-2 w-full">
            <CardBody>
                <Typography variant="h5" color="red">
                    No existe usuario
                </Typography>
                <Typography variant="lead" color="red">
                    Debes escoger entre [1-10]
                </Typography>
            </CardBody>
        </Card>
    );
};

const CardPostUser = memo(({ postList }) => (
    <Card className="w-full">
        <CardBody>
            <ul className="text-left">{postList}</ul>
        </CardBody>
    </Card>
));
CardPostUser.displayName = "CardPostUser";

// Componente memoizado para evitar renderizados innecesarios
const CardUser = memo(({ user }) => (
    <Card className="mt-2 w-full">
        <CardBody>
            <Typography>{user.name}</Typography>
            <Typography>{user.email}</Typography>
            <Typography>{user.phone}</Typography>
            <Typography>{user.website}</Typography>
        </CardBody>
    </Card>
));
CardUser.displayName = "CardUser";

const CardPlaceholder = () => (
    <Card className="mt-2 w-full p-5">
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    </Card>
);

export default App;
