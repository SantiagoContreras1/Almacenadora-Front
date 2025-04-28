import { useState, useEffect } from "react";
import { Box, SimpleGrid, Button } from "@chakra-ui/react";
import { SideBar } from "../components/dashboard/SideBar";
import { TopBar } from "../components/dashboard/TopBar";
import { useProducts } from "../shared/hooks/useProducts";
import { ProductCard } from "../components/products/ProductCard";
import { AddProductModal } from "../components/products/AddProductModel";
import { EditProductModal } from "../components/products/EditProductModal";
import { useDisclosure } from "@chakra-ui/react";

const ProductsPage = () => {
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

  const [products, setProducts] = useState([]);
  const [searchTerm] = useState("");
  const { getProducts, isLoading } = useProducts();
  const [currentProductIndex, setCurrentProductIndex] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    stock: "",
    supplier: "",
    entryDate: "",
    description: "",
    image: null
  });


  useEffect(() => {
    const fetchData = async () => {
      const productsFromApi = await getProducts();
      if (productsFromApi) {
        setProducts(productsFromApi);
      }
    };

    fetchData();
  }, []);

  const handleSaveProduct = () => {
    setProducts([...products, newProduct]);
    resetProductForm();
    onAddClose();
  };

  const handleEditProduct = () => {
    const updatedProducts = [...products];
    updatedProducts[currentProductIndex] = newProduct;
    setProducts(updatedProducts);
    resetProductForm();
    onEditClose();
  };

  const handleOpenEdit = (index) => {
    setCurrentProductIndex(index);
    setNewProduct(products[index]);
    onEditOpen();
  };


  const resetProductForm = () => {
    setNewProduct({
      name: "",
      category: "",
      stock: "",
      supplier: "",
      entryDate: "",
      description: "",
      image: null,
    });
    setCurrentProductIndex(null);
  };


  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SideBar />
      <TopBar />
      <Box ml="250px" p="5">
        <Box mb="4" display="flex" justifyContent="space-between">
          <Button colorScheme="teal" onClick={onAddOpen}>
            Registrar Producto
          </Button>
        </Box>

        <SimpleGrid columns={[1, 2, 3]} spacing={5}>
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.uid || index}
              product={product}
              onEdit={() => handleOpenEdit(index)}
              onMovement={() => handleOpenMovement(index)}
            />
          ))}
        </SimpleGrid>

        <AddProductModal
          isOpen={isAddOpen}
          onClose={onAddClose}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          handleSaveProduct={handleSaveProduct}
        />

        <EditProductModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          handleEditProduct={handleEditProduct}
        />
      </Box>
    </>
  );
};

export default ProductsPage;
