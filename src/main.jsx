/**
 * @fileoverview Punto de entrada principal (Entry Point) de la aplicación React.
 * Configura el renderizado inicial, inyecta el store global de Redux y activa
 * el modo estricto de React para el desarrollo.
 *
 * @module main
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Se importa el store de Redux.
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);
