/**
 * @fileoverview Componente para la visualización del perfil de usuario.
 * Presenta información detallada del usuario en una tarjeta con diseño moderno,
 * gradientes y soporte completo para modo oscuro. Implementa diseño Mobile First
 * y proporciones áureas en tipografía y espaciado.
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
    <div className={cn(
      "flex flex-row items-start gap-golden-sm min-w-0",
      "p-golden-sm sm:p-0 rounded-2xl sm:rounded-none bg-slate-50/50 dark:bg-slate-800/50 sm:bg-transparent sm:dark:bg-transparent"
    )}>
      <div className={cn("p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors shrink-0")}>
        <Icon className={cn("h-5 w-5 text-blue-600 dark:text-blue-400")} aria-hidden="true" />
      </div>
      <div className={cn("min-w-0 flex-1")}>
        {/* UX: Aumento de fuente mínima (text-xs) y contraste (slate-500) */}
        <p className={cn("text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1")}>{label}</p>
        {isLink ? (
          <a
            href={label === "Email" ? `mailto:${value}` : `https://${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "block text-slate-800 dark:text-slate-200 font-semibold break-words transition-colors leading-relaxed text-golden-p text-blue-600 dark:text-blue-400 hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
            )}
          >
            {value}
          </a>
        ) : (
          <p className={cn("text-slate-800 dark:text-slate-200 font-semibold break-words transition-colors leading-relaxed text-golden-p")}>
            {value}
          </p>
        )}
        {subValue && (
          /* UX: Contraste mejorado en subValue a slate-600 (Light Mode) */
          <p className={cn("text-xs text-slate-600 dark:text-slate-400 italic mt-0.5 leading-tight transition-colors break-words")}>
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
 * Diseñado con una cabecera visualmente atractiva y una rejilla de datos Mobile First.
 * 
 * @component
 */
const UserProfile = memo(({ user }) => {
  if (!user) return null;

  return (
    <div className={cn(
      "bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow-xl rounded-3xl overflow-hidden w-full transition-colors",
      "mb-golden-md lg:mb-0" // Margen inferior en móvil
    )}>
      {/* Cabecera Áurea */}
      <div className={cn(
        "bg-gradient-to-br from-blue-600 to-indigo-700 text-white",
        // Mobile First: padding base y elementos centrados. LG: padding áureo y flex-row
        "p-golden-base lg:p-golden-md flex flex-col lg:flex-row items-center lg:items-start gap-golden-base text-center lg:text-left"
      )}>
        <div className={cn("p-golden-sm bg-white/20 backdrop-blur-sm rounded-2xl shadow-inner border border-white/20")}>
          <UserIcon className={cn("h-12 w-12")} aria-hidden="true" />
        </div>
        <div>
          {/* Tipografía Áurea para h3 y p */}
          <h2 className={cn("text-golden-h3 font-extrabold tracking-tight leading-tight")}>{user.name}</h2>
          <p className={cn("text-blue-100 font-medium text-golden-p mt-1")}>@{user.username}</p>
        </div>
      </div>
      
      {/* Cuerpo del Perfil */}
      <div className={cn(
        // Mobile First: 1 columna. MD: 2 columnas en grid
        "p-golden-base lg:p-golden-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-golden-sm lg:gap-golden-base"
      )}>
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
