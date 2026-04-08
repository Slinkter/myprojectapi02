import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/entities/user/store/userSlice";
import uiReducer from "@/app/store/uiSlice";

/**
 * Instancia del Store de Redux configurada con Redux Toolkit.
 * Incluye por defecto el middleware para thunks asíncronos.
 *
 * @type {Object}
 * @property {Object} user - Estado del dominio de usuarios.
 * @property {Object} ui - Estado transversal de la interfaz de usuario.
 */
export const store = configureStore({
    reducer: {
        user: userReducer,
        ui: uiReducer,
    },
});
