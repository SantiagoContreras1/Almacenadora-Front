import { useState } from "react";
import { getProducts as getProductsRequest, saveProduct as saveProductRequest, editProduct as editProductRequest, deleteProduct as deleteProductRequest } from "../../services/api";
import { useToast } from "@chakra-ui/react";
export const useProducts = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async (name, category, entrada) => {
    setIsLoading(true);

    const response = await getProductsRequest(name, category, entrada);

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

  const updateProduct = async (id, newProduct) => {
    setIsLoading(true);

    const response = await editProductRequest(id, newProduct);

    if (response.error) {
      toast({
        title: "Update product Failed",
        description:
          response.error?.response?.data || "An error occurred during Update",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
  };

  const deleteProduct = async (id) => {
    setIsLoading(true)

    const response = await deleteProductRequest(id)
    if (response.error) {
      toast({
        title: "Delete product Failed",
        description:
          response.error?.response?.data || "An error occurred during Delete",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
  }

  return {
    deleteProduct,
    getProducts,
    updateProduct,
    saveProduct,
    isLoading,
  };
};
