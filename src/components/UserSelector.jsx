/**
 * @file Componente para seleccionar un usuario de una lista.
 * @author Tu Nombre
 */

import { Select, Option } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

/**
 * Muestra un dropdown para seleccionar un ID de usuario del 1 al 10.
 * @param {object} props - Propiedades del componente.
 * @param {number} props.selectedUserId - El ID del usuario actualmente seleccionado.
 * @returns {JSX.Element}
 */
function UserSelector({ selectedUserId }) {
    const navigate = useNavigate();
    const userIds = Array.from({ length: 10 }, (_, i) => i + 1);

    const handleUserChange = (userId) => {
        navigate(`/profile/${userId}`);
    };

    return (
        <div className="w-full md:w-72">
            <Select
                label="Seleccionar Usuario"
                value={String(selectedUserId)}
                onChange={handleUserChange}
            >
                {userIds.map((id) => (
                    <Option key={id} value={String(id)}>
                        Usuario {id}
                    </Option>
                ))}
            </Select>
        </div>
    );
}

UserSelector.propTypes = {
    selectedUserId: PropTypes.number.isRequired,
};

export default UserSelector;
