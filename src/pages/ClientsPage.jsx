import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  useColorModeValue,
  VStack,
  Text,
  Divider,
  Icon,
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  HStack,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Avatar,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { SideBar } from "../components/dashboard/SideBar";
import { TopBar } from "../components/dashboard/TopBar";
import { FaUser, FaSearch, FaPlus } from "react-icons/fa";
import ClientForm from "../components/clients/ClientForm";
import ClientList from "../components/clients/ClientList.jsx";
import { useClients } from "../shared/hooks/useClients.js";
import Pagination from "../components/Pagination.jsx";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedClient, setSelectedClient] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const totalItems = clients.length;
  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  const bg = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const titleColor = useColorModeValue("teal.600", "teal.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const { getClients, saveClient, updateClient, deleteClient } = useClients();

  const fetchData = async () => {
    const clientsFromApi = await getClients();
    if (clientsFromApi) {
      console.log(clientsFromApi);
      setClients(clientsFromApi);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (data) => {
    if (selectedClient) {
      await updateClient(selectedClient.uid, data);
    } else {
      await saveClient(data);
    }
    fetchData();
    onClose();
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    onOpen();
  };

  const handleDelete = async (id) => {
    await deleteClient(id);
    fetchData();
  };

  const handleOpenCreate = () => {
    setSelectedClient(null);
    onOpen();
  };

  const filteredClients = clients.filter(
    (client) =>
      client.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      client.email?.toLowerCase().includes(search.toLowerCase()) ||
      client.telefono?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box minH="100vh" bg={bg}>
      <SideBar />
      <Box ml={{ base: 0, md: 60 }} transition="0.3s ease">
        <TopBar />
        <Box p={{ base: 4, md: 8 }}>
          <Flex justify="space-between" align="center" mb={8}>
            <HStack spacing={4}>
              <Icon as={FaUser} boxSize={8} color={titleColor} />
              <Heading size="xl" color={titleColor}>
                Clientes
              </Heading>
              <Badge
                colorScheme="teal"
                fontSize="lg"
                px={3}
                py={1}
                borderRadius="full"
              >
                {clients.length} registros
              </Badge>
            </HStack>

            <Button
              leftIcon={<FaPlus />}
              colorScheme="teal"
              onClick={handleOpenCreate}
            >
              Nuevo Cliente
            </Button>
          </Flex>

          <Card mb={8} border="1px" borderColor={borderColor}>
            <CardBody>
              <Flex direction={{ base: "column", md: "row" }} gap={4}>
                <InputGroup flex="1">
                  <Input
                    placeholder="Buscar cliente por nombre, teléfono o email..."
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
              </Flex>
            </CardBody>
          </Card>

          <Card bg={cardBg} boxShadow="md" borderRadius="xl" overflow="hidden">
            <CardHeader borderBottom="1px" borderColor={borderColor}>
              <Flex justify="space-between" align="center">
                <Heading size="md">Listado de Clientes</Heading>
                <Text color="gray.500">
                  {filteredClients.length} resultados
                </Text>
              </Flex>
            </CardHeader>
            <CardBody p={0}>
              <ClientList
                clients={filteredClients}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </CardBody>
          </Card>
        </Box>
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

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Avatar icon={<FaUser />} bg={titleColor} />
              <Box>
                <Text>
                  {selectedClient ? "Editar Cliente" : "Nuevo Cliente"}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {selectedClient
                    ? "Actualiza la información del cliente"
                    : "Completa todos los campos requeridos"}
                </Text>
              </Box>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ClientForm onSave={handleSave} client={selectedClient} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ClientsPage;
