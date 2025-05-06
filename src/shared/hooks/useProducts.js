import { useState } from "react";
import {
  getProducts as getProductsRequest,
  totalStock as totalStockRequest,
  saveProduct as saveProductRequest,
  editProduct as editProductRequest,
  deleteProduct as deleteProductRequest,
} from "../../services/api";
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
    setIsLoading(false);	
    
    const products = response.data.products;
    return products;
  };

  const saveProduct = async (newProduct) => {
    setIsLoading(true);

    const response = await saveProductRequest(newProduct);

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

    toast({
      title: "Producto guardado",
      description: `El producto ha sido guardado con éxito.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
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
    toast({
      title: "Producto actualizado",
      description: `El producto ha sido actualizado con éxito.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  };

  const deleteProduct = async (id) => {
    setIsLoading(true);

    const response = await deleteProductRequest(id);
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
    toast({
      title: "Producto eliminado",
      description: `El producto ha sido eliminado correctamente.`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  const totalStock = async () => {
    setIsLoading(true);

    const response = await totalStockRequest();

    if (response.error) {
      toast({
        title: "get stock Failed",
        description:
          response.error?.response?.data || "An error occurred during getting",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    return {
      totalValue: response.data.totalValue,
    };
  };

  return {
    deleteProduct,
    getProducts,
    updateProduct,
    saveProduct,
    totalStock,
    isLoading,
  };
};
