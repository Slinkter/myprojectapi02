/**
 * @fileoverview Componente para la visualización del perfil de usuario.
 * Presenta información detallada del usuario en una tarjeta con diseño moderno,
 * gradientes y soporte completo para modo oscuro.
 * 
 * @module UserProfile
 */

import { memo } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  BriefcaseIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import PropTypes from 'prop-types';
import { cn } from "@/shared/lib/utils";

/**
 * Subcomponente para renderizar una fila de información con icono.
 * 
 * @component
 */
const InfoItem = memo(({ icon: Icon, label, value, subValue, isLink }) => {
  return (
    <div className={cn("flex items-start gap-4 group min-w-0")}>
      <div className={cn("p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors shrink-0")}>
        <Icon className={cn("h-6 w-6 text-blue-600 dark:text-blue-400")} />
      </div>
      <div className={cn("min-w-0 flex-1")}>
        <p className={cn("text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-1")}>{label}</p>
        <p className={cn(
          "text-slate-800 dark:text-slate-200 font-semibold break-words transition-colors",
          isLink && "text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
        )}>
          {value}
        </p>
        {subValue && (
          <p className={cn("text-xs text-slate-500 dark:text-slate-400 italic mt-0.5 leading-tight transition-colors break-words")}>
            {subValue}
          </p>
        )}
      </div>
    </div>
  );
});

InfoItem.displayName = "InfoItem";

InfoItem.propTypes = {
  /** Componente de icono para mostrar al lado de la información. */
  icon: PropTypes.elementType.isRequired,
  /** Etiqueta pequeña superior. */
  label: PropTypes.string.isRequired,
  /** Valor principal del campo. */
  value: PropTypes.string,
  /** Texto secundario descriptivo. */
  subValue: PropTypes.string,
  /** Flag para habilitar cursor pointer y estilos de enlace. */
  isLink: PropTypes.bool,
};

/**
 * Muestra el perfil de un usuario con su información de contacto y laboral.
 * Diseñado con una cabecera visualmente atractiva y una rejilla de datos.
 * 
 * @component
 */
const UserProfile = memo(({ user }) => {
  if (!user) return null;

  return (
    <div className={cn("bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/40 dark:border-slate-700/40 shadow-2xl rounded-3xl overflow-hidden max-w-2xl mx-auto my-10 animate-in fade-in zoom-in duration-500 transition-colors")}>
      <div className={cn("bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white flex flex-col sm:flex-row items-center gap-6")}>
        <div className={cn("p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-inner border border-white/20")}>
          <UserIcon className={cn("h-12 w-12")} />
        </div>
        <div className={cn("text-center sm:text-left")}>
          <h2 className={cn("text-3xl font-extrabold tracking-tight")}>{user.name}</h2>
          <p className={cn("text-blue-100 font-medium text-lg")}>@{user.username}</p>
        </div>
      </div>
      
      <div className={cn("p-8 grid grid-cols-1 md:grid-cols-2 gap-8")}>
        <InfoItem icon={EnvelopeIcon} label="Email" value={user.email} isLink />
        <InfoItem icon={GlobeAltIcon} label="Website" value={user.website} />
        <InfoItem 
          icon={BriefcaseIcon} 
          label="Company" 
          value={user.company?.name} 
          subValue={user.company?.catchPhrase} 
        />
        <InfoItem 
          icon={MapPinIcon} 
          label="Address" 
          value={`${user.address?.street}, ${user.address?.suite}`} 
          subValue={`${user.address?.city} (${user.address?.zipcode})`}
        />
      </div>
    </div>
  );
});

UserProfile.displayName = "UserProfile";

UserProfile.propTypes = {
  /** Objeto de usuario con la estructura del dominio definida en mappers. */
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
    website: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
      catchPhrase: PropTypes.string
    }).isRequired,
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      suite: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      zipcode: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
};

export default UserProfile;
