import { useEffect, useRef } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { GenericAlert } from "../GenericAlert";

const SupplierForm = ({ onSave, supplier }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      nombre: "",
      contacto: "",
      email: "",
      telefono: "",
      direccion: "",
      categoria: "",
    },
  });

  const cancelRef = useRef();
  const {
    isOpen: isConfirmAlertOpen,
    onOpen: onConfirmAlertOpen,
    onClose: onConfirmAlertClose,
  } = useDisclosure();

  useEffect(() => {
    if (supplier) {
      reset(supplier);
    }
  }, [supplier, reset]);

  const confirmEdit = () => {
    handleSubmit(onSubmit)();
    onConfirmAlertClose();
  };

  const onSubmit = (data) => {
    onSave(data);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    if (supplier) {
      onConfirmAlertOpen();
    } else {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <VStack spacing={4}>
          <FormControl isInvalid={errors.nombre}>
            <FormLabel>Nombre</FormLabel>
            <Input
              {...register("nombre", { required: "Este campo es requerido" })}
            />
          </FormControl>

          <FormControl isInvalid={errors.contacto}>
            <FormLabel>Contacto</FormLabel>
            <Input
              {...register("contacto", { required: "Este campo es requerido" })}
            />
          </FormControl>

          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register("email", {
                required: "Este campo es requerido",
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "Email inválido",
                },
              })}
            />
          </FormControl>

          <FormControl isInvalid={errors.telefono}>
            <FormLabel>Teléfono</FormLabel>
            <Input
              {...register("telefono", { required: "Este campo es requerido" })}
            />
          </FormControl>

          <FormControl isInvalid={errors.direccion}>
            <FormLabel>Dirección</FormLabel>
            <Input
              {...register("direccion", { required: "Este campo es requerido" })}
            />
          </FormControl>

          <Button colorScheme="teal" type="submit">
            {supplier ? "Actualizar" : "Guardar"}
          </Button>
        </VStack>
      </form>
      
      <GenericAlert
        isOpen={isConfirmAlertOpen}
        onClose={onConfirmAlertClose}
        cancelRef={cancelRef}
        onConfirm={confirmEdit}
        title="Confirmar Cambios"
        description={
          <>
            ¿Está seguro que desea actualizar el proveedor{" "}
            <strong>{getValues("nombre")}</strong>?
          </>
        }
        confirmButtonText="Actualizar"
        confirmButtonColor="teal"
      />
    </>
  );
};

export default SupplierForm;
