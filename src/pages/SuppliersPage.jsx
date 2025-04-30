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
  SimpleGrid,
  Select,
  useToast
} from "@chakra-ui/react";
import { SideBar } from "../components/dashboard/SideBar";
import { TopBar } from "../components/dashboard/TopBar";
import { FaTruck, FaSearch, FaPlus } from "react-icons/fa";
import SupplierForm from "../components/suppliers/SupplierForm";
import SupplierList from "../components/suppliers/SupplierList";
import { useSuppliers } from "../shared/hooks/useSuppliers";

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const toast = useToast();

  const bg = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const titleColor = useColorModeValue("teal.600", "teal.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const { getSuppliers, saveSupplier, updateSupplier, deleteSupplier } = useSuppliers();

  const fetchData = async () => {
    const suppliersFromApi = await getSuppliers();
    if (suppliersFromApi) {
      setSuppliers(suppliersFromApi);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (data) => {
    if (selectedSupplier) {
      await updateSupplier(selectedSupplier.uid, data);
      toast({
        title: "Proveedor actualizado",
        description: "El proveedor ha sido actualizado con éxito.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } else {
      await saveSupplier(data);
      toast({
        title: "Proveedor agregado",
        description: "El proveedor ha sido registrado con éxito.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
    fetchData();
    onClose();
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    onOpen();
  };

  const handleDelete = async (id, name) => {
    await deleteSupplier(id);
    fetchData();
    toast({
      title: "Proveedor eliminado",
      description: `${name} ha sido eliminado correctamente.`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  const handleOpenCreate = () => {
    setSelectedSupplier(null);
    onOpen();
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.nombre?.toLowerCase().includes(search.toLowerCase()) ||
    supplier.contacto?.toLowerCase().includes(search.toLowerCase()) ||
    supplier.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box minH="100vh" bg={bg}>
      <SideBar />
      <Box ml={{ base: 0, md: 60 }} transition="0.3s ease">
        <TopBar />
        <Box p={{ base: 4, md: 8 }}>
          <Flex justify="space-between" align="center" mb={8}>
            <HStack spacing={4}>
              <Icon as={FaTruck} boxSize={8} color={titleColor} />
              <Heading size="xl" color={titleColor}>
                Proveedores
              </Heading>
              <Badge colorScheme="teal" fontSize="lg" px={3} py={1} borderRadius="full">
                {suppliers.length} registros
              </Badge>
            </HStack>

            <Button
              leftIcon={<FaPlus />}
              colorScheme="teal"
              onClick={handleOpenCreate}
            >
              Nuevo Proveedor
            </Button>
          </Flex>

          <Card mb={8} border="1px" borderColor={borderColor}>
            <CardBody>
              <Flex direction={{ base: "column", md: "row" }} gap={4}>
                <InputGroup flex="1">
                  <Input
                    placeholder="Buscar proveedor por nombre, contacto o email..."
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
                <Heading size="md">Listado de Proveedores</Heading>
                <Text color="gray.500">{filteredSuppliers.length} resultados</Text>
              </Flex>
            </CardHeader>
            <CardBody p={0}>
              <SupplierList
                suppliers={filteredSuppliers}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </CardBody>
          </Card>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Avatar icon={<FaTruck />} bg={titleColor} />
              <Box>
                <Text>{selectedSupplier ? "Editar Proveedor" : "Nuevo Proveedor"}</Text>
                <Text fontSize="sm" color="gray.500">
                  {selectedSupplier ? "Actualiza la información del proveedor" : "Completa todos los campos requeridos"}
                </Text>
              </Box>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <SupplierForm
              onSave={handleSave}
              supplier={selectedSupplier}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SuppliersPage;
