import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spinner, Center } from "@chakra-ui/react";

export const AppRouter = () => {
  const DashBoardPage = lazy(() => import("../pages/DashBoardPage"));
  const ProductsPage = lazy(() => import("../pages/ProductsPage"));
  const SuppliersPage = lazy(() => import("../pages/SuppliersPage"));
  const ClientsPage = lazy(() => import("../pages/ClientsPage"));
  const MovementsPage = lazy(() => import("../pages/MovementsPage"));
  const UsersPage = lazy(() => import("../pages/UsersPage"));
  const ReportsPage = lazy(() => import("../pages/ReportsPage"));
  const AuthPage = lazy(() => import("../pages/AuthPage"));
  const HomePage = lazy(()=> import("../pages/HomePage"))
  return (
    <Suspense
      fallback={
        <Center h="100vh">
          <Spinner size="xl" color="blue.500" />
        </Center>
      }
    >
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/movements" element={<MovementsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/" element={<DashBoardPage />} />
        <Route path="/home" element={<HomePage/>}/>
      </Routes>
    </Suspense>
  );
};
