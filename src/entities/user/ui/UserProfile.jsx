/**
 * @fileoverview Componente para la visualización del perfil de usuario.
 * Presenta información detallada del usuario en una tarjeta con diseño Glassmorphism,
 * alto contraste y soporte completo para modo oscuro. Implementa diseño Mobile First
 * y accesibilidad WCAG.
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
 * Diseñado para máximo contraste y legibilidad.
 * 
 * @component
 */
const InfoItem = memo(({ icon: Icon, label, value, subValue, isLink }) => {
  return (
    <div className={cn(
      "flex flex-row items-start gap-golden-sm min-w-0 group",
      "p-golden-sm sm:p-0 rounded-2xl sm:rounded-none transition-colors",
      "bg-slate-100/50 dark:bg-slate-800/50 sm:bg-transparent"
    )}>
      <div className={cn(
        "p-2 bg-blue-600 dark:bg-blue-500 rounded-xl transition-transform group-hover:scale-110 shrink-0",
        "shadow-sm"
      )}>
        <Icon className={cn("h-5 w-5 text-white")} aria-hidden="true" />
      </div>
      <div className={cn("min-w-0 flex-1")}>
        <p className={cn("text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5")}>
          {label}
        </p>
        {isLink ? (
          <a
            href={label === "Email" ? `mailto:${value}` : `https://${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "block text-slate-900 dark:text-white font-bold break-words transition-colors leading-relaxed text-golden-p",
              "text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
            )}
          >
            {value}
          </a>
        ) : (
          <p className={cn("text-slate-900 dark:text-white font-bold break-words transition-colors leading-relaxed text-golden-p")}>
            {value}
          </p>
        )}
        {subValue && (
          <p className={cn("text-sm text-slate-600 dark:text-slate-300 italic mt-0.5 leading-tight transition-colors break-words")}>
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
 * Implementa el patrón de "Dumb Component" recibiendo datos vía props.
 * 
 * @component
 */
const UserProfile = memo(({ user }) => {
  if (!user) return null;

  return (
    <div className={cn(
      "glass rounded-3xl overflow-hidden w-full transition-all duration-300",
      "mb-golden-md lg:mb-0 border-slate-200 dark:border-slate-700",
      "shadow-2xl"
    )}>
      {/* Cabecera de Alto Impacto */}
      <div className={cn(
        "bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white",
        "p-golden-base lg:p-golden-md flex flex-col lg:flex-row items-center lg:items-start gap-golden-base text-center lg:text-left",
        "relative overflow-hidden"
      )}>
        {/* Elemento decorativo para profundidad */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        
        <div className={cn(
          "p-golden-sm bg-white/20 backdrop-blur-md rounded-2xl shadow-inner border border-white/30",
          "relative z-10"
        )}>
          <UserIcon className={cn("h-12 w-12")} aria-hidden="true" />
        </div>
        <div className="relative z-10">
          <h2 className={cn("text-golden-h3 font-black tracking-tight leading-tight")}>
            {user.name}
          </h2>
          <p className={cn("text-blue-100 font-medium text-golden-p mt-1 opacity-90")}>
            @{user.username}
          </p>
        </div>
      </div>
      
      {/* Cuerpo del Perfil - Grid Responsivo */}
      <div className={cn(
        "p-golden-base lg:p-golden-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-golden-sm lg:gap-golden-base",
        "bg-white/40 dark:bg-slate-900/40"
      )}>
        <InfoItem icon={EnvelopeIcon} label="Email" value={user.email} isLink />
        <InfoItem icon={GlobeAltIcon} label="Website" value={user.website} isLink />
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
