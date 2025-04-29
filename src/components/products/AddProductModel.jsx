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

export const AddProductModal = ({ isOpen, onClose }) => {
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
          />
          <Input
            name="category"
            placeholder="Categoría"
            mb="3"
          />
          <Input
            name="stock"
            placeholder="Cantidad en stock"
            type="number"
            mb="3"
          />
          <Input
            name="supplier"
            placeholder="Proveedor"
            mb="3"
          />
          <Input
            name="entryDate"
            placeholder="Fecha de entrada"
            type="date"
            mb="3"
          />
          <Input
            name="description"
            placeholder="Descripción del producto"
            mb="3"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3}>
            Guardar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

