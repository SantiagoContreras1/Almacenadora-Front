import { useState } from "react";
import { getSuppliers as getSuppliersRequest, saveSupplier as saveSupplierRequest, editSupplier as editSupplierRequest, deleteSupplier as deleteSupplierRequest} from "../../services/api";
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

  const saveSupplier = async (data) => {
    setIsLoading(true)
    
    const response = await saveSupplierRequest(data)

    if (response.error) {
      toast({
        title: "Save Supplier Failed",
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
      title: "Proveedor guardado",
      description: `El proveedor ha sido guardado con éxito.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
    setIsLoading(false)
  }

  const updateSupplier = async (id, data) => {
    setIsLoading(true);

    const response = await editSupplierRequest(id, data);

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
      title: "Proveedor actualizado",
      description: `El proveedor ha sido actualizado con éxito.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
    setIsLoading(false)
  };

  const deleteSupplier = async (id) => {
    setIsLoading(true)

    const response = await deleteSupplierRequest(id)
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
      title: "Proveedor eliminado",
      description: `El proveedor ha sido eliminado con éxito.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
    setIsLoading(false)
  }


  return {
    getSuppliers,
    saveSupplier,
    deleteSupplier,
    updateSupplier,
    isLoading,
  };
};
