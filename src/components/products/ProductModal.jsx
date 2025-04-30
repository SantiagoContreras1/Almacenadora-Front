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
  Select,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSuppliers } from "../../shared/hooks/useSuppliers";

export const ProductModal = ({
  isOpen,
  onClose,
  onSave,
  isEdit = false,
  product = null,
  categories
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [suppliers, setSuppliers] = useState([]);
  const { getSuppliers } = useSuppliers();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const supData = await getSuppliers();
      setSuppliers(supData || []);
    };

    if (isOpen) {
      fetchData();

      const formatDate = (dateString) => {
        if (!dateString) return "";
        try {
          const date = new Date(dateString);
          return date.toISOString().split("T")[0];
        } catch (e) {
          console.error("Error formateando fecha:", e);
          return "";
        }
      };

      
      if (product) {
        reset({
          name: product.name || "",
          category: product.category?._id || "",
          image: product.image || "",
          stock: product.stock || 0,
          proveedor: product.proveedor?._id || "",
          entryDate: formatDate(product.entrada),
          description: product.description || "",
          price: product.price || 0,
        });
        console.log(product);
      } else {
        reset({
          name: "",
          category: "",
          image: "",
          stock: 0,
          proveedor: "",
          entryDate: "",
          description: "",
          price: 0,
        });
      }
    }
  }, [isOpen]);

  
  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    onSave(data);
    toast({
      title: isEdit ? "Producto actualizado" : "Producto registrado",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEdit ? "Editar Producto" : "Registrar Producto"}
        </ModalHeader>
        <ModalCloseButton onClick={handleClose} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl mb="3" isInvalid={errors.name}>
              <FormLabel>Nombre del producto</FormLabel>
              <Input
                {...register("name", { required: true })}
                placeholder="Nombre del producto"
              />
            </FormControl>

            <FormControl mb="3" isInvalid={errors.image}>
              <FormLabel>URL de la imagen</FormLabel>
              <Input
                {...register("image", { required: true })}
                placeholder="URL de la imagen"
              />
            </FormControl>

            <FormControl mb="3" isInvalid={errors.category}>
              <FormLabel>Categoría</FormLabel>
              <Select
                {...register("category", { required: true })}
                placeholder="Seleccione una categoría"
              >
                {categories.map((cat) => (
                  <option key={cat.uid} value={String(cat.uid)}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mb="3" isInvalid={errors.stock}>
              <FormLabel>Cantidad en stock</FormLabel>
              <Input
                type="number"
                {...register("stock", { required: true })}
                placeholder="Stock"
              />
            </FormControl>

            <FormControl mb="3" isInvalid={errors.price}>
              <FormLabel>Precio</FormLabel>
              <Input
                type="number"
                step="0.01"
                {...register("price", { required: true })}
                placeholder="Precio"
              />
            </FormControl>

            <FormControl mb="3" isInvalid={errors.proveedor}>
              <FormLabel>Proveedor</FormLabel>
              <Select
                {...register("proveedor", { required: true })}
                placeholder="Seleccione un proveedor"
              >
                {suppliers.map((sup) => (
                  <option key={sup.uid} value={String(sup.uid)}>
                    {sup.nombre}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mb="3" isInvalid={errors.entryDate}>
              <FormLabel>Fecha de entrada</FormLabel>
              <Input
                type="date"
                {...register("entryDate", { required: true })}
              />
            </FormControl>

            <FormControl mb="3">
              <FormLabel>Descripción</FormLabel>
              <Input
                {...register("description")}
                placeholder="Descripción del producto"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} type="submit">
              {isEdit ? "Actualizar" : "Guardar"}
            </Button>
            <Button onClick={handleClose}>Cancelar</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
