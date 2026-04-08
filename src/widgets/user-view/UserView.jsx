/**
 * @fileoverview Componente de composición para la vista completa del usuario.
 * Orquesta la visualización del perfil y las publicaciones en un único flujo visual.
 * 
 * @module UserView
 */

import { memo } from "react";
import PropTypes from 'prop-types';
import UserProfile from "@/entities/user/ui/UserProfile";
import PostList from "@/entities/post/ui/PostList";
import { cn } from "@/shared/lib/utils";

/**
 * Vista integrada de resultados de usuario.
 * Combina el perfil detallado y la lista de posts con animaciones de entrada.
 * Implementa diseño Mobile First y layout áureo (1:1.618) en escritorio.
 * 
 * @component
 */
const UserView = memo(({ user, posts }) => {
  return (
    <div className={cn(
      "w-full animate-in fade-in slide-in-from-bottom-4 duration-500",
      // Mobile First: Columna en móvil. Escritorio: Grid Áureo (1 : 1.618)
      "flex flex-col lg:grid lg:grid-cols-[1fr_1.618fr] gap-golden-md items-start"
    )}>
      {/* Columna 1 (1fr): Perfil del Usuario */}
      <aside className="w-full relative lg:sticky lg:top-golden-base z-10">
        <UserProfile user={user} />
      </aside>

      {/* Columna 2 (1.618fr): Publicaciones (Contenido Principal) */}
      <main className="w-full mt-golden-md lg:mt-0">
        {posts.length > 0 ? (
          <PostList userPosts={posts} />
        ) : (
          <div className={cn("p-golden-md text-center glass rounded-3xl")}>
            <p className={cn("text-slate-500 dark:text-slate-400 italic text-golden-p")}>
              Este usuario aún no tiene publicaciones.
            </p>
          </div>
        )}
      </main>
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
