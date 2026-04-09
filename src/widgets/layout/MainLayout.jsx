import { memo } from "react";
import PropTypes from "prop-types";
import ThemeToggleButton from "@/shared/ui/ThemeToggleButton";
import { PageContainer } from "@/shared/ui/PageContainer";

/**
 * Layout principal que define la estructura de la aplicación.
 * @component
 */
function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Encabezado */}
            <header className="sticky top-0 z-50 w-full glass dark:bg-slate-900/80 dark:border-slate-800">
                <PageContainer className="h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                            UserApp<span className="text-blue-600 dark:text-blue-400">Pro</span>
                        </span>
                    </div>

                    <nav className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-6 mr-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                            <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Inicio</a>
                            <a href="/users" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Usuarios</a>
                        </div>
                        <ThemeToggleButton />
                    </nav>
                </PageContainer>
            </header>

            {/* Contenido */}
            <main className="grow w-full py-golden-base">
                <PageContainer>
                    {children}
                </PageContainer>
            </main>

            {/* Pie */}
            <footer className="w-full py-golden-md border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <PageContainer className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <p>© {new Date().getFullYear()} UserApp Pro. Todos los derechos reservados.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Documentación</a>
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacidad</a>
                    </div>
                </PageContainer>
            </footer>
        </div>
    );
}

MainLayout.displayName = "MainLayout";
MainLayout.propTypes = { children: PropTypes.node.isRequired };

export default memo(MainLayout);
