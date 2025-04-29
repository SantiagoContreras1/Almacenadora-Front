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
  const { getProducts, isLoading } = useProducts();

  useEffect(() => {
    const fetchData = async () => {
      const productsFromApi = await getProducts();
      if (productsFromApi) {
        setProducts(productsFromApi);
      }
    };
    
    fetchData();
  }, []);

  

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
          {products.map((product, index) => (
            <ProductCard
              key={product.uid || index}
              product={product}
            />
          ))}
        </SimpleGrid>

        <AddProductModal
          isOpen={isAddOpen}
          onClose={onAddClose}
        />

        <EditProductModal
          isOpen={isEditOpen}
          onClose={onEditClose}
        />
      </Box>
    </>
  );
};

export default ProductsPage;
