/**
 * @fileoverview Componente de composición para la vista completa del usuario.
 * Orquesta la visualización del perfil y las publicaciones en un único flujo visual.
 * 
 * @module UserView
 */

import UserProfile from "./UserProfile";
import PostList from "./PostList";
import PropTypes from 'prop-types';
import { cn } from "@/lib/utils";

/**
 * Vista integrada de resultados de usuario.
 * Combina el perfil detallado y la lista de posts con animaciones de entrada.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.user - Objeto de usuario del dominio.
 * @param {Array<Object>} props.posts - Lista de publicaciones del usuario.
 * @returns {JSX.Element} La vista completa renderizada.
 * 
 * @example
 * ```tsx
 * <UserView user={userData} posts={userPosts} />
 * ```
 */
function UserView({ user, posts }) {
  return (
    <div className={cn("w-full animate-in fade-in slide-in-from-bottom-4 duration-500")}>
      <UserProfile user={user} />
      {/* CORRECCIÓN: PostList espera la prop 'userPosts' */}
      {posts.length > 0 ? (
        <PostList userPosts={posts} />
      ) : (
        <div className="mt-8 text-center">
          <p className="text-slate-500 italic">
            Este usuario aún no tiene publicaciones.
          </p>
        </div>
      )}
    </div>
  );
}

UserView.propTypes = {
  /** Objeto de usuario sanitizado. */
  user: PropTypes.object.isRequired,
  /** Lista de posts del usuario. */
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserView;
