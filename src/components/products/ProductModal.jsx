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
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { useSuppliers } from "../../shared/hooks/useSuppliers";
import { GenericAlert } from "../GenericAlert";

export const ProductModal = ({
  isOpen,
  onClose,
  onSave,
  isEdit = false,
  product = null,
  categories,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  const [suppliers, setSuppliers] = useState([]);
  const { getSuppliers } = useSuppliers();
  const toast = useToast();
  const cancelRef = useRef();

  const {
    isOpen: isConfirmAlertOpen,
    onOpen: onConfirmAlertOpen,
    onClose: onConfirmAlertClose,
  } = useDisclosure();

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

      console.log(product)
      if (product) {
        reset({
          name: product.name || "",
          category: product.category?._id || "",
          image: product.image || "",
          stock: product.stock || 0,
          proveedor: product.proveedor?._id || "",
          entrada: formatDate(product.entrada),
          vencimiento: formatDate(product.vencimiento),
          description: product.description || "",
          price: product.price || 0,
        });
      } else {
        reset({
          name: "",
          category: "",
          image: "",
          stock: 0,
          proveedor: "",
          entrada: "",
          vencimiento: "",
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

  
  const handleFormSubmit = (event) => {
    event.preventDefault();

    
    if (isEdit) {
      onConfirmAlertOpen();
    } else {
      handleSubmit(onSubmit)();
    }
  };

  
  const confirmEdit = () => {
    handleSubmit(onSubmit)();
    onConfirmAlertClose();
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
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEdit ? "Editar Producto" : "Registrar Producto"}
          </ModalHeader>
          <ModalCloseButton onClick={handleClose} />
          <form onSubmit={handleFormSubmit}>
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
                  {...register("entrada", { required: true })}
                />
              </FormControl>

              <FormControl mb="3" isInvalid={errors.expiration}>
                <FormLabel>Fecha de Vencimiento</FormLabel>
                <Input
                  type="date"
                  {...register("vencimiento", { required: true })}
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

      
      <GenericAlert
        isOpen={isConfirmAlertOpen}
        onClose={onConfirmAlertClose}
        cancelRef={cancelRef}
        onConfirm={confirmEdit}
        title="Confirmar Cambios"
        description={
          <>
            ¿Está seguro que desea actualizar el producto{" "}
            <strong>{getValues("name")}</strong>?
          </>
        }
        confirmButtonText="Actualizar"
        confirmButtonColor="teal"
      />
    </>
  );
};
