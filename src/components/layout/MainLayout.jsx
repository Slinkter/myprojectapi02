/**
 * @file Componente de layout principal para la aplicación.
 * @author Tu Nombre
 */

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Proporciona una estructura de página consistente con un encabezado, contenido principal y pie de página.
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Los componentes hijos que se renderizarán dentro del layout.
 * @returns {JSX.Element}
 */
function MainLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Encabezado */}
            <header className="bg-white shadow-lg">
                <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/api02.png" alt="Logo" className="h-8 w-auto" />
                            <h1 className="text-2xl font-bold text-gray-800">
                                Visor de Perfiles
                            </h1>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto space-y-8">{children}</div>
            </main>

            {/* Pie de Página */}
            <footer className="bg-white shadow-t mt-auto">
                <div className="container mx-auto px-4 py-4 text-center text-gray-600">
                    <p>&copy; 2025 - Un proyecto de Gemini. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;