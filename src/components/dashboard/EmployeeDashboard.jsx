import {
    Box,
    Flex,
    useColorModeValue,
    VStack,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Stack,
    Input,
    FormControl,
    FormLabel,
    Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Text,
    IconButton,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
  } from "@chakra-ui/react";
  import { SideBar } from "./SideBar";
  import { TopBar } from "./TopBar";
  import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
  import { useState, useRef } from "react";
  
  const EmployeeDashboard = () => {
    const [movements, setMovements] = useState([
      {
        id: 1,
        product: 'Varillas de Hierro 3/8"',
        type: "Entrada",
        quantity: 200,
        user: "Juan Pérez",
        date: "26/04/2025",
      },
      {
        id: 2,
        product: "Cemento Portland Tipo I",
        type: "Salida",
        quantity: 15,
        user: "María López",
        date: "26/04/2025",
      },
      {
        id: 3,
        product: "Lámina Galvanizada 8'",
        type: "Entrada",
        quantity: 50,
        user: "Carlos Rodríguez",
        date: "25/04/2025",
      },
      {
        id: 4,
        product: "Pintura Blanca Interior",
        type: "Salida",
        quantity: 12,
        user: "Ana Ramírez",
        date: "25/04/2025",
      },
      {
        id: 5,
        product: 'Tubería PVC 4"',
        type: "Salida",
        quantity: 8,
        user: "Pedro Gómez",
        date: "24/04/2025",
      },
    ]);
    const {
      isOpen: isAddOpen,
      onOpen: onAddOpen,
      onClose: onAddClose,
    } = useDisclosure();
    const {
      isOpen: isEditOpen,
      onOpen: onEditOpen,
      onClose: onEditClose,
    } = useDisclosure();
    const {
      isOpen: isDeleteOpen,
      onOpen: onDeleteOpen,
      onClose: onDeleteClose,
    } = useDisclosure();
    const [selectedMovement, setSelectedMovement] = useState(null);
    const [newMovement, setNewMovement] = useState({
      product: "",
      type: "Entrada",
      quantity: "",
      date: new Date().toLocaleDateString(),
    });
    const [editMovement, setEditMovement] = useState({
      id: null,
      product: "",
      type: "",
      quantity: "",
      date: "",
    });
    const cancelRef = useRef();
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setNewMovement((prevMovement) => ({
        ...prevMovement,
        [name]: value,
      }));
    };
  
    const handleEditInputChange = (event) => {
      const { name, value } = event.target;
      setEditMovement((prevMovement) => ({
        ...prevMovement,
        [name]: value,
      }));
    };
  
    const handleAddMovement = () => {
      const newId = movements.length > 0 ? Math.max(...movements.map((m) => m.id)) + 1 : 1;
      setMovements([...movements, { ...newMovement, id: newId, user: "Empleado Actual" }]);
      onAddClose();
      setNewMovement({ product: "", type: "Entrada", quantity: "", date: new Date().toLocaleDateString() });
    };
  
    const handleEditClick = (movement) => {
      setSelectedMovement(movement);
      setEditMovement({ ...movement });
      onEditOpen();
    };
  
    const handleSaveEdit = () => {
      setMovements((prevMovements) =>
        prevMovements.map((m) =>
          m.id === editMovement.id ? { ...editMovement, user: "Empleado Actual" } : m
        )
      );
      onEditClose();
      setEditMovement({ id: null, product: "", type: "", quantity: "", date: "" });
      setSelectedMovement(null);
    };
  
    const handleDeleteClick = (movement) => {
      setSelectedMovement(movement);
      onDeleteOpen();
    };
  
    const confirmDeleteMovement = () => {
      setMovements((prevMovements) =>
        prevMovements.filter((m) => m.id !== selectedMovement.id)
      );
      onDeleteClose();
      setSelectedMovement(null);
    };
  
    return (
      <Flex h="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
        <SideBar active="movements" />
        <Box ml="64" flex="1" p="6" overflow="auto">
          <TopBar />
          <VStack align="start" spacing="6" mt="8">
            <Flex justify="space-between" align="center" w="100%">
              <Heading as="h2" size="lg">
                Registro de Movimientos de Productos
              </Heading>
              <Button leftIcon={<FiPlus />} colorScheme="teal" onClick={onAddOpen}>
                Registrar Movimiento
              </Button>
            </Flex>
  
            {movements.length === 0 ? (
              <Text fontSize="lg">No se han registrado movimientos de productos.</Text>
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Producto</Th>
                    <Th>Tipo</Th>
                    <Th>Cantidad</Th>
                    <Th>Fecha</Th>
                    <Th>Usuario</Th>
                    <Th>Acciones</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {movements.map((movement) => (
                    <Tr key={movement.id}>
                      <Td>{movement.product}</Td>
                      <Td>{movement.type}</Td>
                      <Td>{movement.quantity}</Td>
                      <Td>{movement.date}</Td>
                      <Td>{movement.user}</Td>
                      <Td>
                        <Stack direction="row" spacing={2}>
                          <IconButton
                            icon={<FiEdit />}
                            size="sm"
                            onClick={() => handleEditClick(movement)}
                            aria-label="Editar movimiento"
                          />
                          <IconButton
                            icon={<FiTrash2 />}
                            size="sm"
                            onClick={() => handleDeleteClick(movement)}
                            aria-label="Eliminar movimiento"
                          />
                        </Stack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </VStack>
  
          {/* Modal para agregar movimiento */}
          <Modal isOpen={isAddOpen} onClose={onAddClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Registrar Nuevo Movimiento</ModalHeader>
              <ModalBody>
                <FormControl mb="4">
                  <FormLabel htmlFor="product">Producto</FormLabel>
                  <Input
                    id="product"
                    name="product"
                    value={newMovement.product}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel htmlFor="type">Tipo de Movimiento</FormLabel>
                  <Select
                    id="type"
                    name="type"
                    value={newMovement.type}
                    onChange={handleInputChange}
                  >
                    <option value="Entrada">Entrada</option>
                    <option value="Salida">Salida</option>
                  </Select>
                </FormControl>
                <FormControl mb="4">
                  <FormLabel htmlFor="quantity">Cantidad</FormLabel>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={newMovement.quantity}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel htmlFor="date">Fecha</FormLabel>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={newMovement.date}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleAddMovement}>
                  Guardar
                </Button>
                <Button onClick={onAddClose}>Cancelar</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
  
          {/* Modal para editar movimiento */}
          <Modal isOpen={isEditOpen} onClose={onEditClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Editar Movimiento</ModalHeader>
              <ModalBody>
                <FormControl mb="4">
                  <FormLabel htmlFor="edit-product">Producto</FormLabel>
                  <Input
                    id="edit-product"
                    name="product"
                    value={editMovement.product}
                    onChange={handleEditInputChange}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel htmlFor="edit-type">Tipo de Movimiento</FormLabel>
                  <Select
                    id="edit-type"
                    name="type"
                    value={editMovement.type}
                    onChange={handleEditInputChange}
                  >
                    <option value="Entrada">Entrada</option>
                    <option value="Salida">Salida</option>
                  </Select>
                </FormControl>
                <FormControl mb="4">
                  <FormLabel htmlFor="edit-quantity">Cantidad</FormLabel>
                  <Input
                    id="edit-quantity"
                    name="quantity"
                    type="number"
                    value={editMovement.quantity}
                    onChange={handleEditInputChange}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel htmlFor="edit-date">Fecha</FormLabel>
                  <Input
                    id="edit-date"
                    name="date"
                    type="date"
                    value={editMovement.date}
                    onChange={handleEditInputChange}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSaveEdit}>
                  Guardar Cambios
                </Button>
                <Button onClick={onEditClose}>Cancelar</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
  
          {/* Modal para confirmar eliminación */}
          <AlertDialog
            isOpen={isDeleteOpen}
            leastDestructiveRef={cancelRef}
            onClose={onDeleteClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Eliminar Movimiento
                </AlertDialogHeader>
  
                <AlertDialogBody>
                  ¿Estás seguro de que deseas eliminar este movimiento? Esta acción no se puede deshacer.
                </AlertDialogBody>
  
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onDeleteClose}>
                    Cancelar
                  </Button>
                  <Button colorScheme="red" onClick={confirmDeleteMovement} ml={3}>
                    Eliminar
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>
      </Flex>
    );
  };
  
  export default EmployeeDashboard;