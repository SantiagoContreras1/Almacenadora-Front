import { useState } from "react";
import { getUsers as getUsersRequest, editUser as editUserRequest, deleteUser as deleteUserRequest } from "../../services/api";
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
  };

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
  }

  return {
    deleteUser,
    getUsers,
    updateUser,
    isLoading,
  };
};
