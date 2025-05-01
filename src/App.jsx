import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUserFromStorage } from "./features/auth/authSlice";
import { AppRouter } from "./routes/AppRouter";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(loadUserFromStorage());
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth"); 
    }
  }, [user, navigate, isLoading]);
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return <AppRouter />;
}

export default App;