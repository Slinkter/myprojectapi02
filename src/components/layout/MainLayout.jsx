import PropTypes from "prop-types";

/**
 * Layout principal minimalista (sin Navbar ni Footer).
 * Proporciona el contenedor base para la aplicación.
 */
function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;
