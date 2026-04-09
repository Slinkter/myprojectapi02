/**
 * @fileoverview Componente para la visualización de la lista de publicaciones de un usuario.
 * Implementa una cuadrícula responsiva con diseño Glassmorphism, alto contraste
 * y accesibilidad WCAG.
 * 
 * @module PostList
 */

import { memo } from "react";
import PropTypes from "prop-types";
import { cn } from "@/shared/lib/utils";

/**
 * Renderiza una colección de artículos (posts) asociados a un perfil de usuario.
 * Implementado como "Dumb Component" para máxima reutilización y testabilidad.
 * 
 * @component
 */
const PostList = memo(({ userPosts }) => {
  // Early Return: Caso de usuario sin publicaciones.
  if (!userPosts || userPosts.length === 0) {
    return (
      <div className={cn(
        "glass rounded-3xl p-12 text-center border-dashed border-slate-300 dark:border-slate-700 animate-in fade-in duration-300",
        "flex flex-col items-center justify-center gap-4"
      )}>
        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full">
          <svg className="w-12 h-12 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6m-10 4h10" />
          </svg>
        </div>
        <p className={cn("text-slate-600 dark:text-slate-300 font-semibold text-golden-p")}>
          Este usuario aún no tiene publicaciones.
        </p>
      </div>
    );
  }

  return (
    <section className={cn("space-y-golden-md")}>
      <div className={cn("flex items-center gap-3 px-2 mb-golden-base")}>
        <span className={cn("w-1.5 h-8 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]")}></span>
        <h3 className={cn("text-golden-h3 font-black text-slate-900 dark:text-white tracking-tight")}>
          Publicaciones
        </h3>
      </div>
      
      <div className={cn("grid gap-golden-base sm:grid-cols-2")}>
        {userPosts.map((post) => (
          <article 
            key={post.id} 
            className={cn(
              "glass p-golden-base rounded-3xl shadow-sm transition-all duration-300 ease-out",
              "hover:shadow-xl hover:-translate-y-1 hover:border-blue-400 dark:hover:border-blue-500 group",
              "flex flex-col h-full"
            )}
          >
            <h4 className={cn(
              "text-golden-p font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 transition-colors",
              "group-hover:text-blue-600 dark:group-hover:text-blue-400"
            )}>
              {post.title}
            </h4>
            <p className={cn("text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3 flex-1")}>
              {post.body}
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
               <span className="text-xs font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer hover:underline hover:text-blue-700 dark:hover:text-blue-300">

                Leer más →
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
});

PostList.displayName = "PostList";

PostList.propTypes = {
  /** Array de publicaciones. Cada post debe tener id, title y body. */
  userPosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PostList;
