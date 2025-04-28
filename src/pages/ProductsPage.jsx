import { useState } from "react";
import {
  Box, SimpleGrid, Button, Input, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalBody, ModalFooter,
  ModalCloseButton, useDisclosure, Card, CardBody,
  Heading, Text, useToast, Select, Image
} from "@chakra-ui/react";
import SideBar from "../components/dashboard/SideBar";
import TopBar from "../components/dashboard/TopBar";

const InventoryPage = () => {
  // Estados para los modales
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const toast = useToast();

  // Estados para los datos
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [timer, setTimer] = useState(10);
  const [productToDelete, setProductToDelete] = useState(null);

  // Estado para nuevo producto
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    proveedor: "",
    category: "",
    image: null
  });

  const [currentProductIndex, setCurrentProductIndex] = useState(null);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewProduct({ ...newProduct, image: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  // Guardar nuevo producto
  const handleSaveProduct = () => {
    // Aquí Lima agregará la conexión al backend
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      stock: "",
      proveedor: "",
      category: "",
      image: null
    });
    onClose();
    toast({
      title: "Producto registrado",
      description: "El producto se ha agregado al inventario",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Editar producto existente
  const handleEditProduct = () => {
    // Aquí Lima agregará la conexión al backend
    const updatedProducts = [...products];
    updatedProducts[currentProductIndex] = newProduct;
    setProducts(updatedProducts);
    onEditClose();
    toast({
      title: "Producto actualizado",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Preparar edición de producto
  const handleOpenEdit = (index) => {
    setCurrentProductIndex(index);
    setNewProduct(products[index]);
    onEditOpen();
  };

  // Iniciar proceso de eliminación
  const handleDeleteProduct = (index) => {
    setProductToDelete(index);
    setTimer(10);
    onDeleteOpen();
  };

  // Confirmar eliminación de producto
  const confirmDeleteProduct = () => {
    // Aquí Lima agregará la conexión al backend
    const updatedProducts = products.filter((_, i) => i !== productToDelete);
    setProducts(updatedProducts);
    onDeleteClose();
    toast({
      title: "Producto eliminado",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Cancelar eliminación
  const cancelDelete = () => {
    onDeleteClose();
    setTimer(10);
  };

  // Filtrar productos por búsqueda
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SideBar />
      <TopBar />
      <Box ml="250px" p="5">
        <Box mb="4" display="flex" justifyContent="space-between" alignItems="center">
          <Button colorScheme="teal" onClick={onOpen}>
            Agregar Producto
          </Button>
          <Input
            placeholder="Buscar productos..."
            width="auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        <SimpleGrid columns={[1, 2, 3, 4]} spacing={5}>
          {filteredProducts.map((product, index) => (
            <Card key={index} boxShadow="md" _hover={{ boxShadow: "xl" }}>
              {product.image && (
                <Image 
                  src={product.image instanceof File ? URL.createObjectURL(product.image) : product.image}
                  alt={product.name}
                  objectFit="cover"
                  height="200px"
                  borderTopRadius="md"
                />
              )}
              <CardBody>
                <Heading size="md" mb="2">{product.name}</Heading>
                <Text mb="1">Precio: ${product.price}</Text>
                <Text mb="1">Stock: {product.stock}</Text>
                <Text mb="2" noOfLines={2}>{product.description}</Text>

                <Box mt="4" display="flex" flexWrap="wrap" gap="2">
                  <Button size="sm" colorScheme="blue" onClick={() => handleOpenEdit(index)}>
                    Editar
                  </Button>
                  <Button size="sm" colorScheme="red" onClick={() => handleDeleteProduct(index)}>
                    Eliminar
                  </Button>
                </Box>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        {/* Modal: Agregar Nuevo Producto */}
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Agregar Nuevo Producto</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input 
                name="name" 
                placeholder="Nombre del producto" 
                mb="3" 
                value={newProduct.name} 
                onChange={handleChange} 
              />
              <Input
                name="description"
                placeholder="Descripción"
                mb="3"
                value={newProduct.description}
                onChange={handleChange}
              />
              <Input
                name="price"
                placeholder="Precio"
                type="number"
                mb="3"
                value={newProduct.price}
                onChange={handleChange}
              />
              <Input
                name="stock"
                placeholder="Cantidad en stock"
                type="number"
                mb="3"
                value={newProduct.stock}
                onChange={handleChange}
              />
              <Select
                name="proveedor"
                placeholder="Selecciona proveedor"
                mb="3"
                value={newProduct.proveedor}
                onChange={handleChange}
              >
                {/* Aquí Lima agregará los proveedores del backend */}
                <option value="proveedor1">Proveedor 1</option>
                <option value="proveedor2">Proveedor 2</option>
              </Select>
              <Select
                name="category"
                placeholder="Selecciona categoría"
                mb="3"
                value={newProduct.category}
                onChange={handleChange}
              >
                {/* Aquí Lima agregará las categorías del backend */}
                <option value="categoria1">Categoría 1</option>
                <option value="categoria2">Categoría 2</option>
              </Select>
              <Input
                name="image"
                type="file"
                accept="image/*"
                mb="3"
                onChange={handleChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={handleSaveProduct}>
                Guardar
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal: Editar Producto */}
        <Modal isOpen={isEditOpen} onClose={onEditClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Producto</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input 
                name="name" 
                placeholder="Nombre del producto" 
                mb="3" 
                value={newProduct.name} 
                onChange={handleChange} 
              />
              <Input
                name="description"
                placeholder="Descripción"
                mb="3"
                value={newProduct.description}
                onChange={handleChange}
              />
              <Input
                name="price"
                placeholder="Precio"
                type="number"
                mb="3"
                value={newProduct.price}
                onChange={handleChange}
              />
              <Input
                name="stock"
                placeholder="Cantidad en stock"
                type="number"
                mb="3"
                value={newProduct.stock}
                onChange={handleChange}
              />
              <Select
                name="proveedor"
                placeholder="Selecciona proveedor"
                mb="3"
                value={newProduct.proveedor}
                onChange={handleChange}
              >
                <option value="proveedor1">Proveedor 1</option>
                <option value="proveedor2">Proveedor 2</option>
              </Select>
              <Select
                name="category"
                placeholder="Selecciona categoría"
                mb="3"
                value={newProduct.category}
                onChange={handleChange}
              >
                <option value="categoria1">Categoría 1</option>
                <option value="categoria2">Categoría 2</option>
              </Select>
              <Input
                name="image"
                type="file"
                accept="image/*"
                mb="3"
                onChange={handleChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleEditProduct}>
                Actualizar
              </Button>
              <Button onClick={onEditClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal: Confirmar Eliminación */}
        <Modal isOpen={isDeleteOpen} onClose={cancelDelete}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmar Eliminación</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="lg" mb="4" color="red.600" fontWeight="semibold">
                ¿Estás seguro de eliminar este producto?
              </Text>
              <Text mb="4">
                El producto se eliminará automáticamente en {timer} segundos...
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={confirmDeleteProduct}>
                Sí, eliminar ahora
              </Button>
              <Button onClick={cancelDelete}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default InventoryPage;