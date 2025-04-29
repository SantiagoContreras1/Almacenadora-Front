import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../../services/api.js";
import { getUserById } from "../../services/api.js";
import { useToast } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice.js";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  const login = async (email, password) => {
    setIsLoading(true);

    const response = await loginRequest({ email, password });

    if (response.error) {
      toast({
        title: "Login failed",
        description:
          response.error?.response?.data || "An error occurred during login.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    const token = response.data.token;
    const decoded = jwtDecode(token);
    const userId = decoded?.uid;

    const res = await getUserById(userId);
    const user = res.data.user;

    dispatch(setUser(user));
    localStorage.setItem("user", JSON.stringify({ ...user, token })); // ← ✅ AQUÍ

    setIsLoading(false);
    toast({
      title: "Login successful",
      description: "Welcome back!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    navigate("/");
  };

  return {
    login,
    isLoading,
  };
};
