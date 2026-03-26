/**
 * @fileoverview Componente raíz de la aplicación UserApp Pro.
 * Coordina la estructura de alto nivel envolviendo la lógica principal en
 * límites de error (ErrorBoundary) y layouts estructurales.
 *
 * @module App
 */

import ErrorBoundary from "@/components/ui/ErrorBoundary";
import MainLayout from "@/components/layout/MainLayout";
import { UserSearchPage } from "@/features/user-search";

/**
 * Componente principal de la aplicación.
 * Sigue las mejores prácticas de React al desacoplar la orquestación global
 * de la implementación de páginas específicas.
 *
 * @component
 * @returns {JSX.Element} El árbol de componentes renderizado.
 */
function App() {
    return (
        <ErrorBoundary>
            <MainLayout>
                <UserSearchPage />
            </MainLayout>
        </ErrorBoundary>
    );
}

export default App;
