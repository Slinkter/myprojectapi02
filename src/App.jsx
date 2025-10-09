/**
 * @file Componente raíz de la aplicación.
 * @author Tu Nombre
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import MainLayout from "./components/layout/MainLayout";

/**
 * Componente principal que renderiza la aplicación y gestiona las rutas.
 * @returns {JSX.Element}
 */
function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profile/:userId" element={<ProfilePage />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;
