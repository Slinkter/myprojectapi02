/**
 * @file Componente para mostrar el perfil de un usuario con un diseño mejorado.
 * @author Tu Nombre
 */

import {
    Card,
    CardBody,
    Typography,
    Avatar,
    Tooltip,
} from "@material-tailwind/react";
import {
    BriefcaseIcon,
    MapPinIcon,
    EnvelopeIcon,
    GlobeAltIcon,
} from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

/**
 * Muestra una tarjeta de perfil de usuario con un diseño profesional y atractivo.
 * @param {object} props - Propiedades del componente.
 * @param {object} props.user - El objeto de usuario con sus datos.
 * @returns {JSX.Element}
 */
function UserProfile({ user }) {
    return (
        <Card className="w-full shadow-xl rounded-2xl overflow-hidden">
            <CardBody className="p-6 text-center">
                {/* Avatar y Nombre */}
                <Avatar
                    src={`https://i.pravatar.cc/150?u=${user.id}`}
                    alt={user.name}
                    size="xl"
                    variant="circular"
                    className="mx-auto mb-4 border-4 border-blue-500"
                />
                <Typography variant="h4" color="blue-gray" className="font-bold">
                    {user.name}
                </Typography>
                <Typography
                    color="gray"
                    className="text-lg font-medium mb-6"
                >
                    @{user.username}
                </Typography>

                {/* Información de la Compañía */}
                <div className="flex items-center justify-center gap-2 mb-4">
                    <BriefcaseIcon className="h-6 w-6 text-gray-500" />
                    <Typography className="font-semibold text-gray-700">
                        {user.company.name}
                    </Typography>
                </div>
                <Typography
                    color="gray"
                    className="italic text-sm max-w-md mx-auto mb-8"
                >
                    "{user.company.catchPhrase}"
                </Typography>

                {/* Detalles de Contacto */}
                <div className="flex flex-wrap justify-center gap-6 text-left">
                    <Tooltip content="Dirección">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <MapPinIcon className="h-5 w-5 text-blue-500" />
                            <Typography color="blue-gray">
                                {user.address.city}
                            </Typography>
                        </div>
                    </Tooltip>
                    <Tooltip content="Email">
                        <a
                            href={`mailto:${user.email}`}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <EnvelopeIcon className="h-5 w-5 text-blue-500" />
                            <Typography color="blue-gray">
                                {user.email}
                            </Typography>
                        </a>
                    </Tooltip>
                    <Tooltip content="Sitio Web">
                        <a
                            href={`http://${user.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <GlobeAltIcon className="h-5 w-5 text-blue-500" />
                            <Typography color="blue-gray">
                                {user.website}
                            </Typography>
                        </a>
                    </Tooltip>
                </div>
            </CardBody>
        </Card>
    );
}

UserProfile.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        website: PropTypes.string.isRequired,
        company: PropTypes.shape({
            name: PropTypes.string,
            catchPhrase: PropTypes.string,
        }),
        address: PropTypes.shape({
            city: PropTypes.string,
        }),
    }).isRequired,
};

export default UserProfile;