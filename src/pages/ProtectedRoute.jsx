import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ element: Component, roles = [] }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || !user.role) {
      navigate("/auth");
    } else if (roles.length > 0 && !roles.includes(user.role)) {
      navigate("/Unauthorized");
    }
  }, [user, roles, navigate]);

  return <Component />;
};