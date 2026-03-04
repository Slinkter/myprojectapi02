/**
 * Esqueleto de carga para el perfil de usuario.
 * Estilizado con Tailwind CSS v4 puro.
 * @component
 */
function ProfileSkeleton() {
  return (
    <div className="bg-white/50 backdrop-blur-md border border-slate-200 shadow-lg rounded-2xl overflow-hidden max-w-2xl mx-auto my-8 animate-pulse">
      <div className="bg-slate-200 p-6 flex items-center gap-4 h-32">
        <div className="p-3 bg-slate-300 rounded-full h-16 w-16"></div>
        <div className="flex-1">
          <div className="h-6 bg-slate-300 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-slate-300 rounded w-1/4"></div>
        </div>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="h-6 w-6 bg-slate-200 rounded shrink-0"></div>
            <div className="flex-1">
              <div className="h-3 bg-slate-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileSkeleton;
