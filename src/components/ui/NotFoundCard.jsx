import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

/**
 * Muestra una tarjeta indicando que el usuario no fue encontrado.
 * @param {object} props - Propiedades del componente.
 * @param {string|number} props.numberId - El ID del usuario que no se encontró.
 * @returns {JSX.Element}
 */
const NotFoundCard = React.memo(({ numberId }) => {
    return (
        <Card className="not-found-card bg-yellow-50/50 border border-yellow-200 dark:bg-gray-800 dark:border-yellow-900">
            <CardBody className="not-found-card__body">
                <UserCircleIcon className="not-found-card__icon" />
                <Typography
                    variant="h5"
                    color="yellow"
                    className="not-found-card__title dark:text-yellow-400"
                >
                    Usuario no encontrado
                </Typography>
                <Typography
                    variant="lead"
                    color="gray"
                    className="max-w-md mx-auto dark:text-gray-400"
                >
                    No pudimos encontrar un usuario con el ID{" "}
                    <span className="not-found-card__id font-semibold text-blue-gray-800 dark:text-gray-200">
                        {numberId}
                    </span>
                    .
                </Typography>
                <Typography color="gray" className="not-found-card__hint">
                    Por favor, selecciona un ID de usuario entre 1 y 10.
                </Typography>
            </CardBody>
        </Card>
    );
});

NotFoundCard.displayName = "NotFoundCard";

NotFoundCard.propTypes = {
    numberId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
};

export default NotFoundCard;
