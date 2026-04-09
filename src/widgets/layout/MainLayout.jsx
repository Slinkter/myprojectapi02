import { memo } from "react";
import PropTypes from "prop-types";
import { cn } from "@/shared/lib/utils";
import ThemeToggleButton from "@/shared/ui/ThemeToggleButton";

/**
 * Componente que define la estructura general de la página.
 * Implementa un envoltorio moderno y responsivo con un encabezado
 * basado en glassmorphism y un pie de página profesional.
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
        <div
            className={cn(
                "min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300",
            )}
        >
            {/* Encabezado con efecto Glassmorphism */}
            <header
                className={cn(
                    "sticky top-0 z-50 w-full transition-all duration-300",
                    "glass dark:bg-slate-900/80 dark:border-slate-800",
                )}
            >
                <div
                    className={cn(
                        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between",
                    )}
                >
                    <div
                        className={cn("flex items-center gap-2")}>
                        <span
                            className={cn(
                                "text-xl font-bold tracking-tight text-slate-900 dark:text-white",
                            )}
                        >
                            UserApp<span className="text-blue-600 dark:text-blue-400">Pro</span>
                        </span>
                    </div>

                    <nav
                        className={cn("flex items-center gap-4")}>
                        <div
                            className={cn(
                                "hidden md:flex items-center gap-6 mr-4 text-sm font-medium text-slate-600 dark:text-slate-400",
                            )}
                        >
                            <a
                                href="/"
                                className={cn(
                                    "hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
                                )}
                            >
                                Inicio
                            </a>
                            <a
                                href="/users"
                                className={cn(
                                    "hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
                                )}
                            >
                                Usuarios
                            </a>
                        </div>
                        <ThemeToggleButton />
                    </nav>
                </div>
            </header>

            {/* Área de Contenido Principal */}
            <main className={cn("flex-grow w-full")}>
                <div
                    className={cn(
                        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-golden-base",
                    )}
                >
                    {children}
                </div>
            </main>

            {/* Pie de Página */}
            <footer
                className={cn(
                    "w-full py-golden-md border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm",
                )}
            >
                <div
                    className={cn(
                        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400",
                    )}
                >
                    <p>© {new Date().getFullYear()} UserApp Pro. Todos los derechos reservados.</p>
                    <div
                        className={cn("flex items-center gap-6")}>
                        <a
                            href="#"
                            className={cn(
                                "hover:text-slate-900 dark:hover:text-white transition-colors",
                            )}
                        >
                            Documentación
                        </a>
                        <a
                            href="#"
                            className={cn(
                                "hover:text-slate-900 dark:hover:text-white transition-colors",
                            )}
                        >
                            Privacidad
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

MainLayout.displayName = "MainLayout";

MainLayout.propTypes = {
    /** Elementos hijos para inyectar en el contenido principal. */
    children: PropTypes.node.isRequired,
};

export default memo(MainLayout);
