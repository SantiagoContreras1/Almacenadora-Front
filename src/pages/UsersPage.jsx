import { SideBar } from "../components/dashboard/SideBar";
import { TopBar } from "../components/dashboard/TopBar";
import UserCard from "../components/user/UserCard";
import UserForm from "../components/user/UserForm";
import {
  Box,
  SimpleGrid,
  Input,
  Select,
  HStack,
  Heading,
  Spacer,
  useDisclosure,
  useToast,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton
} from "@chakra-ui/react";
import { useUsers } from "../shared/hooks/useUsers";
import { useState, useEffect, useRef } from "react";
import { GenericAlert } from "../components/GenericAlert";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const { getUsers, updateUser, deleteUser } = useUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const toast = useToast();
  const cancelRef = useRef();

  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose
  } = useDisclosure();

  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose
  } = useDisclosure();

  const fetchData = async () => {
    const usersFromApi = await getUsers();
    if (usersFromApi) {
      setUsers(usersFromApi);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    onDrawerOpen();
  };

  const handleSaveUser = async (updatedUser) => {
    await updateUser(selectedUser._id, updatedUser);
    toast({
      title: "Usuario actualizado",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-right"
    });
    onDrawerClose();
    fetchData();
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    onDeleteAlertOpen();
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      await deleteUser(selectedUser._id);
      fetchData();
      toast({
        title: "Usuario eliminado",
        description: `${selectedUser.name} fue eliminado correctamente.`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right"
      });
      onDeleteAlertClose();
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user._id.includes(search);
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });

  return (
    <>
      <SideBar />
      <TopBar />
      <Box ml="250px" p="5">
        <Heading size="lg" mb={4}>
          Gestión de Usuarios
        </Heading>

        <HStack mb={6} spacing={4}>
          <Input
            placeholder="Buscar por nombre o ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            maxW="300px"
          />
          <Select
            placeholder="Filtrar por rol"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            maxW="200px"
          >
            <option value="ADMIN_ROLE">Administrador</option>
            <option value="USER_ROLE">Empleado</option>
          </Select>
          <Spacer />
        </HStack>

        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
          {filteredUsers.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </SimpleGrid>
      </Box>

      <GenericAlert
        isOpen={isDeleteAlertOpen}
        onClose={onDeleteAlertClose}
        cancelRef={cancelRef}
        onConfirm={handleConfirmDelete}
        title="Eliminar Usuario"
        description={
          <>
            ¿Está seguro que desea eliminar al usuario <strong>{selectedUser?.name}</strong>? Esta acción no se puede deshacer.
          </>
        }
        confirmButtonText="Eliminar"
        confirmButtonColor="red"
      />

      <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Editar Usuario</DrawerHeader>
          <DrawerBody>
            <UserForm user={selectedUser} onSave={handleSaveUser} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UsersPage;
