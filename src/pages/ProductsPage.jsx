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
  const [productToEdit, setProductToEdit] = useState(null);

  const { getProducts, saveProduct, isLoading, updateProduct } = useProducts();

  const fetchProducts = async () => {
    const productsFromApi = await getProducts();
    if (productsFromApi) {
      setProducts(productsFromApi);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveProduct = (data) => {
    saveProduct(data)
    fetchProducts();
    onAddClose();
  };

  const handleOpenEdit = (product) => {
    setProductToEdit(product);
    onEditOpen();
  };

  const handleEditProduct = async (updatedProduct) => {
    if (!productToEdit) return;

    await updateProduct(productToEdit.uid, updatedProduct);
    setProductToEdit(null);
    onEditClose();
    fetchProducts();
  };

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
          {products.map((product) => (
            <ProductCard
              key={product.uid}
              product={product}
              onEdit={() => handleOpenEdit(product)}
            />
          ))}
        </SimpleGrid>

        <AddProductModal
          isOpen={isAddOpen}
          onClose={onAddClose}
          handleSaveProduct={handleSaveProduct}
        />

        {productToEdit && (
          <EditProductModal
            isOpen={isEditOpen}
            onClose={() => {
              setProductToEdit(null);
              onEditClose();
            }}
            product={productToEdit}
            handleEditProduct={handleEditProduct}
          />
        )}
      </Box>
    </>
  );
};

export default ProductsPage;
