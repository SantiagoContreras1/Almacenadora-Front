import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";

export const AddProductModal = ({ isOpen, onClose, newProduct, setNewProduct, handleSaveProduct }) => {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewProduct({ ...newProduct, image: URL.createObjectURL(files[0]) });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  return (
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
  );
};

