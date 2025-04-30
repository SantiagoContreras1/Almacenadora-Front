import { SideBar } from "../components/dashboard/SideBar";
import { TopBar } from "../components/dashboard/TopBar";
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
  SimpleGrid
} from "@chakra-ui/react";
import { useState } from "react";
import SupplierForm from "../components/suppliers/SupplierForm";
import SupplierList from "../components/suppliers/SupplierList";
import { FaTruck, FaSearch, FaPlus, FaFilter, FaRegEdit, FaTrashAlt } from "react-icons/fa";

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      nombre: "Distribuidora ACME",
      contacto: "Juan Pérez",
      email: "juan@acme.com",
      telefono: "555-1234",
      direccion: "Av. Principal 123",
      categoria: "Electrónicos"
    },
    {
      id: 2,
      nombre: "Suministros Industriales",
      contacto: "María García",
      email: "maria@suministros.com",
      telefono: "555-5678",
      direccion: "Calle Secundaria 456",
      categoria: "Herramientas"
    }
  ]);

  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const bg = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const titleColor = useColorModeValue("teal.600", "teal.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleAddSupplier = (newSupplier) => {
    setSuppliers([...suppliers, { ...newSupplier, id: Date.now() }]);
    onClose();
  };

  const handleEditSupplier = (updatedSupplier) => {
    setSuppliers(suppliers.map(s => s.id === updatedSupplier.id ? updatedSupplier : s));
    setSelectedSupplier(null);
    onClose();
  };

  const handleDeleteSupplier = (id) => {
    setSuppliers(suppliers.filter(s => s.id !== id));
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.nombre?.toLowerCase().includes(search.toLowerCase()) ||
    supplier.contacto?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box minH="100vh" bg={bg}>
      <SideBar />
      <Box ml={{ base: 0, md: 60 }} transition="0.3s ease">
        <TopBar />
        <Box p={{ base: 4, md: 8 }}>
          {/* Encabezado con acciones */}
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
              onClick={() => {
                setSelectedSupplier(null);
                onOpen();
              }}
            >
              Nuevo Proveedor
            </Button>
          </Flex>

          {/* Barra de búsqueda */}
          <Card mb={8} border="1px" borderColor={borderColor}>
            <CardBody>
              <Flex direction={{ base: "column", md: "row" }} gap={4}>
                <InputGroup flex="1">
                  <Input
                    placeholder="Buscar proveedor por nombre o contacto..."
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


          {/* Resumen estadístico */}
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={6} mb={8}>
            <Card bg={cardBg} boxShadow="sm" borderRadius="lg">
              <CardBody>
                <Text fontSize="sm" color="gray.500">Proveedores Activos</Text>
                <Heading size="lg">{suppliers.length}</Heading>
              </CardBody>
            </Card>
            <Card bg={cardBg} boxShadow="sm" borderRadius="lg">
              <CardBody>
                <Text fontSize="sm" color="gray.500">Categorías</Text>
                <Heading size="lg">5</Heading>
              </CardBody>
            </Card>
            <Card bg={cardBg} boxShadow="sm" borderRadius="lg">
              <CardBody>
                <Text fontSize="sm" color="gray.500">Recientes</Text>
                <Heading size="lg">2</Heading>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Listado de proveedores */}
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
                onEdit={(supplier) => {
                  setSelectedSupplier(supplier);
                  onOpen();
                }}
                onDelete={handleDeleteSupplier}
              />
            </CardBody>
          </Card>
        </Box>
      </Box>

      {/* Modal para formulario */}
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
              onAddSupplier={handleAddSupplier}
              onEditSupplier={handleEditSupplier}
              supplier={selectedSupplier}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SuppliersPage;