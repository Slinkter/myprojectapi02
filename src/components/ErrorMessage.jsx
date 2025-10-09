import React from 'react';
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
const ErrorMessage = React.memo(({ message, onRetry }) => {
    return (
        <Alert
            variant="ghost"
            color="red"
            className="p-6 rounded-2xl border border-red-200 bg-red-50/50"
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
                <div className="mt-6 flex justify-end">
                    <Button
                        onClick={onRetry}
                        color="red"
                        size="sm"
                        variant="filled"
                    >
                        Reintentar
                    </Button>
                </div>
            )}
        </Alert>
    );
});

ErrorMessage.displayName = 'ErrorMessage';

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
    onRetry: PropTypes.func,
};

export default ErrorMessage;
