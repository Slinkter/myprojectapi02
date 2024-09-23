// Importar React y varios hooks de React
import { useCallback, useEffect, useState } from "react";
import {
    Input,
    Card,
    CardBody,
    Typography,
    Spinner,
} from "@material-tailwind/react";
// Importar funciones asincrónicas para obtener datos de la API
import { getUser } from "./components/getUserApi";
import { getPost } from "./components/getPostApi";
// Componente funcional
const App = () => {
    // hook : Estados locales
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [numberId, setNumberId] = useState(1);
    const [user, setUser] = useState({});
    const [post, setPost] = useState([]);
    // Función
    const updateUser = useCallback(() => {
        console.group("Func 1 - updateUser");

        try {
            setIsLoading(true);
            getUser(numberId)
                .then((data) => setUser(data)) // Actualizar el estado 'user' con los datos obtenidos
                .catch((err) => setIsError(err)); // Manejar errores si la solicitud falla
        } catch (error) {
            setIsError(error);
            console.log("error : ", error);
        } finally {
            setIsLoading(false);
        }
        console.log(user);
        console.groupEnd();
    }, [numberId]); // Dependencia: 'numberId'

    // Función
    const updatePost = useCallback(() => {
        console.group("Func 2 - updateUser");
        try {
            getPost(user?.id)
                .then((data) => setPost(data)) // Actualizar el estado 'post' con los datos obtenidos
                .catch((err) => setIsError(err)); // Manejar errores si la solicitud falla
        } catch (error) {
            setIsError(error);
            console.log("error : ", error);
        } finally {
            setIsLoading(false);
        }
        console.log(post);
        console.groupEnd();
    }, [user.id]); // Dependencia: 'user.id'

    // Efecto para actualizar datos de usuario cuando 'numberId' cambia
    useEffect(() => {
        console.log("useEffect - 1");
        updateUser();
    }, [numberId, updateUser]); // Dependencias: 'numberId', 'updateUser'

    // Efecto para actualizar datos de posts cuando 'user' cambia
    useEffect(() => {
        console.log("useEffect - 2");
        if (!user.id) {
            setPost([]); // Si 'user.id' es null, establecer 'post' como un array vacío
            // setNumberId(0);
        } else {
            updatePost(); // Si 'user.id' es truthy, obtener y actualizar datos de posts
        }
    }, [user, updatePost]); // Dependencias: 'user', 'updatePost'

    console.group("Render Component");
    console.log("render");
    console.log("numberId : ", numberId);
    console.log("user : ", user);
    console.log("post : ", post);
    console.groupEnd();

    return (
        <div className="container-custom">
            <Typography variant="h1" color="blue-gray">
                Fake API
            </Typography>
            <Typography variant="lead" color="blue-gray">
                jsonplaceholder + tailwind css
            </Typography>
            {/* Condición de renderizado basada en 'user.id' */}
            {isLoading && <Spinner className="h-36 w-36 " />}
            {!isLoading && (
                <div className="w-3/4 text-center ">
                    <Input
                        size="lg"
                        color="blue"
                        label="Entre [1-10]"
                        name="numberId"
                        value={numberId}
                        onChange={(e) => setNumberId(Number(e.target.value))}
                    />
                </div>
            )}
            {!isLoading && (
                <div className="flex flex-col justify-around items-center  m-0 p-0 gap-6 text-center  w-3/4  ">
                    {numberId === 0 || numberId > 10 || numberId < 0 ? (
                        <>
                            <Card className="mt-2 w-full">
                                <CardBody>
                                    <Typography variant="h5" color="red">
                                        no existe usuario
                                    </Typography>
                                    <Typography variant="lead" color="red">
                                        debes escoger entre [1-10]
                                    </Typography>
                                </CardBody>
                            </Card>
                        </>
                    ) : (
                        <div className="flex flex-col justify-center gap-6 w-full">
                            <Card className="mt-2 w-full">
                                <CardBody>
                                    <Typography>{user.name}</Typography>
                                    <Typography>{user.email}</Typography>
                                    <Typography>{user.phone}</Typography>
                                </CardBody>
                            </Card>

                            {/* Renderizar lista de posts */}
                            <Card className="w-full">
                                <CardBody>
                                    <ul className="text-left">
                                        {post.map((item, idx) => (
                                            <Typography
                                                key={item.id}
                                                variant="par"
                                            >
                                                <span>{idx}</span> ){" "}
                                                {item.title}.
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardBody>
                            </Card>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
