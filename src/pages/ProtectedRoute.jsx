import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ element: Component, roles = [] }) => {
    const navigate = useNavigate()
  const { user} = useSelector((state) => state.auth);

  if (roles.length > 0 && !roles.includes(user.role)) {
    return navigate("/Unauthorized")
  }

  return <Component/>;
};