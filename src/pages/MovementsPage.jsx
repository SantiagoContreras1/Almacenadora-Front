import React, { useState } from "react";
import { SideBar } from "../components/dashboard/SideBar";
import { TopBar } from "../components/dashboard/TopBar";
import AddMovements from "../components/movements/Addmovements";
import DeleteMovements from "../components/movements/Deletemovements";
import Listmovements from "../components/movements/Listmovements";
import Modal from "react-modal";
import { Box, Button, Card, CardBody, Flex, Heading, HStack, Input, InputGroup, InputRightElement, IconButton, Icon, SimpleGrid, useDisclosure, useColorModeValue, Text } from "@chakra-ui/react";
import { FaPlus, FaSearch, FaTrashAlt, FaRegEdit, FaMinus } from "react-icons/fa";

Modal.setAppElement('#root');

const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    position: "relative",
    inset: "unset",
    padding: 0,
    border: "none",
    background: "none",
    overflow: "visible",
  },
};

const MovementsPage = () => {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const addMovement = (data, type) => setHistory([...history, { ...data, type }]);
  

  const filteredMovements = history.filter(
    (movement) =>
      movement.name?.toLowerCase().includes(search.toLowerCase()) ||
      movement.type?.toLowerCase().includes(search.toLowerCase())
  );

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
          <Flex justify="space-between" align="center" mb={8}>
            <HStack spacing={4}>
              <Heading size="xl" color={titleColor}>
                🔄 Movimientos
              </Heading>
            </HStack>

            <Button
              leftIcon={<FaPlus />}
              colorScheme="teal"
              onClick={() => {
                setSelectedMovement(null);
                setIsAddOpen(true);
              }}
            >
              Nuevo Movimiento
            </Button>

            
          </Flex>

          <Card mb={8} border="1px" borderColor={borderColor}>
            <CardBody>
              <Flex direction={{ base: "column", md: "row" }} gap={4}>
                <InputGroup flex="1">
                  <Input
                    placeholder="Buscar por nombre o tipo..."
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

          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6} mb={8}>
            <Card bg={cardBg} boxShadow="sm" borderRadius="lg">
              <CardBody>
                <Text fontSize="sm" color="gray.500">Entradas</Text>
                <Heading size="lg">{history.filter(m => m.type === "Entrada").length}</Heading>
              </CardBody>
            </Card>
            <Card bg={cardBg} boxShadow="sm" borderRadius="lg">
              <CardBody>
                <Text fontSize="sm" color="gray.500">Salidas</Text>
                <Heading size="lg">{history.filter(m => m.type === "Salida").length}</Heading>
              </CardBody>
            </Card>
            <Card bg={cardBg} boxShadow="sm" borderRadius="lg">
              <CardBody>
                <Text fontSize="sm" color="gray.500">Total Movimientos</Text>
                <Heading size="lg">{history.length}</Heading>
              </CardBody>
            </Card>
          </SimpleGrid>

          <Box mt={8}>
            <Listmovements suppliers={filteredMovements} />
          </Box>

        </Box>
      </Box>

      <Modal isOpen={isAddOpen} onRequestClose={() => setIsAddOpen(false)} style={modalStyle}>
        <div style={{ background: "#fff", borderRadius: "10px", padding: "20px", maxWidth: "500px", boxShadow: "0 5px 15px rgba(0,0,0,0.3)" }}>
          <AddMovements
            addEntry={(data) => addMovement(data, "Entrada")}
            addExit={(data) => addMovement(data, "Salida")}
            movement={selectedMovement}
          />
        </div>
      </Modal>

      <Modal isOpen={isDeleteOpen} onRequestClose={onDeleteClose} style={modalStyle}>
        <div style={{ background: "#fff", borderRadius: "10px", padding: "20px", maxWidth: "500px", boxShadow: "0 5px 15px rgba(0,0,0,0.3)" }}>
          <DeleteMovements />
        </div>
      </Modal>
    </Box>
  );
};

export default MovementsPage;
