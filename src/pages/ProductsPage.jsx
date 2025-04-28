import { useState } from "react";
import {
  Box,
  SimpleGrid,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Card,
  CardBody,
  CardHeader,
  Image,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { SideBar } from "../components/dashboard/SideBar";
import { TopBar } from "../components/dashboard/TopBar";

const ProductsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isMovementOpen,
    onOpen: onMovementOpen,
    onClose: onMovementClose,
  } = useDisclosure();
  const toast = useToast();

  const [products, setProducts] = useState([]);
  const [searchTerm] = useState("");

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    stock: "",
    supplier: "",
    entryDate: "",
    description: "",
    image: null,
    movements: [],
  });

  const [currentProductIndex, setCurrentProductIndex] = useState(null);
  const [movementData, setMovementData] = useState({
    type: "entrada",
    quantity: "",
    employee: "",
    reason: "",
    destination: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewProduct({ ...newProduct, image: URL.createObjectURL(files[0]) });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleSaveProduct = () => {
    // Aquí Lima une el backend para guardar el producto

    setProducts([...products, newProduct]);
    setNewProduct({
      name: "",
      category: "",
      stock: "",
      supplier: "",
      entryDate: "",
      description: "",
      image: null,
      movements: [],
    });
    onClose();
  };

  const handleEditProduct = () => {
    const updatedProducts = [...products];
    updatedProducts[currentProductIndex] = newProduct;

    // Aquí Lima une el backend para actualizar el producto

    setProducts(updatedProducts);
    setNewProduct({
      name: "",
      category: "",
      stock: "",
      supplier: "",
      entryDate: "",
      description: "",
      image: null,
      movements: [],
    });
    setCurrentProductIndex(null);
    onEditClose();
  };

  const handleOpenEdit = (index) => {
    setCurrentProductIndex(index);
    setNewProduct(products[index]);
    onEditOpen();
  };

  const handleOpenMovement = (index) => {
    setCurrentProductIndex(index);
    onMovementOpen();
  };

  const handleSaveMovement = () => {
    const updatedProducts = [...products];
    const product = updatedProducts[currentProductIndex];

    const movement = {
      ...movementData,
      date: new Date().toISOString(),
    };

    if (movementData.type === "entrada") {
      product.stock = Number(product.stock) + Number(movementData.quantity);
    } else {
      product.stock = Number(product.stock) - Number(movementData.quantity);
    }

    product.movements.push(movement);

    // Aquí Lima une el backend para registrar el movimiento

    setProducts(updatedProducts);
    setMovementData({
      type: "entrada",
      quantity: "",
      employee: "",
      reason: "",
      destination: "",
    });
    setCurrentProductIndex(null);
    onMovementClose();
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
          <Button colorScheme="teal" onClick={onOpen}>
            Registrar Producto
          </Button>
        </Box>

        <SimpleGrid columns={[1, 2, 3]} spacing={5}>
          {filteredProducts.map((product, index) => (
            <Card key={index} boxShadow="md" _hover={{ boxShadow: "xl" }}>
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  borderTopRadius="md"
                />
              ) : (
                <Image borderTopRadius="md" />
              )}
              <CardBody>
                <Heading size="md" mb="2">
                  {product.name}
                </Heading>
                <Text>Categoría: {product.category}</Text>
                <Text>Stock: {product.stock}</Text>
                <Text>Proveedor: {product.supplier}</Text>
                <Text>Fecha Entrada: {product.entryDate}</Text>
                <Text mb="2">Descripción: {product.description}</Text>{" "}
                {/* Descripción mostrada */}
                <Box mt="4" display="flex" flexWrap="wrap" gap="2">
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handleOpenEdit(index)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDeleteProduct(index)}
                  >
                    Eliminar
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="purple"
                    onClick={() => handleOpenMovement(index)}
                  >
                    Movimientos
                  </Button>
                </Box>
                {/* Historial de Movimientos */}
                {product.movements.length > 0 && (
                  <Box mt="4">
                    <Heading size="xs" mb="1">
                      Historial:
                    </Heading>
                    {product.movements.map((m, idx) => (
                      <Text key={idx} fontSize="xs">
                        {m.type} - {m.quantity} unidades -{" "}
                        {new Date(m.date).toLocaleDateString()} por {m.employee}
                      </Text>
                    ))}
                  </Box>
                )}
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        {/* Modal: Registrar Nuevo Producto */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Registrar Nuevo Producto</ModalHeader>
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
                name="category"
                placeholder="Categoría"
                mb="3"
                value={newProduct.category}
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
              <Input
                name="supplier"
                placeholder="Proveedor"
                mb="3"
                value={newProduct.supplier}
                onChange={handleChange}
              />
              <Input
                name="entryDate"
                placeholder="Fecha de entrada"
                type="date"
                mb="3"
                value={newProduct.entryDate}
                onChange={handleChange}
              />
              <Input
                name="description"
                placeholder="Descripción del producto"
                mb="3"
                value={newProduct.description}
                onChange={handleChange}
              />
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
        <Modal isOpen={isEditOpen} onClose={onEditClose}>
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
                name="category"
                placeholder="Categoría"
                mb="3"
                value={newProduct.category}
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
              <Input
                name="supplier"
                placeholder="Proveedor"
                mb="3"
                value={newProduct.supplier}
                onChange={handleChange}
              />
              <Input
                name="entryDate"
                placeholder="Fecha de entrada"
                type="date"
                mb="3"
                value={newProduct.entryDate}
                onChange={handleChange}
              />
              <Input
                name="description"
                placeholder="Descripción del producto"
                mb="3"
                value={newProduct.description}
                onChange={handleChange}
              />
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

        {/* Modal: Registrar Movimiento */}
        <Modal isOpen={isMovementOpen} onClose={onMovementClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Registrar Movimiento</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                as="select"
                name="type"
                mb="3"
                value={movementData.type}
                onChange={(e) =>
                  setMovementData({ ...movementData, type: e.target.value })
                }
              >
                <option value="entrada">Entrada</option>
                <option value="salida">Salida</option>
              </Input>
              <Input
                name="quantity"
                placeholder="Cantidad"
                type="number"
                mb="3"
                value={movementData.quantity}
                onChange={(e) =>
                  setMovementData({ ...movementData, quantity: e.target.value })
                }
              />
              <Input
                name="employee"
                placeholder="Empleado encargado"
                mb="3"
                value={movementData.employee}
                onChange={(e) =>
                  setMovementData({ ...movementData, employee: e.target.value })
                }
              />
              {movementData.type === "salida" && (
                <>
                  <Input
                    name="reason"
                    placeholder="Motivo de salida"
                    mb="3"
                    value={movementData.reason}
                    onChange={(e) =>
                      setMovementData({
                        ...movementData,
                        reason: e.target.value,
                      })
                    }
                  />
                  <Input
                    name="destination"
                    placeholder="Destino"
                    mb="3"
                    value={movementData.destination}
                    onChange={(e) =>
                      setMovementData({
                        ...movementData,
                        destination: e.target.value,
                      })
                    }
                  />
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="purple" mr={3} onClick={handleSaveMovement}>
                Guardar Movimiento
              </Button>
              <Button onClick={onMovementClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default ProductsPage;
