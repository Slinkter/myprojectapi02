import UserProfile from "./UserProfile";
import PostList from "./PostList";
import PropTypes from 'prop-types';

/**
 * Componente de presentación para los resultados de la búsqueda de usuario.
 * Estilizado con Tailwind CSS v4 puro.
 * @component
 */
function UserView({ user, posts }) {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <UserProfile user={user} />
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p className="text-center text-slate-500 mt-8 italic">
          Este usuario aún no tiene publicaciones.
        </p>
      )}
    </div>
  );
}

UserView.propTypes = {
  user: PropTypes.object.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserView;
