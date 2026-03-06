import {
  UserIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  BriefcaseIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import PropTypes from 'prop-types';

/**
 * Componente de Perfil con soporte para Modo Oscuro.
 * @component
 */
function UserProfile({ user }) {
  if (!user) return null;

  return (
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/40 dark:border-slate-700/40 shadow-2xl rounded-3xl overflow-hidden max-w-2xl mx-auto my-10 animate-in fade-in zoom-in duration-500 transition-colors">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white flex flex-col sm:flex-row items-center gap-6">
        <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-inner border border-white/20">
          <UserIcon className="h-12 w-12" />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-extrabold tracking-tight">{user.name}</h2>
          <p className="text-blue-100 font-medium text-lg">@{user.username}</p>
        </div>
      </div>
      
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
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
}

function InfoItem({ icon: Icon, label, value, subValue, isLink }) {
  return (
    <div className="flex items-start gap-4 group min-w-0">
      <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors shrink-0">
        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-1">{label}</p>
        <p className={`text-slate-800 dark:text-slate-200 font-semibold break-words transition-colors ${isLink ? 'text-blue-600 dark:text-blue-400 hover:underline cursor-pointer' : ''}`}>
          {value}
        </p>
        {subValue && <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-0.5 leading-tight transition-colors break-words">{subValue}</p>}
      </div>
    </div>
  );
}

InfoItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  subValue: PropTypes.string,
  isLink: PropTypes.bool,
};

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserProfile;
