import React from "react";
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
        <Alert variant="ghost" color="red" className="error-alert">
            <div className="error-alert__content">
                <ExclamationTriangleIcon className="error-alert__icon" />
                <div>
                    <Typography
                        variant="h6"
                        color="red"
                        className="error-alert__title"
                    >
                        ¡Ha ocurrido un error!
                    </Typography>
                    <Typography color="red" className="error-alert__message">
                        {message}
                    </Typography>
                </div>
            </div>
            {onRetry && (
                <div className="error-alert__actions">
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

ErrorMessage.displayName = "ErrorMessage";

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
    onRetry: PropTypes.func,
};

export default ErrorMessage;
