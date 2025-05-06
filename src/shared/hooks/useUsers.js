import { useState } from "react";
import { getUsers as getUsersRequest, editUser as editUserRequest, deleteUser as deleteUserRequest, changePassword as changePasswordRequest } from "../../services/api";
import { useToast } from "@chakra-ui/react";
export const useUsers = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);

    const response = await getUsersRequest();

    if (response.error) {
      toast({
        title: "Get Users Failed",
        description:
          response.error?.response?.data || "An error occurred during login.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    const users = response.data.users;
    return users;
  };

  const updateUser = async (id, newUser) => {
    setIsLoading(true);

    const response = await editUserRequest(id, newUser);
    
    if (response.error) {
      toast({
        title: "Update User Failed",
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
      title: "User actualizado",
      description: `El usuario ha sido actualizado con éxito.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
    setIsLoading(false)
  };

  const changePassword = async (id, data) => {
    const response = await changePasswordRequest(id, data);
    
    if (response.error) {
      toast({
        title: "Update User Failed",
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
      title: "Contraseña actualizada",
      description: `La contraseña ha sido actualizada con éxito.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
    setIsLoading(false)
  }

  const deleteUser = async (id) => {
    setIsLoading(true)
    console.log(id)
    const response = await deleteUserRequest(id)
    console.log(response)
    if (response.error) {
      toast({
        title: "Delete User Failed",
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
      title: "User eliminado",
      description: `El usuario ha sido eliminado con éxito.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
    setIsLoading(false)
  }

  return {
    deleteUser,
    changePassword,
    getUsers,
    updateUser,
    isLoading,
  };
};
