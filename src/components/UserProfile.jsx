import React from "react";
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
 * Muestra una tarjeta de perfil de usuario
 * @param {object} props - Propiedades del componente.
 * @param {object} props.user - El objeto de usuario con sus datos.
 * @returns {JSX.Element}
 */
const UserProfile = React.memo(({ user }) => {
    return (
        <Card className="w-full shadow-lg rounded-2xl overflow-hidden bg-white">
            <CardBody className="p-6 text-center">
                <Avatar
                    src={`https://i.pravatar.cc/150?u=${user.id}`}
                    alt={user.name}
                    size="xl"
                    variant="circular"
                    className="mx-auto mb-4 border-4 border-blue-500 shadow-lg"
                />
                <Typography
                    variant="h4"
                    color="blue-gray"
                    className="font-bold"
                >
                    {user.name}
                </Typography>
                <Typography color="gray" className="text-lg font-medium mb-6">
                    @{user.username}
                </Typography>

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
                    &ldquo;{user.company.catchPhrase}&rdquo;
                </Typography>

                <div className="flex flex-wrap justify-center gap-6 text-left">
                    <Tooltip content="Dirección">
                        <div className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-blue-500 transition-colors">
                            <MapPinIcon className="h-5 w-5" />
                            <Typography color="blue-gray">
                                {user.address.city}
                            </Typography>
                        </div>
                    </Tooltip>
                    <Tooltip content="Email">
                        <a
                            href={`mailto:${user.email}`}
                            className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-blue-500 transition-colors"
                        >
                            <EnvelopeIcon className="h-5 w-5" />
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
                            className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-blue-500 transition-colors"
                        >
                            <GlobeAltIcon className="h-5 w-5" />
                            <Typography color="blue-gray">
                                {user.website}
                            </Typography>
                        </a>
                    </Tooltip>
                </div>
            </CardBody>
        </Card>
    );
});

UserProfile.displayName = "UserProfile";

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
