import { useState, useEffect, useRef } from "react";
import {
  Box,
  SimpleGrid,
  Input,
  Select,
  HStack,
  Heading,
  Spacer,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Card,
  CardBody,
  CardHeader,
  Flex,
  InputGroup,
  InputRightElement,
  IconButton,
  Badge,
  Icon,
  Text,
  Button, useColorModeValue,
} from "@chakra-ui/react";
import { FaUser, FaSearch, FaPlus } from "react-icons/fa";
import { SideBar } from "../components/dashboard/SideBar";
import { TopBar } from "../components/dashboard/TopBar";
import UserCard from "../components/user/UserCard";
import UserForm from "../components/user/UserForm";
import { useUsers } from "../shared/hooks/useUsers";
import { GenericAlert } from "../components/GenericAlert";
import Pagination from "../components/Pagination";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const { getUsers, updateUser, deleteUser } = useUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / limit);
  const cancelRef = useRef();

  // Color values
  const bg = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const titleColor = useColorModeValue("teal.600", "teal.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose,
  } = useDisclosure();

  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

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
    <Box minH="100vh" bg={bg}>
      <SideBar />
      <Box ml={{ base: 0, md: 60 }} transition="0.3s ease">
        <TopBar />
        <Box p={{ base: 4, md: 8 }}>
          <Flex justify="space-between" align="center" mb={8} flexWrap="wrap" gap={4}>
            <HStack spacing={4}>
              <Icon as={FaUser} boxSize={8} color={titleColor} />
              <Heading size="xl" color={titleColor}>
                Usuarios
              </Heading>
              <Badge
                colorScheme="teal"
                fontSize="lg"
                px={3}
                py={1}
                borderRadius="full"
              >
                {users.length} registros
              </Badge>
            </HStack>
          </Flex>
          
          <Card mb={8} border="1px" borderColor={borderColor}>
            <CardBody>
              <Flex direction={{ base: "column", md: "row" }} gap={4} align="center">
                <InputGroup flex="1" maxW={{ base: "100%", md: "300px" }}>
                  <Input
                    placeholder="Buscar por nombre o ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    borderRadius="lg"
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label="Buscar"
                      icon={<FaSearch />}
                      variant="ghost"
                      colorScheme="teal"
                    />
                  </InputRightElement>
                </InputGroup>
                
                <Select
                  placeholder="Filtrar por rol"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  maxW={{ base: "100%", md: "200px" }}
                >
                  <option value="ADMIN_ROLE">Administrador</option>
                  <option value="USER_ROLE">Empleado</option>
                </Select>
                
                {(search || roleFilter) && (
                  <Button
                    onClick={() => {
                      setSearch("");
                      setRoleFilter("");
                    }}
                    colorScheme="gray"
                    variant="outline"
                    borderRadius="lg"
                    size="md"
                  >
                    Limpiar filtros
                  </Button>
                )}
              </Flex>
            </CardBody>
          </Card>

          <Card bg={cardBg} boxShadow="md" borderRadius="xl" overflow="hidden" mb={8}>
            <CardHeader borderBottom="1px" borderColor={borderColor}>
              <Flex justify="space-between" align="center">
                <Heading size="md">Listado de Usuarios</Heading>
                <Text color="gray.500">
                  {filteredUsers.length} resultados
                </Text>
              </Flex>
            </CardHeader>
            <CardBody>
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing={6}>
                {filteredUsers.map((user) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </SimpleGrid>
            </CardBody>
          </Card>
          
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            itemsPerPage={limit}
            onItemsPerPageChange={handleItemsPerPageChange}
            showItemCount={true}
          />
        </Box>
      </Box>

      <GenericAlert
        isOpen={isDeleteAlertOpen}
        onClose={onDeleteAlertClose}
        cancelRef={cancelRef}
        onConfirm={handleConfirmDelete}
        title="Eliminar Usuario"
        description={
          <>
            ¿Está seguro que desea eliminar al usuario{" "}
            <strong>{selectedUser?.name}</strong>? Esta acción no se puede
            deshacer.
          </>
        }
        confirmButtonText="Eliminar"
        confirmButtonColor="red"
      />

      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={onDrawerClose}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{selectedUser ? "Editar Usuario" : "Nuevo Usuario"}</DrawerHeader>
          <DrawerBody>
            <UserForm user={selectedUser} onSave={handleSaveUser} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default UsersPage;