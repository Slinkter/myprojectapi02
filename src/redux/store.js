import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user-search/redux/userSlice";

/**
 * @fileoverview Configuración del store global de Redux.
 * Define el store principal de la aplicación con todos los reducers.
 *
 * @module redux-store
 * @category State Management
 * @since 1.0.0
 */

/**
 * Store global de Redux configurado con Redux Toolkit.
 *
 * Este store centraliza todo el estado global de la aplicación.
 * Actualmente incluye el reducer de usuarios, pero puede extenderse
 * fácilmente agregando más reducers según se agreguen features.
 *
 * Redux Toolkit configura automáticamente:
 * - Redux DevTools Extension
 * - Middleware thunk para acciones asíncronas
 * - Serialización de estado
 * - Inmutabilidad con Immer
 *
 * @constant {Object}
 * @property {Object} user - Estado del feature user-search.
 * @property {('idle'|'loading'|'succeeded'|'failed'|'notFound')} user.status - Estado de la búsqueda.
 * @property {Object|null} user.user - Datos del usuario actual.
 * @property {Array<Object>} user.posts - Publicaciones del usuario.
 * @property {string|null} user.error - Mensaje de error si existe.
 *
 * @example
 * // Uso en main.jsx
 * import { Provider } from 'react-redux';
 * import { store } from './redux/store';
 *
 * root.render(
 *   <Provider store={store}>
 *     <App />
 *   </Provider>
 * );
 *
 * @example
 * // Acceder al estado en un componente
 * import { useSelector } from 'react-redux';
 *
 * function MyComponent() {
 *   const user = useSelector(state => state.user.user);
 *   const status = useSelector(state => state.user.status);
 *
 *   return <div>{user?.name}</div>;
 * }
 *
 * @example
 * // Despachar acciones
 * import { useDispatch } from 'react-redux';
 * import { fetchUserAndPosts } from '@/features/user-search/redux/userSlice';
 *
 * function SearchButton() {
 *   const dispatch = useDispatch();
 *
 *   const handleClick = () => {
 *     dispatch(fetchUserAndPosts(1));
 *   };
 *
 *   return <button onClick={handleClick}>Buscar</button>;
 * }
 *
 * @see {@link https://redux-toolkit.js.org/api/configureStore} - Documentación de configureStore.
 * @see {@link module:user-search/redux/userSlice} - Reducer de usuarios.
 *
 * @since 1.0.0
 * @version 1.0.0
 */
export const store = configureStore({
  reducer: {
    user: userReducer,
    // Aquí se pueden agregar más reducers según se agreguen features:
    // auth: authReducer,
    // posts: postsReducer,
    // etc.
  },
});
