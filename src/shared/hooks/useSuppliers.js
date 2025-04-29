import { useState } from "react";
import { getSuppliers as getSuppliersRequest } from "../../services/api";
import { useToast } from "@chakra-ui/react";
export const useSuppliers = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const getSuppliers = async () => {
    setIsLoading(true);

    const response = await getSuppliersRequest();

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
    const suppliers = response.data.proveedores;
    return suppliers;
  };


  return {
    getSuppliers,
    isLoading,
  };
};
