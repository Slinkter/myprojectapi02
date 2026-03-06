/**
 * @fileoverview Componente de Layout principal para la aplicación.
 * Proporciona el contenedor estructural base, gestiona el fondo y la
 * adaptabilidad visual a los temas claro y oscuro.
 * 
 * @module MainLayout
 */

import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

/**
 * Componente que define la estructura general de la página.
 * Actúa como un contenedor minimalista y centrado, asegurando
 * consistencia visual en todas las vistas.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Elementos hijos a renderizar dentro del layout.
 * @returns {JSX.Element} El contenedor principal estilizado.
 * 
 * @example
 * ```tsx
 * <MainLayout>
 *   <Home />
 * </MainLayout>
 * ```
 */
function MainLayout({ children }) {
    return (
        <div className={cn("min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300")}>
            <main className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8")}>
                {children}
            </main>
        </div>
    );
}

MainLayout.propTypes = {
    /** Elementos hijos para inyectar en el contenido principal. */
    children: PropTypes.node.isRequired,
};

export default MainLayout;
