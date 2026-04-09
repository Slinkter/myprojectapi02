/**
 * Utilidad para inferir PropTypes desde esquemas de Zod.
 * Facilita la sincronización entre el dominio (Zod) y la UI (PropTypes).
 */
import PropTypes from 'prop-types';
import { z } from 'zod';

export const zodToPropTypes = (schema) => {
    // Implementación simplificada para los esquemas actuales del proyecto
    if (schema instanceof z.ZodObject) {
        const shape = schema.shape;
        const propTypes = {};
        for (const key in shape) {
            propTypes[key] = PropTypes.any.isRequired; // Placeholder para refinar
        }
        return propTypes;
    }
    return PropTypes.any;
};
