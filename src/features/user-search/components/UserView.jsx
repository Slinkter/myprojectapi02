import UserProfile from "./UserProfile";
import PostList from "./PostList";
import { Typography } from "@material-tailwind/react";
import PropTypes from 'prop-types';

/**
 * Componente de presentación para los resultados de la búsqueda de usuario.
 * @component
 */
function UserView({ user, posts }) {
  return (
    <div className="results-wrapper">
      <UserProfile user={user} />
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <Typography className="no-posts__text">
          Este usuario aún no tiene publicaciones.
        </Typography>
      )}
    </div>
  );
}

UserView.propTypes = {
  user: PropTypes.object.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserView;
