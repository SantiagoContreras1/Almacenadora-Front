import { useState } from "react";
import { getProducts as getProductsRequest, saveProduct as saveProductRequest } from "../../services/api";
import { useToast } from "@chakra-ui/react";
export const useProducts = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    setIsLoading(true);

    const response = await getProductsRequest();

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
    const products = response.data.products;
    return products;
  };

  const saveProduct = async (id, newProduct) => {
    setIsLoading(true);

    const response = await saveProductRequest(id, newProduct);

    if (response.error) {
      toast({
        title: "Save product Failed",
        description:
          response.error?.response?.data || "An error occurred during Save",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
  };

  return {
    getProducts,
    saveProduct,
    isLoading,
  };
};
