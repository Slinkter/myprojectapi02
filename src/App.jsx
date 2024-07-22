// Importar React y varios hooks de React
import { useCallback, useEffect, useState } from "react";
import { Input, Card, CardBody, Typography } from "@material-tailwind/react";
// Importar funciones asincrónicas para obtener datos de la API
import { getUser } from "./components/getUserApi";
import { getPost } from "./components/getPostApi";
// Componente funcional
const App = () => {
    // Estados locales
    const [numberId, setNumberId] = useState(1);
    const [user, setUser] = useState({});
    const [post, setPost] = useState([]);
    // Función para obtener y actualizar datos de usuario
    const updateUser = useCallback(() => {
        getUser(numberId)
            .then((data) => setUser(data)) // Actualizar el estado 'user' con los datos obtenidos
            .catch((err) => console.log(err)); // Manejar errores si la solicitud falla
    }, [numberId]); // Dependencia: 'numberId'

    // Función para obtener y actualizar datos de posts
    const updatePost = useCallback(() => {
        getPost(user.id)
            .then((data) => setPost(data)) // Actualizar el estado 'post' con los datos obtenidos
            .catch((err) => console.log(err)); // Manejar errores si la solicitud falla
    }, [user.id]); // Dependencia: 'user.id'

    // Función para manejar cambios en el input de número
    const onChangeNumber = (e) => {
        setNumberId(Number(e.target.value)); // Convertir el valor del input a número y actualizar 'numberId'
    };

    // Efecto para actualizar datos de usuario cuando 'numberId' cambia
    useEffect(() => {
        updateUser();
    }, [numberId, updateUser]); // Dependencias: 'numberId', 'updateUser'

    // Efecto para actualizar datos de posts cuando 'user' cambia
    useEffect(() => {
        if (!user.id) {
            setPost([]); // Si 'user.id' es null, establecer 'post' como un array vacío
            setNumberId(0);
        } else {
            updatePost(); // Si 'user.id' es truthy, obtener y actualizar datos de posts
        }
    }, [user, updatePost]); // Dependencias: 'user', 'updatePost'

    // Renderizar el componente
    return (
        <div className="flex flex-col justify-center  items-center h-screen w-full bg-gray-200  gap-6">
            {/* Column fila 1  */}
            <form className="flex flex-col justify-around items-center w-full m-0 p-0">
                <div className="w-3/4 lg:w-2/4  text-center ">
                    <label htmlFor="">Ingresa id user : </label>
                    <Input
                        size="lg"
                        color="blue"
                        label="Entre [1-10]"
                        type="number"
                        name="numberId"
                        value={numberId}
                        onChange={(e) => onChangeNumber(e)}
                    />
                </div>
            </form>
            {/* Condición de renderizado basada en 'user.id' */}
            {numberId === 0 || numberId > 10 || numberId < 0 ? (
                <>
                    <div className="flex flex-col justify-center items-center  text-center w-3/4 lg:w-2/4">
                        <Card className=" w-full">
                            <CardBody>
                                <Typography>no existe usario</Typography>
                            </CardBody>
                        </Card>
                    </div>
                </>
            ) : (
                <div className="flex flex-col justify-center items-center  text-center w-3/4 lg:w-2/4 gap-6">
                    <Card className="mt-2 w-full">
                        <CardBody>
                            <Typography>Name : {user.name}</Typography>
                            <Typography>Email : {user.email}</Typography>
                            <Typography>Phone : {user.phone}</Typography>
                        </CardBody>
                    </Card>

                    {/* Renderizar lista de posts */}
                    <Card className="w-full">
                        <CardBody>
                            <ul className="">
                                {post.map((item) => (
                                    <Typography key={item.id}>
                                        {item.title}
                                    </Typography>
                                ))}
                            </ul>
                        </CardBody>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default App;
