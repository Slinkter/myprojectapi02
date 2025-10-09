import React from 'react';
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import PropTypes from 'prop-types';

/**
 * Muestra una tarjeta indicando que el usuario no fue encontrado.
 * @param {object} props - Propiedades del componente.
 * @param {string|number} props.numberId - El ID del usuario que no se encontró.
 * @returns {JSX.Element}
 */
const NotFoundCard = React.memo(({ numberId }) => {
    return (
        <Card className="mt-2 w-full shadow-lg rounded-2xl bg-yellow-50/50 border border-yellow-200">
            <CardBody className="p-6 text-center">
                <UserCircleIcon className="h-16 w-16 mx-auto text-yellow-600 mb-4" />
                <Typography variant="h5" color="blue-gray" className="font-bold mb-2">
                    Usuario no encontrado
                </Typography>
                <Typography variant="lead" color="gray" className="max-w-md mx-auto">
                    No pudimos encontrar un usuario con el ID{' '}
                    <span className="font-semibold text-blue-gray-800">{numberId}</span>.
                </Typography>
                <Typography color="gray" className="mt-2 text-sm">
                    Por favor, selecciona un ID de usuario entre 1 y 10.
                </Typography>
            </CardBody>
        </Card>
    );
});

NotFoundCard.displayName = 'NotFoundCard';

NotFoundCard.propTypes = {
    numberId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default NotFoundCard;