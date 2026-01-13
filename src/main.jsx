import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-tailwind/react";
import { store } from "./redux/store.js";
import App from "./App.jsx";
import "./index.css";

/**
 * @fileoverview Punto de entrada principal de la aplicación React.
 * Configura los providers globales y monta la aplicación en el DOM.
 *
 * @module main
 * @category Application Entry
 * @since 1.0.0
 */

/**
 * Renderiza la aplicación React en el elemento raíz del DOM.
 *
 * Configura los siguientes providers globales:
 * - Redux Provider: Proporciona acceso al store de Redux en toda la aplicación.
 * - ThemeProvider: Proporciona el contexto de Material Tailwind para componentes UI.
 *
 * La aplicación se monta en modo StrictMode para detectar problemas potenciales
 * durante el desarrollo.
 *
 * @function
 * @name renderApp
 *
 * @example
 * // Estructura de providers
 * <React.StrictMode>
 *   <Provider store={store}>
 *     <ThemeProvider>
 *       <App />
 *     </ThemeProvider>
 *   </Provider>
 * </React.StrictMode>
 *
 * @see {@link store} - Store global de Redux.
 * @see {@link App} - Componente raíz de la aplicación.
 *
 * @since 1.0.0
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
