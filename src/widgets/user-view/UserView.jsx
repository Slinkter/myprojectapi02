/**
 * @fileoverview Componente de composición para la vista completa del usuario.
 * Orquesta la carga y visualización del perfil y las publicaciones mediante 
 * el hook useUserProfile, actuando como coordinador inteligente.
 * 
 * @module UserView
 */

import { memo } from "react";
import PropTypes from 'prop-types';
import UserProfile from "@/entities/user/ui/UserProfile";
import PostList from "@/entities/post/ui/PostList";
import StateBoundary from "@/shared/ui/StateBoundary";
import { useUserProfile } from "@/features/user-profile/hooks/useUserProfile";
import { cn } from "@/shared/lib/utils";

/**
 * Vista integrada de resultados de usuario.
 * Utiliza el hook useUserProfile para coordinar la obtención de datos del usuario
 * y sus publicaciones, gestionando los estados de carga, error y no encontrado.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string|number} props.userId - Identificador único del usuario a visualizar.
 * 
 * @returns {JSX.Element} Layout coordinado con perfil y lista de publicaciones.
 */
const UserView = memo(({ userId }) => {
  const { user, posts, isLoading, error, isNotFound } = useUserProfile(userId);

  // Mapeo de estado para StateBoundary
  const status = isNotFound 
    ? "notFound" 
    : isLoading 
      ? "loading" 
      : error 
        ? "failed" 
        : user 
          ? "succeeded" 
          : "idle";

  return (
    <StateBoundary 
      status={status} 
      error={error} 
      className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className={cn(
        "flex flex-col lg:grid lg:grid-cols-[1fr_1.618fr] gap-golden-md items-start"
      )}>
        {/* Columna 1 (1fr): Perfil del Usuario */}
        <aside className="w-full relative lg:sticky lg:top-golden-base z-10">
          <UserProfile user={user} />
        </aside>

        {/* Columna 2 (1.618fr): Publicaciones (Contenido Principal) */}
        <main className="w-full mt-golden-md lg:mt-0">
          {posts && posts.length > 0 ? (
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
    </StateBoundary>
  );
});

UserView.displayName = "UserView";

UserView.propTypes = {
  /** ID del usuario para cargar el perfil y posts. */
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default UserView;
