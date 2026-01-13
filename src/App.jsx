import MainLayout from "@/components/layout/MainLayout";
import { UserSearchPage } from "@/features/user-search";

/**
 * @fileoverview Componente raíz de la aplicación.
 * Define la estructura principal y renderiza las páginas/features.
 *
 * @module App
 * @category Application Root
 * @since 1.0.0
 */

/**
 * Componente raíz de la aplicación.
 *
 * Este componente define la estructura principal de la aplicación,
 * envolviendo el contenido en el layout principal (MainLayout) y
 * renderizando la página de búsqueda de usuarios.
 *
 * En el futuro, este componente podría incluir:
 * - React Router para múltiples páginas
 * - Error Boundaries para manejo de errores
 * - Componentes de navegación
 *
 * @component
 * @category Root
 *
 * @returns {JSX.Element} Estructura principal de la aplicación.
 *
 * @example
 * // Uso en main.jsx
 * import App from './App';
 *
 * root.render(
 *   <Provider store={store}>
 *     <App />
 *   </Provider>
 * );
 *
 * @see {@link MainLayout} - Layout principal con header y footer.
 * @see {@link UserSearchPage} - Página de búsqueda de usuarios.
 *
 * @since 1.0.0
 * @version 1.0.0
 */
function App() {
  return (
    <MainLayout>
      <UserSearchPage />
    </MainLayout>
  );
}

export default App;
