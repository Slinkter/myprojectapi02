// Importar React y varios hooks de React
import React, { useCallback, useEffect, useState } from "react";
// Importar funciones asincrónicas para obtener datos de la API
import { getUser } from "./components/getUserApi";
import { getPost } from "./components/getPostApi";
// Componente funcional
const App = () => {
  // Estados locales
  const [user, setUser] = useState({});
  const [post, setPost] = useState([]);
  const [numberId, setNumberId] = useState(1);

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
      setPost([]); // Si 'user.id' es falsy, establecer 'post' como un array vacío
    } else {
      updatePost(); // Si 'user.id' es truthy, obtener y actualizar datos de posts
    }
  }, [user, updatePost]); // Dependencias: 'user', 'updatePost'

  // Renderizar el componente
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form>
        <div>
          <label htmlFor="">Ingresa id user : </label>
          <input
            type="text"
            name="numberId"
            value={numberId}
            onChange={(e) => onChangeNumber(e)}
          />
        </div>
      </form>
      <br />
      {/* Condición de renderizado basada en 'user.id' */}
      {user.id === 0 ? null : (
        <div className="border-4 border-red-500 text-center">
          <hr />
          <div>
            <p>Name : {user.name}</p>
            <p>Email : {user.email}</p>
            <p>Phone : {user.phone}</p>
          </div>
          <hr />
          <br />
          <h5>Post User</h5>
          <br />
          {/* Renderizar lista de posts */}
          <ul className="">
            {post.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
