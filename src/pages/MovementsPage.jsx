import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
  SimpleGrid,
  useDisclosure,
  useColorModeValue,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";
import { FaPlus, FaSearch, FaMinus } from "react-icons/fa";
import { SideBar } from "../components/dashboard/SideBar";
import { TopBar } from "../components/dashboard/TopBar";
import MovementForm from "../components/movements/MovementForm";
import Listmovements from "../components/movements/Listmovements";
import Pagination from "../components/Pagination";
import { useMovements } from "../shared/hooks/useMovements";
import { useProducts } from "../shared/hooks/useProducts";
import { useNotifications } from "../shared/hooks/useNotifications";

const MovementsPage = () => {
  const [movements, setMovements] = useState([]);
  const [totalMovements, setTotalMovements] = useState(0);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [defaultType, setDefaultType] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [inputs, setInputs] = useState()
  const [outputs, setOutputs] = useState()
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const offset = (page - 1) * limit;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    getMovements,
    saveInput,
    saveOutput,
    editInput,
    editOutput,
    deleteInput,
    deleteOutput,
    isLoading: isMovementsLoading,
  } = useMovements();

  const { getProducts } = useProducts();

  useNotifications();

  useEffect(() => {
    fetchMovements();
    fetchProducts();
  }, [page]);

  const fetchMovements = async () => {
    const data = await getMovements( limit, offset );
    if (data) {
      setMovements(data.movements || []);
      setInputs(data.inputs)
      setOutputs(data.outputs)
      setTotalMovements(data.total || 0);
    }
  };

  const fetchProducts = async () => {
    const data = await getProducts();
    if (data) {
      setProducts(data);
    }
  };

  const handleSaveMovement = async (movementData, type) => {
    let result;
    let dataformated;
    if (selectedMovement) {
      if (selectedMovement.type === "Entrada") {
        result = await editInput(selectedMovement.id, movementData);
      } else {
        dataformated = {
          quantityRemoved: movementData.quantity,
          reason: movementData.reason,
          destination: movementData.destination,
        };
        result = await editOutput(selectedMovement.id, dataformated);
      }
    } else {
      if (type === "Entrada") {
        result = await saveInput(movementData);
      } else {
        result = await saveOutput(movementData);
      }
    }

    if (result) {
      onClose();
      fetchMovements();
    }
  };

  const handleEdit = (movement) => {
    setSelectedMovement(movement);
    onOpen();
  };

  const handleDelete = async (id, type) => {
    let success;
    if (type === "Entrada") {
      success = await deleteInput(id);
    } else {
      success = await deleteOutput(id);
    }
    if (success) {
      fetchMovements();
    }
  };

  const handleOpenCreate = (type) => {
    setSelectedMovement(null);
    setDefaultType(type);
    onOpen();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const filteredMovements = movements.filter((movement) => {
    const movementDate = new Date(movement.date);
    const isAfterStart = startDate ? movementDate >= new Date(startDate) : true;
    const isBeforeEnd = endDate ? movementDate <= new Date(endDate) : true;
    const matchesSearch =
      movement.productName?.toLowerCase().includes(search.toLowerCase()) ||
      String(movement.id).includes(search.toLowerCase());
    const matchesType = typeFilter ? movement.type === typeFilter : true;

    return isAfterStart && isBeforeEnd && matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(totalMovements / limit);

  const bg = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const titleColor = useColorModeValue("teal.600", "teal.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box minH="100vh" bg={bg}>
      <SideBar />
      <Box ml={{ base: 0, md: 60 }} transition="0.3s ease">
        <TopBar />

        <Box p={{ base: 4, md: 8 }}>
          <Flex justify="space-between" mb={8} flexWrap="wrap" gap={4}>
            <HStack spacing={4}>
              <Heading size="xl" color={titleColor}>
                🔄 Movimientos
              </Heading>
            </HStack>

            <HStack spacing={4}>
              <Button
                leftIcon={<FaPlus />}
                colorScheme="teal"
                onClick={() => handleOpenCreate("Entrada")}
                isLoading={isMovementsLoading}
              >
                Nueva Entrada
              </Button>
              <Button
                leftIcon={<FaMinus />}
                colorScheme="red"
                onClick={() => handleOpenCreate("Salida")}
                isLoading={isMovementsLoading}
              >
                Nueva Salida
              </Button>
            </HStack>
          </Flex>

          <Card mb={8} border="1px" borderColor={borderColor}>
            <CardBody>
              <Flex
                direction={{ base: "column", md: "row" }}
                gap={4}
                align="center"
                flexWrap="wrap"
              >
                <InputGroup flex="1" maxW="300px">
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

                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  maxW="200px"
                />
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  maxW="200px"
                />

                <Select
                  placeholder="Filtrar por tipo"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  maxW="200px"
                >
                  <option value="Entrada">Entrada</option>
                  <option value="Salida">Salida</option>
                </Select>

                {(startDate || endDate || search || typeFilter) && (
                  <Button
                    onClick={() => {
                      setStartDate("");
                      setEndDate("");
                      setSearch("");
                      setTypeFilter("");
                    }}
                    colorScheme="gray"
                    variant="outline"
                    borderRadius="lg"
                    maxW="160px"
                  >
                    Limpiar filtros
                  </Button>
                )}
              </Flex>
            </CardBody>
          </Card>

          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6} mb={8}>
            <Card bg={cardBg} boxShadow="sm" borderRadius="lg">
              <CardBody>
                <Text fontSize="sm" color="gray.500">
                  Entradas
                </Text>
                <Heading size="lg">
                  {inputs}
                </Heading>
              </CardBody>
            </Card>
            <Card bg={cardBg} boxShadow="sm" borderRadius="lg">
              <CardBody>
                <Text fontSize="sm" color="gray.500">
                  Salidas
                </Text>
                <Heading size="lg">
                  {outputs}
                </Heading>
              </CardBody>
            </Card>
            <Card bg={cardBg} boxShadow="sm" borderRadius="lg">
              <CardBody>
                <Text fontSize="sm" color="gray.500">
                  Total Movimientos
                </Text>
                <Heading size="lg">{totalMovements}</Heading>
              </CardBody>
            </Card>
          </SimpleGrid>

          <Box mt={8}>
            {isMovementsLoading ? (
              <Flex justify="center" align="center" height="200px">
                <Spinner size="xl" color="teal.500" />
              </Flex>
            ) : (
              <>
                <Listmovements
                  movements={filteredMovements}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
                
                <Pagination 
                  currentPage={page} 
                  totalPages={totalPages} 
                  onPageChange={handlePageChange}
                  totalItems={totalMovements}
                  itemsPerPage={limit}
                  showItemCount={true}
                />
              </>
            )}
          </Box>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedMovement ? "Editar Movimiento" : "Nuevo Movimiento"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <MovementForm
              movement={selectedMovement}
              onSave={handleSaveMovement}
              products={products}
              defaultType={selectedMovement ? selectedMovement.type : defaultType}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MovementsPage;