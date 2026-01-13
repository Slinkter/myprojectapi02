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
    <Card className="user-profile">
      <CardBody className="user-profile__body">
        <Avatar
          src={`https://i.pravatar.cc/150?u=${user.id}`}
          alt={user.name}
          size="xl"
          variant="circular"
          className="user-profile__avatar"
        />
        <Typography
          variant="h4"
          color="blue-gray"
          className="user-profile__name"
        >
          {user.name}
        </Typography>
        <Typography color="gray" className="user-profile__username">
          @{user.username}
        </Typography>

        <div className="user-profile__company">
          <BriefcaseIcon className="user-profile__company-icon" />
          <Typography className="user-profile__company-name">
            {user.company.name}
          </Typography>
        </div>
        <Typography color="gray" className="user-profile__catchphrase">
          &ldquo;{user.company.catchPhrase}&rdquo;
        </Typography>

        <div className="user-profile__details">
          <Tooltip content="Dirección">
            <div className="user-profile__detail-item">
              <MapPinIcon className="user-profile__detail-icon" />
              <Typography color="blue-gray">{user.address.city}</Typography>
            </div>
          </Tooltip>
          <Tooltip content="Email">
            <a
              href={`mailto:${user.email}`}
              className="user-profile__detail-item"
            >
              <EnvelopeIcon className="user-profile__detail-icon" />
              <Typography color="blue-gray">{user.email}</Typography>
            </a>
          </Tooltip>
          <Tooltip content="Sitio Web">
            <a
              href={`http://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="user-profile__detail-item"
            >
              <GlobeAltIcon className="user-profile__detail-icon" />
              <Typography color="blue-gray">{user.website}</Typography>
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
