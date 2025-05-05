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
import CategoryForm from "../components/categories/CategoryForm.jsx";
import CategoryList from "../components/categories/CategoryList.jsx";
import { useCategories } from "../shared/hooks/useCategories.js";


const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const bg = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const titleColor = useColorModeValue("teal.600", "teal.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const { getCategories, saveCategory, editCategory, deleteCategory } = useCategories();

  const fetchData = async () => {
    const CategoriesFromApi = await getCategories();
    if (CategoriesFromApi) {
      console.log(CategoriesFromApi);
      setCategories(CategoriesFromApi);
    }
  };

  useEffect(() => {
    fetchData();
  },[]);

  const handleSave = async (data) => {
    if (selectedCategory) {
      await editCategory(selectedCategory.uid, data);
    } else {
      await saveCategory(data);
    }
    fetchData();
    onClose();
  };

  const handleEdit = (Category) => {
    setSelectedCategory(Category);
    onOpen();
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    fetchData();
  };

  const handleOpenCreate = () => {
    setSelectedCategory(null);
    onOpen();
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      String(category.id).includes(search.toLowerCase())
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
                Categorias
              </Heading>
              <Badge
                colorScheme="teal"
                fontSize="lg"
                px={3}
                py={1}
                borderRadius="full"
              >
                {categories.length} registros
              </Badge>
            </HStack>

            <Button
              leftIcon={<FaPlus />}
              colorScheme="teal"
              onClick={handleOpenCreate}
            >
              Nueva Categoria
            </Button>
          </Flex>

          <Card mb={8} border="1px" borderColor={borderColor}>
            <CardBody>
              <Flex direction={{ base: "column", md: "row" }} gap={4}>
                <InputGroup flex="1">
                  <Input
                    placeholder="Buscar categoria por nombre o id..."
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
                <Heading size="md">Listado de Categorias</Heading>
                <Text color="gray.500">
                  {filteredCategories.length} resultados
                </Text>
              </Flex>
            </CardHeader>
            <CardBody p={0}>
            <CategoryList
                categories={filteredCategories}
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
              <Avatar icon={<FaUser />} bg={titleColor} />
              <Box>
                <Text>
                  {selectedCategory ? "Editar Categoria" : "Nueva Categoria"}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {selectedCategory
                    ? "Actualiza la información de la categoria"
                    : "Completa todos los campos requeridos"}
                </Text>
              </Box>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CategoryForm onSave={handleSave} category={selectedCategory} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CategoriesPage;
