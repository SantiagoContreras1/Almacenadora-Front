import { useDispatch, useSelector } from "react-redux";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import EmployeeDashboard from "../components/dashboard/EmployeeDashboard";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { loadUserFromStorage } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";


const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(loadUserFromStorage())
  }, [dispatch])

  if (!user) {
    navigate("/auth")
  }

  return (
    <Box>
      {user.role === "ADMIN_ROLE" ? <AdminDashboard /> : <EmployeeDashboard />}
    </Box>
  );
};

export default DashboardPage;
