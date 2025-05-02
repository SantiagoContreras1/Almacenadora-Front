import { useState } from "react";
import { getClients as getClientsRequest, saveClient as saveClientRequest, editClient as editClientRequest, deleteClient as deleteClientRequest} from "../../services/api";
import { useToast } from "@chakra-ui/react";
export const useClients = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const getClients = async () => {
    setIsLoading(true);

    const response = await getClientsRequest();

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
    const clients = response.data.clients;
    return clients;
  };

  const saveClient = async (data) => {
    setIsLoading(true)
    
    const response = await saveClientRequest(data)

    if (response.error) {
      toast({
        title: "Save Client Failed",
        description:
          response.error?.response?.data || "An error occurred during Save",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
  }

  const updateClient = async (id, data) => {
    setIsLoading(true);

    const response = await editClientRequest(id, data);

    if (response.error) {
      toast({
        title: "Update Client Failed",
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

  const deleteClient = async (id) => {
    setIsLoading(true)

    const response = await deleteClientRequest(id)
    if (response.error) {
      toast({
        title: "Delete Client Failed",
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
    getClients,
    saveClient,
    deleteClient,
    updateClient,
    isLoading,
  };
};
