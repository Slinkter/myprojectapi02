import MainLayout from "@/components/layout/MainLayout";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { UserSearchPage } from "@/features/user-search";

/**
 * @fileoverview Componente raíz de la aplicación.
 * Sigue React Best Practices: Envoltorio con ErrorBoundary y Layout limpio.
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
