/**
 * @file Componente para mostrar un mensaje de error con un diseño mejorado.
 * @author Tu Nombre
 */

import { Alert, Button, Typography } from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

/**
 * Muestra un panel de alerta con un mensaje de error, un ícono y un botón para reintentar.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.message - El mensaje de error a mostrar.
 * @param {Function} props.onRetry - La función a ejecutar cuando se hace clic en el botón de reintento.
 * @returns {JSX.Element}
 */
function ErrorMessage({ message, onRetry }) {
    return (
        <Alert
            variant="ghost"
            color="red"
            className="p-6 rounded-2xl border border-red-200"
        >
            <div className="flex items-center gap-4">
                <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
                <div>
                    <Typography variant="h6" color="red" className="font-bold">
                        ¡Ha ocurrido un error!
                    </Typography>
                    <Typography color="red" className="font-normal">
                        {message}
                    </Typography>
                </div>
            </div>
            {onRetry && (
                <Button
                    onClick={onRetry}
                    color="red"
                    size="sm"
                    variant="filled"
                    className="mt-6 w-full sm:w-auto"
                >
                    Reintentar
                </Button>
            )}
        </Alert>
    );
}

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
    onRetry: PropTypes.func,
};

export default ErrorMessage;