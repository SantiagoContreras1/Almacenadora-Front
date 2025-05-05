import { useState } from "react";
import { getCategories as getCategoriesRequest, saveCategory as saveCategoryRequest, editCategory as editCategoryRequest, deleteCategory as deleteCategoryRequest} from "../../services/api";
import { useToast } from "@chakra-ui/react";
export const useCategories = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const getCategories = async () => {
    setIsLoading(true);

    const response = await getCategoriesRequest();

    if (response.error) {
      toast({
        title: "Get categories Failed",
        description:
          response.error?.response?.data || "An error occurred during categorie",
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

  const saveCategory = async (data) => {
    setIsLoading(true);
    try {
      const response = await saveCategoryRequest(data);
      
      if (response.error) {
        toast({
          title: "Error al guardar Categoria",
          description: response.error?.response?.data || "Ocurrió un error al guardar la Categoria",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setIsLoading(false);
        return null;
      }
      
      toast({
        title: "Categoria guardada",
        description: "La Categoria ha sido registrada correctamente",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      
      setIsLoading(false);
      return response.data;
    } catch (error) {
      toast({
        title: "Error al guardar Categoria",
        description: "Ocurrió un error al conectar con el servidor",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return null;
    }
  };

  const editCategory = async (id, data) => {
    setIsLoading(true)
    try {
      const response = await editCategoryRequest(id, data);
      
      if (response.error) {
        toast({
          title: "Error al actualizar Categoria",
          description: response.error?.response?.data || "Ocurrió un error al actualizar la Categoria",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setIsLoading(false);
        return null;
      }
      
      toast({
        title: "Categoria actualizada",
        description: "La Categoria ha sido actualizada correctamente",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      
      setIsLoading(false);
      return response.data;
    } catch (error) {
      toast({
        title: "Error al actualizar Categoria",
        description: "Ocurrió un error al conectar con el servidor",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return null;
    }
  };

  const deleteCategory = async (id) => {
    setIsLoading(true);
    
    
    try {
      const response = await deleteCategoryRequest(id);
      
      if (response.error) {
        toast({
          title: "Error al eliminar Categoria",
          description: response.error?.response?.data || "Ocurrió un error al eliminar la Categoria",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setIsLoading(false);
        return false;
      }
      
      toast({
        title: "Categoria eliminada",
        description: "La Categoria ha sido eliminada correctamente",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      toast({
        title: "Error al eliminar Categoria",
        description: "Ocurrió un error al conectar con el servidor",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return false;
    }
  };
  return {
    getCategories,
    saveCategory,
    editCategory,
    deleteCategory,
    isLoading,
  };
};
