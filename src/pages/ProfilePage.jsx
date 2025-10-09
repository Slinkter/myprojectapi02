/**
 * @file Página que muestra el perfil completo de un usuario.
 * @author Tu Nombre
 */

import PropTypes from "prop-types";
import { useUser } from "../hooks/useUser";
import UserProfile from "../components/UserProfile";
import PostList from "../components/PostList";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import NotFoundCard from "../components/NotFoundCard";

/**
 * Componente de página que orquesta la obtención y visualización de los datos de un usuario.
 * Actúa como un "componente contenedor" que utiliza el hook `useUser` y pasa los datos
 * a los componentes presentacionales.
 *
 * @param {object} props - Propiedades del componente.
 * @param {number|string} props.userId - El ID del usuario a mostrar.
 * @returns {JSX.Element}
 */
function ProfilePage({ userId }) {
    const { user, posts, isLoading, error, refetch } = useUser(userId);

    // 1. Muestra el indicador de carga mientras se obtienen los datos.
    if (isLoading) {
        return <Spinner />;
    }

    // 2. Muestra un mensaje de error si alguna de las peticiones falló.
    if (error) {
        return <ErrorMessage message={error} onRetry={refetch} />;
    }

    // 3. Si no se encontró el usuario, muestra la tarjeta de "No Encontrado".
    if (!user) {
        return <NotFoundCard numberId={userId} />;
    }

    // 4. Renderiza los datos si el usuario existe.
    return (
        <>
            <UserProfile user={user} />
            {posts.length > 0 && <PostList posts={posts} />}
        </>
    );
}

ProfilePage.propTypes = {
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
};

export default ProfilePage;
