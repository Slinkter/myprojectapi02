/**
 * @fileoverview Componente para la visualización de la lista de publicaciones de un usuario.
 * Implementa una cuadrícula responsiva y estados vacíos amigables.
 * 
 * @module PostList
 */

import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

/**
 * Renderiza una colección de artículos (posts) asociados a un perfil de usuario.
 * Incluye efectos visuales de hover y transiciones de entrada.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Array<Object>} props.userPosts - Lista de objetos de publicaciones sanitizadas.
 * @returns {JSX.Element} La sección de publicaciones o un mensaje de "no hay datos".
 * 
 * @example
 * ```tsx
 * <PostList userPosts={[{ id: 1, title: "Post 1", body: "..." }]} />
 * ```
 */
const PostList = ({ userPosts }) => {
  // Early Return: Caso de usuario sin publicaciones.
  if (!userPosts || userPosts.length === 0) {
    return (
      <div className={cn(
        "bg-white/50 dark:bg-slate-900/50 rounded-3xl p-8 text-center border border-dashed border-slate-300 dark:border-slate-700"
      )}>
        <p className="text-slate-500 dark:text-slate-400">Este usuario aún no tiene publicaciones.</p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 px-2">
        <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
        Publicaciones
      </h3>
      <div className="grid gap-6 sm:grid-cols-2">
        {userPosts.map((post) => (
          <article 
            key={post.id} 
            className={cn(
              "group bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800",
              "hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            )}
          >
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {post.title}
            </h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
              {post.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

PostList.propTypes = {
  /** Array de publicaciones. Cada post debe tener id, title y body. */
  userPosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PostList;
