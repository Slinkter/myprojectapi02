/**
 * @fileoverview Esqueleto de carga (Skeleton) para el perfil de usuario.
 * Proporciona feedback visual animado mientras se recuperan los datos del perfil.
 * 
 * @module ProfileSkeleton
 */

import { cn } from "@/shared/lib/utils";
import Shimmer from "@/shared/ui/Shimmer";

/**
 * Renderiza una estructura de carga que imita la disposición de UserProfile.
 * Utiliza contenedores translúcidos y animaciones de pulso de Tailwind CSS.
 * 
 * @component
 * @returns {JSX.Element} El esqueleto del perfil de usuario.
 */
function ProfileSkeleton() {
  return (
    <div className={cn("relative overflow-hidden glass rounded-2xl max-w-2xl mx-auto my-8")}>
      <Shimmer />
      <div className={cn("bg-slate-200 p-6 flex items-center gap-4 h-32")}>
        <div className={cn("p-3 bg-slate-300 rounded-full h-16 w-16")}></div>
        <div className={cn("flex-1")}>
          <div className={cn("h-6 bg-slate-300 rounded w-1/3 mb-2")}></div>
          <div className={cn("h-4 bg-slate-300 rounded w-1/4")}></div>
        </div>
      </div>
      
      <div className={cn("p-6 grid grid-cols-1 md:grid-cols-2 gap-6")}>
        {[1, 2, 3, 4].map((i) => (
          <div key={`profile-field-${i}`} className={cn("flex items-start gap-3")}>
            <div className={cn("h-6 w-6 bg-slate-200 rounded shrink-0")}></div>
            <div className={cn("flex-1")}>
              <div className={cn("h-3 bg-slate-200 rounded w-1/4 mb-2")}></div>
              <div className={cn("h-4 bg-slate-200 rounded w-3/4")}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileSkeleton;
