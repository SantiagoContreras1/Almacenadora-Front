import { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Button,
  useToast,
  Input,
  Select,
} from "@chakra-ui/react";
import { SideBar } from "../components/dashboard/SideBar";
import { TopBar } from "../components/dashboard/TopBar";
import { useProducts } from "../shared/hooks/useProducts";
import { ProductCard } from "../components/products/ProductCard";
import { useDisclosure } from "@chakra-ui/react";
import { ProductModal } from "../components/products/ProductModal";
import { useCategories } from "../shared/hooks/useCategories";

const ProductsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState({ name: "", category: "", entrada: "" });
  const [categories, setCategories] = useState([]);
  const { getCategories } = useCategories();
  const toast = useToast();
  const { getProducts, saveProduct, updateProduct, deleteProduct } = useProducts();

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
      await updateProduct(selectedProduct.uid, data);
    } else {
      await saveProduct(data);
    }
    fetchData();
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const handleDelete = async (id, name) => {
    await deleteProduct(id);
    fetchData();
    toast({
      title: "Producto eliminado",
      description: `${name} ha sido eliminado correctamente.`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });
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
    <>
      <SideBar />
      <TopBar isSearch={true} handleChange={handleSearchByName} />

      <Box ml="250px" p="5">
        <Box mb="4" display="flex" justifyContent="space-between" gap={4} flexWrap="wrap">
          <Input
            type="date"
            placeholder="dd/mm/yyyy"
            onChange={(e) => handleSearchByDate(e.target.value)}
            maxW="200px"
          />
          <Select
            placeholder="Seleccione una categoría"
            onChange={(e) => handleSearchByCategory(e.target.value)}
            maxW="250px"
          >
            {categories.map((cat) => (
              <option key={cat.uid} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </Select>
          <Button colorScheme="teal" onClick={handleOpenCreate}>
            Registrar Producto
          </Button>
        </Box>

        <SimpleGrid columns={[1, 2, 3,4]} spacing={5}>
          {products.map((product) => (
            <ProductCard
              key={product.uid}
              product={product}
              onEdit={() => handleEdit(product)}
              onDelete={handleDelete}
            />
          ))}
        </SimpleGrid>

        <ProductModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
          product={selectedProduct}
          isEdit={selectedProduct !== null}
          categories={categories}
        />
      </Box>
    </>
  );
};

export default ProductsPage;
