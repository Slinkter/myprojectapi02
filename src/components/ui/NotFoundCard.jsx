import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import PropTypes from 'prop-types';

/**
 * Componente para mostrar cuando un usuario no es encontrado.
 * Estilizado con Tailwind CSS v4 puro.
 * @component
 */
function NotFoundCard({ numberId }) {
  return (
    <div className="max-w-md mx-auto my-12 p-10 bg-white border border-slate-200 rounded-3xl shadow-lg animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col items-center text-center">
        <div className="p-4 bg-slate-100 rounded-full mb-6">
          <MagnifyingGlassIcon className="h-16 w-16 text-slate-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Usuario no encontrado</h3>
        <p className="text-slate-500 mb-6">
          No pudimos encontrar ningún perfil asociado al ID <span className="font-bold text-blue-600">#{numberId}</span>.
        </p>
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 w-1/3 animate-[loading_2s_infinite]"></div>
        </div>
      </div>
    </div>
  );
}

NotFoundCard.propTypes = {
  numberId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default NotFoundCard;
