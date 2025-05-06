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
  FormErrorMessage,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { useSuppliers } from "../../shared/hooks/useSuppliers";
import { GenericAlert } from "../GenericAlert";
import { isValid } from "date-fns";

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
    watch,
    trigger
  } = useForm({mode: "onChange"});

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const isValid = await trigger();
    if (!isValid) return; 
  
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
    const payload = {
      ...data,
      stock: Number(data.stock),
      price: Number(data.price),
    };

    onSave(payload);
    toast({
      title: isEdit ? "Producto actualizado" : "Producto registrado",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    handleClose();
  };

  const entrada = watch("entrada");
  const vencimiento = watch("vencimiento");

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
                  {...register("name", {
                    required: "Este campo es requerido",
                    minLength: {
                      value: 3,
                      message: "Debe tener al menos 3 caracteres",
                    },
                    maxLength: {
                      value: 50,
                      message: "No puede exceder los 50 caracteres",
                    },
                  })}
                  placeholder="Nombre del producto"
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>

              <FormControl mb="3" isInvalid={errors.image}>
                <FormLabel>URL de la imagen</FormLabel>
                <Input
                  {...register("image",)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
                <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
              </FormControl>

              <FormControl mb="3" isInvalid={errors.category}>
                <FormLabel>Categoría</FormLabel>
                <Select
                  {...register("category", {
                    required: "Debe seleccionar una categoría",
                  })}
                  placeholder="Seleccione una categoría"
                >
                  {categories.map((cat) => (
                    <option key={cat.uid} value={String(cat.uid)}>
                      {cat.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
              </FormControl>

              <FormControl mb="3" isInvalid={errors.stock}>
                <FormLabel>Cantidad en stock</FormLabel>
                <Input
                  type="number"
                  {...register("stock", {
                    required: "Este campo es requerido",
                    min: {
                      value: 0,
                      message: "Debe ser mayor o igual a 0",
                    },
                  })}
                  placeholder="Stock"
                />
                <FormErrorMessage>{errors.stock?.message}</FormErrorMessage>
              </FormControl>

              <FormControl mb="3" isInvalid={errors.price}>
                <FormLabel>Precio</FormLabel>
                <Input
                  type="number"
                  step="0.01"
                  {...register("price", {
                    required: "Este campo es requerido",
                    min: {
                      value: 0,
                      message: "Debe ser mayor o igual a 0",
                    },
                  })}
                  placeholder="Precio"
                />
                <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
              </FormControl>

              <FormControl mb="3" isInvalid={errors.proveedor}>
                <FormLabel>Proveedor</FormLabel>
                <Select
                  {...register("proveedor", {
                    required: "Debe seleccionar un proveedor",
                  })}
                  placeholder="Seleccione un proveedor"
                >
                  {suppliers.map((sup) => (
                    <option key={sup.uid} value={String(sup.uid)}>
                      {sup.nombre}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.proveedor?.message}</FormErrorMessage>
              </FormControl>

              <FormControl mb="3" isInvalid={errors.entrada}>
                <FormLabel>Fecha de entrada</FormLabel>
                <Input
                  type="date"
                  {...register("entrada", {
                    required: "La fecha de entrada es obligatoria",
                  })}
                />
                <FormErrorMessage>{errors.entrada?.message}</FormErrorMessage>
              </FormControl>

              <FormControl mb="3" isInvalid={errors.vencimiento}>
                <FormLabel>Fecha de vencimiento</FormLabel>
                <Input
                  type="date"
                  {...register("vencimiento", {
                    validate: (value) => {
                      if (value && entrada && value < entrada) {
                        return "La fecha de vencimiento debe ser posterior a la de entrada";
                      }
                      return true;
                    },
                  })}
                />
                <FormErrorMessage>{errors.vencimiento?.message}</FormErrorMessage>
              </FormControl>

              <FormControl mb="3" isInvalid={errors.description}>
                <FormLabel>Descripción</FormLabel>
                <Input
                  {...register("description", {
                    required: "la descripción es obligatoria",
                  })}
                  placeholder="Descripción del producto"
                />
                <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="teal" mr={3} type="submit" isDisabled={isValid}>
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
