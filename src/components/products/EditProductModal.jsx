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
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const EditProductModal = ({ isOpen, product, onClose, handleEditProduct }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        category: product.category.name,
        stock: product.stock,
        supplier: product.proveedor.nombre,
        entryDate: product.entryDate,
        description: product.description,
      });
    }
  }, [product, reset]);

  const onSubmit = (data) => {
    handleEditProduct(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Editar Producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb="3">
            <FormLabel>Nombre del producto</FormLabel>
            <Input {...register("name", { required: true })} placeholder="Nombre del producto" />
            {errors.name && <span>Este campo es obligatorio</span>}
          </FormControl>

          <FormControl mb="3">
            <FormLabel>Categoría</FormLabel>
            <Input {...register("category", { required: true })} placeholder="Categoría" />
            {errors.category && <span>Este campo es obligatorio</span>}
          </FormControl>

          <FormControl mb="3">
            <FormLabel>Cantidad en stock</FormLabel>
            <Input type="number" {...register("stock", { required: true })} placeholder="Stock" />
            {errors.stock && <span>Este campo es obligatorio</span>}
          </FormControl>

          <FormControl mb="3">
            <FormLabel>Proveedor</FormLabel>
            <Input {...register("supplier", { required: true })} placeholder="Proveedor" />
            {errors.supplier && <span>Este campo es obligatorio</span>}
          </FormControl>

          <FormControl mb="3">
            <FormLabel>Fecha de entrada</FormLabel>
            <Input type="date" {...register("entryDate", { required: true })} />
            {errors.entryDate && <span>Este campo es obligatorio</span>}
          </FormControl>

          <FormControl mb="3">
            <FormLabel>Descripción</FormLabel>
            <Input {...register("description")} placeholder="Descripción" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} type="submit">
            Actualizar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
