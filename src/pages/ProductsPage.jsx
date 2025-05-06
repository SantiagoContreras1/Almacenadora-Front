import { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Button,
  Input,
  Select,
  Heading,
  Flex,
  HStack,
  Icon,
  Badge,
  Card,
  CardHeader,
  CardBody,
  useColorModeValue,
  Text,
  InputGroup,
  InputRightElement,
  IconButton
} from "@chakra-ui/react";
import { SideBar } from "../components/dashboard/SideBar";
import { TopBar } from "../components/dashboard/TopBar";
import { useProducts } from "../shared/hooks/useProducts";
import { ProductCard } from "../components/products/ProductCard";
import { useDisclosure } from "@chakra-ui/react";
import { ProductModal } from "../components/products/ProductModal";
import { useCategories } from "../shared/hooks/useCategories";
import { useNotifications } from "../shared/hooks/useNotifications";
import Pagination from "../components/Pagination";
import { FaBox, FaPlus, FaSearch } from "react-icons/fa";

const ProductsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState({ name: "", category: "", entrada: "" });
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / limit);

  // Color mode values
  const bg = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const titleColor = useColorModeValue("teal.600", "teal.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  const { getCategories } = useCategories();
  const { getProducts, saveProduct, updateProduct, deleteProduct } =
    useProducts();

  useNotifications();

  const fetchData = async () => {
    const productsFromApi = await getProducts();
    const catData = await getCategories();
    setCategories(catData || []);
    if (productsFromApi) {
      setProducts(productsFromApi);
    }
  };

  const fetchBySearch = async () => {
    const productsSearch = await getProducts(search);
    if (productsSearch) {
      setProducts(productsSearch);
    } else {
      setProducts([]);
    }
  };

  useEffect(() => {
    if (
      (search.name && search.name.trim() !== "") ||
      (search.category && search.category !== "") ||
      (search.entrada && search.entrada !== "")
    ) {
      fetchBySearch();
    } else {
      fetchData();
    }
  }, [search]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (data) => {
    if (selectedProduct) {
      await updateProduct(selectedProduct.uid, data)
    } else {
      await saveProduct(data);
    }
    fetchData();
    onClose();
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchData();
  };

  const handleOpenCreate = () => {
    setSelectedProduct(null);
    onOpen();
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    onClose();
  };

  const handleSearchByName = (value) => {
    setSearch((prev) => ({ ...prev, name: value }));
  };

  const handleSearchByCategory = (value) => {
    setSearch((prev) => ({ ...prev, category: value }));
  };

  const handleSearchByDate = (value) => {
    setSearch((prev) => ({ ...prev, entrada: value }));
  };

  return (
    <Box minH="100vh" bg={bg}>
      <SideBar />
      <Box ml={{ base: 0, md: 60 }} transition="0.3s ease">
        <TopBar isSearch={true} handleChange={handleSearchByName} />
        
        <Box p={{ base: 4, md: 8 }}>
          
          <Flex justify="space-between" align="center" mb={8} flexWrap={{ base: "wrap", md: "nowrap" }} gap={4}>
            <HStack spacing={4} mb={{ base: 4, md: 0 }}>
              <Icon as={FaBox} boxSize={8} color={titleColor} />
              <Heading size="xl" color={titleColor}>
                Productos
              </Heading>
              <Badge
                colorScheme="teal"
                fontSize="lg"
                px={3}
                py={1}
                borderRadius="full"
              >
                {products.length} registros
              </Badge>
            </HStack>

            <Button
              leftIcon={<FaPlus />}
              colorScheme="teal"
              onClick={handleOpenCreate}
            >
              Registrar Producto
            </Button>
          </Flex>

          
          <Card mb={8} border="1px" borderColor={borderColor}>
            <CardBody>
              <Flex direction={{ base: "column", md: "row" }} gap={4}>
                <InputGroup flex="1" mb={{ base: 4, md: 0 }}>
                  <Input
                    placeholder="Buscar producto..."
                    value={search.name}
                    onChange={(e) => handleSearchByName(e.target.value)}
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
                  placeholder="dd/mm/yyyy"
                  onChange={(e) => handleSearchByDate(e.target.value)}
                  flex={{ base: "1", md: "0.5" }}
                  mb={{ base: 4, md: 0 }}
                />
                
                <Select
                  placeholder="Seleccione una categoría"
                  onChange={(e) => handleSearchByCategory(e.target.value)}
                  flex={{ base: "1", md: "0.7" }}
                >
                  {categories.map((cat) => (
                    <option key={cat.uid} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </Select>
              </Flex>
            </CardBody>
          </Card>

          <Card bg={cardBg} boxShadow="md" borderRadius="xl" overflow="hidden" mb={6}>
            <CardHeader borderBottom="1px" borderColor={borderColor}>
              <Flex justify="space-between" align="center">
                <Heading size="md">Listado de Productos</Heading>
                <Text color="gray.500">
                  {products.length} resultados
                </Text>
              </Flex>
            </CardHeader>
            <CardBody>
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5}>
                {products.map((product) => (
                  <ProductCard
                    key={product.uid}
                    product={product}
                    onEdit={() => handleEdit(product)}
                    onDelete={handleDelete}
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

        <ProductModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
          product={selectedProduct}
          isEdit={selectedProduct !== null}
          categories={categories}
        />
      </Box>
    </Box>
  );
};

export default ProductsPage;