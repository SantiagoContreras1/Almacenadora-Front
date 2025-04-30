import { useState } from "react";
import { register as registerRequest } from "../../services/api.js";
import { useToast } from "@chakra-ui/react";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const registerUser = async (name, email, password) => {
    setIsLoading(true);

    const response = await registerRequest({ name, email, password });
    setIsLoading(false);

    if (response.error) {
      toast({
        title: "Registration failed",
        description:
          response.error?.response?.data ||
          "An error occurred during registration.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Registration successful",
      description: "You have registered successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return {
    registerUser,
    isLoading,
  };
};
