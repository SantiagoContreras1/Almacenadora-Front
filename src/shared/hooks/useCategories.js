import { useState } from "react";
import { getCategories as getCategoriesRequest } from "../../services/api";
import { useToast } from "@chakra-ui/react";
export const useCategories = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const getCategories = async () => {
    setIsLoading(true);

    const response = await getCategoriesRequest();

    if (response.error) {
      toast({
        title: "Get products Failed",
        description:
          response.error?.response?.data || "An error occurred during login.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    const categories = response.data.categories;
    return categories;
  };


  return {
    getCategories,
    isLoading,
  };
};
