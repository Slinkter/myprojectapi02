import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";

const currentYear = new Date().getFullYear();

/**
 * Proporciona una estructura de página consistente con un encabezado, contenido principal y pie de página.
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Los componentes hijos que se renderizarán dentro del layout.
 * @returns {JSX.Element}
 */
function MainLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
                    <Typography
                        variant="h4"
                        color="blue-gray"
                        className="font-bold text-center"
                    >
                        My Project API
                    </Typography>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto space-y-8">{children}</div>
            </main>

            <footer className="bg-white mt-auto py-4 shadow-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Typography color="blue-gray" className="text-sm">
                        &copy; {currentYear} My Project API. Todos los derechos reservados.
                    </Typography>
                </div>
            </footer>
        </div>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;
