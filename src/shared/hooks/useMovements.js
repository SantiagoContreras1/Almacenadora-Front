import { useState } from "react";
import { 
  getMovements as getMovementsRequest, 
  saveInput as saveInputRequest,
  editInput as editInputRequest,
  deleteInput as deleteInputRequest,
  saveOutput as saveOutputRequest,
  editOutput as editOutputRequest,
  deleteOutput as deleteOutputRequest
} from "../../services/api";
import { useToast } from "@chakra-ui/react";

export const useMovements = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const getMovements = async (limit, offset) => {
    setIsLoading(true);
    
    try {
      const response = await getMovementsRequest(limit, offset);
      
      setIsLoading(false);
      
      if (response.error) {
        toast({
          title: "Error al obtener movimientos",
          description: response.error?.response?.data || "Ocurrió un error al obtener los movimientos",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return [];
      }
      
      return response.data;
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error al obtener movimientos",
        description: "Ocurrió un error al conectar con el servidor",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return [];
    }
  };

  const saveInput = async (data) => {
    setIsLoading(true);
    console.log(data)
    try {
      const response = await saveInputRequest(data);
      
      if (response.error) {
        toast({
          title: "Error al guardar entrada",
          description: response.error?.response?.data || "Ocurrió un error al guardar la entrada",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setIsLoading(false);
        return null;
      }
      
      toast({
        title: "Entrada guardada",
        description: "La entrada ha sido registrada correctamente",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      
      setIsLoading(false);
      return response.data;
    } catch (error) {
      toast({
        title: "Error al guardar entrada",
        description: "Ocurrió un error al conectar con el servidor",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return null;
    }
  };

  const editInput = async (id, data) => {
    setIsLoading(true)
    try {
      const response = await editInputRequest(id, data);
      
      if (response.error) {
        toast({
          title: "Error al actualizar entrada",
          description: response.error?.response?.data || "Ocurrió un error al actualizar la entrada",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setIsLoading(false);
        return null;
      }
      
      toast({
        title: "Entrada actualizada",
        description: "La entrada ha sido actualizada correctamente",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      
      setIsLoading(false);
      return response.data;
    } catch (error) {
      toast({
        title: "Error al actualizar entrada",
        description: "Ocurrió un error al conectar con el servidor",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return null;
    }
  };

  const deleteInput = async (id) => {
    setIsLoading(true);
    
    
    try {
      const response = await deleteInputRequest(id);
      
      if (response.error) {
        toast({
          title: "Error al eliminar entrada",
          description: response.error?.response?.data || "Ocurrió un error al eliminar la entrada",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setIsLoading(false);
        return false;
      }
      
      toast({
        title: "Entrada eliminada",
        description: "La entrada ha sido eliminada correctamente",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      toast({
        title: "Error al eliminar entrada",
        description: "Ocurrió un error al conectar con el servidor",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return false;
    }
  };

  const saveOutput = async (data) => {
    setIsLoading(true);

    console.log(data)
    try {
      const response = await saveOutputRequest(data);
      
      if (response.error) {
        toast({
          title: "Error al guardar salida",
          description: response.error?.response?.data || "Ocurrió un error al guardar la salida",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setIsLoading(false);
        return null;
      }
      
      toast({
        title: "Salida guardada",
        description: "La salida ha sido registrada correctamente",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      
      setIsLoading(false);
      return response.data;
    } catch (error) {
      toast({
        title: "Error al guardar salida",
        description: "Ocurrió un error al conectar con el servidor",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return null;
    }
  };

  const editOutput = async (id, data) => {
    setIsLoading(true);

    try {
      const response = await editOutputRequest(id, data);
      
      if (response.error) {
        toast({
          title: "Error al actualizar salida",
          description: response.error?.response?.data || "Ocurrió un error al actualizar la salida",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setIsLoading(false);
        return null;
      }
      
      toast({
        title: "Salida actualizada",
        description: "La salida ha sido actualizada correctamente",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      
      setIsLoading(false);
      return response.data;
    } catch (error) {
      toast({
        title: "Error al actualizar salida",
        description: "Ocurrió un error al conectar con el servidor",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return null;
    }
  };

  const deleteOutput = async (id) => {
    setIsLoading(true);
    
    try {
      const response = await deleteOutputRequest(id);
      
      if (response.error) {
        toast({
          title: "Error al eliminar salida",
          description: response.error?.response?.data || "Ocurrió un error al eliminar la salida",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setIsLoading(false);
        return false;
      }
      
      toast({
        title: "Salida eliminada",
        description: "La salida ha sido eliminada correctamente",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      toast({
        title: "Error al eliminar salida",
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
    getMovements,
    saveInput,
    saveOutput,
    editInput,
    editOutput,
    deleteInput,
    deleteOutput,
    isLoading
  };
};