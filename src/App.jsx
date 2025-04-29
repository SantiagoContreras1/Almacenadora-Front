import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromStorage } from "./features/auth/authSlice";
import { AppRouter } from "./routes/AppRouter";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  
  if (!user) {
    return <div>Cargando...</div>;  
  }

  return <AppRouter />; 
}

export default App;
