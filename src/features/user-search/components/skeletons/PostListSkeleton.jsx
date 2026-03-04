/**
 * Esqueleto de carga para la lista de publicaciones.
 * Estilizado con Tailwind CSS v4 puro.
 * @component
 */
function PostListSkeleton() {
  return (
    <div className="max-w-4xl mx-auto my-12 px-4 animate-pulse">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
        <div className="h-8 bg-slate-200 rounded w-48"></div>
        <div className="h-6 bg-slate-200 rounded-full w-12"></div>
      </div>

      <div className="grid gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/30 border border-slate-100 p-6 rounded-xl shadow-sm">
            <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-slate-100 rounded w-full mb-2"></div>
            <div className="h-4 bg-slate-100 rounded w-full mb-2"></div>
            <div className="h-4 bg-slate-100 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostListSkeleton;
