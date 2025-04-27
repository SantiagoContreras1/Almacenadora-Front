import { useDispatch, useSelector } from "react-redux";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import EmployeeDashboard from "../components/dashboard/EmployeeDashBoard";
import { Box } from "@chakra-ui/react";
import { Home } from "./HomePage";
import { useEffect } from "react";
import { loadUserFromStorage } from "../features/auth/authSlice";

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(loadUserFromStorage())
  }, [dispatch])

  if (!user) {
    return <Home/>
  }

  return (
    <Box p={4}>
      {user.role === "ADMIN_ROLE" ? <AdminDashboard /> : <EmployeeDashboard />}
    </Box>
  );
};

export default DashboardPage;
