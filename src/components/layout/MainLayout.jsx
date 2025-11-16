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
        <div className="main-layout">
            <header className="main-layout__header">
                <div className="main-layout__container">
                    <Typography
                        variant="h4"
                        color="blue-gray"
                        className="main-layout__title"
                    >
                        My Project API
                    </Typography>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="main-layout__content">
                <div className="main-layout__content-wrapper">{children}</div>
            </main>

            <footer className="main-layout__footer">
                <div className="main-layout__container text-center">
                    <Typography
                        color="blue-gray"
                        className="main-layout__footer-text"
                    >
                        &copy; {currentYear} My Project API. Todos los derechos
                        reservados.
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
