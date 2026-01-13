import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";

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
      {/* navbar */}
      <header className="main-layout__header">
        <div className="main-layout__container flex justify-center items-center">
          <ThemeToggleButton />
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="main-layout__content">
        <div className="main-layout__content-wrapper">{children}</div>
      </main>
      {/* Footer */}
      <footer className="main-layout__footer">
        <div className="main-layout__container text-center">
          <Typography color="blue-gray" className="main-layout__footer-text">
            &copy; {currentYear} Todos los derechos reservados.
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
