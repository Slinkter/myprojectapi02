/**
 * @fileoverview Componente de composición para la vista completa del usuario.
 * Orquesta la visualización del perfil y las publicaciones en un único flujo visual.
 * 
 * @module UserView
 */

import { memo } from "react";
import PropTypes from 'prop-types';
import UserProfile from "@/features/user-search/components/UserProfile";
import PostList from "@/features/user-search/components/PostList";
import { cn } from "@/lib/utils";

/**
 * Vista integrada de resultados de usuario.
 * Combina el perfil detallado y la lista de posts con animaciones de entrada.
 * 
 * @component
 */
const UserView = memo(({ user, posts }) => {
  return (
    <div className={cn("w-full animate-in fade-in slide-in-from-bottom-4 duration-500")}>
      <UserProfile user={user} />
      {posts.length > 0 ? (
        <PostList userPosts={posts} />
      ) : (
        <div className={cn("mt-8 text-center")}>
          <p className={cn("text-slate-500 italic")}>
            Este usuario aún no tiene publicaciones.
          </p>
        </div>
      )}
    </div>
  );
});

UserView.displayName = "UserView";

UserView.propTypes = {
  /** Objeto de usuario sanitizado. */
  user: PropTypes.object.isRequired,
  /** Lista de posts del usuario. */
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserView;
