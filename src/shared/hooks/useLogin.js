import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../../services/api.js";
import { useToast } from "@chakra-ui/react";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const login = async (email, password) => {
    setIsLoading(true);

    const response = await loginRequest({ email, password });

    setIsLoading(false);

    if (response.error) {
      toast({
        title: "Login failed",
        description: response.error?.response?.data || "An error occurred during login.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const { userDetails } = response.data;
    localStorage.setItem("user", JSON.stringify(userDetails));

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
