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
import { Card } from "@/shared/ui/Card";
import { Label, PrimaryText, SecondaryText } from "@/shared/ui/Typography";
import { UserSchema } from "@/shared/lib/schemas/user.schema";
import { zodToPropTypes } from "@/shared/lib/zod-to-prop-types";

/**
 * Subcomponente para renderizar una fila de información con icono.
 * Diseñado para máximo contraste y legibilidad.
 * 
 * @component
 */
const InfoItem = memo(({ icon: Icon, label, value, subValue, isLink }) => {
  return (
    <div className="flex flex-row items-start gap-golden-sm min-w-0 group p-golden-sm sm:p-0 rounded-2xl sm:rounded-none transition-colors bg-slate-100/50 dark:bg-slate-800/50 sm:bg-transparent">
      <div className="p-2 bg-blue-600 dark:bg-blue-500 rounded-xl transition-transform group-hover:scale-110 shrink-0 shadow-sm">
        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <Label>{label}</Label>
        {isLink ? (
          <a
            href={label === "Email" ? `mailto:${value}` : `https://${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-bold break-words transition-colors leading-relaxed text-golden-p text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
          >
            {value}
          </a>
        ) : (
          <PrimaryText>{value}</PrimaryText>
        )}
        {subValue && (
          <SecondaryText>{subValue}</SecondaryText>
        )}
      </div>
    </div>
  );
});

InfoItem.displayName = "InfoItem";

InfoItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  subValue: PropTypes.string,
  isLink: PropTypes.bool,
};

/**
 * Muestra el perfil de un usuario con su información de contacto y laboral.
 * 
 * @component
 */
const UserProfile = memo(({ user }) => {
  if (!user) return null;

  return (
    <Card className="mb-golden-md lg:mb-0 border-slate-200 dark:border-slate-700">
      {/* Cabecera */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white p-golden-base lg:p-golden-md flex flex-col lg:flex-row items-center lg:items-start gap-golden-base text-center lg:text-left relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="p-golden-sm bg-white/20 backdrop-blur-md rounded-2xl shadow-inner border border-white/30 relative z-10">
          <UserIcon className="h-12 w-12" aria-hidden="true" />
        </div>
        <div className="relative z-10">
          <h2 className="text-golden-h3 font-black tracking-tight leading-tight">{user.name}</h2>
          <p className="text-blue-100 font-medium text-golden-p mt-1 opacity-90">@{user.username}</p>
        </div>
      </div>
      
      {/* Cuerpo */}
      <div className="p-golden-base lg:p-golden-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-golden-sm lg:gap-golden-base">
        <InfoItem icon={EnvelopeIcon} label="Email" value={user.email} isLink />
        <InfoItem icon={GlobeAltIcon} label="Website" value={user.website} isLink />
        <InfoItem icon={BriefcaseIcon} label="Company" value={user.company?.name} subValue={user.company?.catchPhrase} />
        <InfoItem icon={MapPinIcon} label="Address" value={`${user.address?.street}, ${user.address?.suite}`} subValue={`${user.address?.city} (${user.address?.zipcode})`} />
      </div>
    </Card>
  );
});

UserProfile.displayName = "UserProfile";

UserProfile.propTypes = {
  user: PropTypes.shape(zodToPropTypes(UserSchema)).isRequired,
};

export default UserProfile;
