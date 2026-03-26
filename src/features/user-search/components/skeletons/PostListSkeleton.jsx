/**
 * @fileoverview Esqueleto de carga (Skeleton) para la lista de publicaciones.
 * Proporciona feedback visual animado mientras se recuperan los posts de la API.
 * 
 * @module PostListSkeleton
 */

import { memo } from "react";
import { cn } from "@/lib/utils";

/**
 * Renderiza una estructura de carga que imita la disposición de PostList.
 * Utiliza animaciones de pulso nativas de Tailwind CSS.
 * 
 * @component
 */
const PostListSkeleton = memo(() => {
  return (
    <div className={cn("max-w-4xl mx-auto my-12 px-4 animate-pulse")}>
      <div className={cn("flex items-center gap-3 mb-8")}>
        <div className={cn("h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-full")}></div>
        <div className={cn("h-8 bg-slate-200 dark:bg-slate-700 rounded w-48")}></div>
        <div className={cn("h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-12")}></div>
      </div>

      <div className={cn("grid gap-6")}>
        {[1, 2, 3].map((i) => (
          <div key={`post-skeleton-${i}`} className={cn("bg-white/30 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700 p-6 rounded-xl shadow-sm")}>
            <div className={cn("h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4")}></div>
            <div className={cn("h-4 bg-slate-100 dark:bg-slate-800 rounded w-full mb-2")}></div>
            <div className={cn("h-4 bg-slate-100 dark:bg-slate-800 rounded w-full mb-2")}></div>
            <div className={cn("h-4 bg-slate-100 dark:bg-slate-800 rounded w-2/3")}></div>
          </div>
        ))}
      </div>
    </div>
  );
});

PostListSkeleton.displayName = "PostListSkeleton";

export default PostListSkeleton;
