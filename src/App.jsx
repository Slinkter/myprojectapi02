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
    const [numberId, setNumberId] = useState(1);
    const [user, setUser] = useState({});
    const [post, setPost] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);

    // Función para obtener el usuario
    const fetchUser = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getUser(numberId);
            setUser(data);
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
        } catch (err) {
            setIsError("Error fetching posts");
        }
    }, [user.id]);

    useEffect(() => {
        fetchUser();
    }, [numberId, fetchUser]);

    useEffect(() => {
        if (user.id) fetchPost();
        else setPost([]);
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

    return (
        <div className="container-custom">
            {isLoading ? (
                <Spinner className="h-24 w-24" />
            ) : isError ? (
                <div className="error-message">
                    An error occurred: {isError}
                </div>
            ) : (
                <>
                    <Typography variant="h1" color="blue-gray">
                        Fake API
                    </Typography>
                    <Typography variant="lead" color="blue-gray">
                        jsonplaceholder + tailwind css
                    </Typography>
                    <div className="w-3/4 text-center ">
                        <Input
                            size="lg"
                            color="blue"
                            label="Entre [1-10]"
                            name="numberId"
                            value={numberId}
                            onChange={(e) =>
                                setNumberId(Number(e.target.value))
                            }
                        />
                    </div>

                    {numberId <= 0 || numberId > 10 ? (
                        <Card className="mt-2 w-3/4">
                            <CardBody>
                                <Typography variant="h5" color="red">
                                    No existe usuario
                                </Typography>
                                <Typography variant="lead" color="red">
                                    Debes escoger entre [1-10]
                                </Typography>
                            </CardBody>
                        </Card>
                    ) : (
                        <div className="flex flex-col justify-center gap-6 w-3/4">
                            <CardUser user={user} />
                            <CardPostUser postList={postList} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

const CardPostUser = ({ postList }) => (
    <Card className="w-full">
        <CardBody>
            <ul className="text-left">{postList}</ul>
        </CardBody>
    </Card>
);

// Componente memoizado para evitar renderizados innecesarios
const CardUser = memo(({ user }) => (
    <Card className="mt-2 w-full">
        <CardBody>
            <Typography>{user.name}</Typography>
            <Typography>{user.email}</Typography>
            <Typography>{user.phone}</Typography>
        </CardBody>
    </Card>
));

CardUser.displayName = "CardUser";

export default App;
