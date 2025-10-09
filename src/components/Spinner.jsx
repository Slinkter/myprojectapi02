/**
 * @file Componente de indicador de carga (spinner).
 * @author Tu Nombre
 */

import { Spinner as MaterialSpinner } from "@material-tailwind/react";

/**
 * Muestra un spinner centrado en la pantalla.
 * @returns {JSX.Element}
 */
export default function Spinner() {
    return <MaterialSpinner className="h-12 w-12 mx-auto" />;
}
