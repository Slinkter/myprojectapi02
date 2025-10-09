
/**
 * @file Página de inicio de la aplicación.
 * @author Tu Nombre
 */

import { Link } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";

/**
 * Muestra la página de inicio con un mensaje de bienvenida y un llamado a la acción.
 * @returns {JSX.Element}
 */
function HomePage() {
    return (
        <div className="text-center">
            <Typography variant="h2" color="blue-gray" className="mb-4">
                Bienvenido al Visor de Perfiles
            </Typography>
            <Typography variant="lead" color="gray" className="mb-8">
                Selecciona un usuario para ver su perfil y sus publicaciones.
            </Typography>
            <Link to="/profile/1">
                <Button color="blue">
                    Ver Perfil del Usuario 1
                </Button>
            </Link>
        </div>
    );
}

export default HomePage;
