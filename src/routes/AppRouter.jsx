import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spinner, Center } from "@chakra-ui/react";
import { ProtectedRoute } from "../pages/ProtectedRoute";
import ProfilePage from "../pages/ProfilePage"
import NotificationsPage from "../pages/NotificationsPage";

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
  const CategoriesPage = lazy(()=> import('../pages/CategoriesPage'))
  const UnauthorizedPage = lazy(()=> import('../pages/UnauthorizedPage'))
  return (
    <Suspense fallback={<Center h="100vh"><Spinner size="xl" color="blue.500" /></Center>}>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage/>}/>
        <Route path="/notifications" element={<NotificationsPage/>}/>
        
        <Route path="/" element={<ProtectedRoute element={DashBoardPage} roles={["ADMIN_ROLE", "USER_ROLE"]} />} />
        <Route path="/products" element={<ProtectedRoute element={ProductsPage} roles={["ADMIN_ROLE", "USER_ROLE"]} />} />
        <Route path="/suppliers" element={<ProtectedRoute element={SuppliersPage} roles={["ADMIN_ROLE", "USER_ROLE"]} />} />
        <Route path="/clients" element={<ProtectedRoute element={ClientsPage} roles={["ADMIN_ROLE", "USER_ROLE"]} />} />
        <Route path="/movements" element={<ProtectedRoute element={MovementsPage} roles={["ADMIN_ROLE", "USER_ROLE"]} />} />
        <Route path="/reports" element={<ProtectedRoute element={ReportsPage} roles={["ADMIN_ROLE"]} />} />
        <Route path="/users" element={<ProtectedRoute element={UsersPage} roles={["ADMIN_ROLE"]} />} />
        <Route path="/categories" element={<ProtectedRoute element={CategoriesPage} roles={["ADMIN_ROLE", "USER_ROLE"]} />} />
        <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
      </Routes>
    </Suspense>
  );
};
