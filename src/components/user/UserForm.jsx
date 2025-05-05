import { useEffect, useRef } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Button,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { GenericAlert } from "../GenericAlert";

const UserForm = ({ user, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      role: "USER_ROLE"
    }
  });
  

  const cancelRef = useRef();
  const {
    isOpen: isConfirmAlertOpen,
    onOpen: onConfirmAlertOpen,
    onClose: onConfirmAlertClose
  } = useDisclosure();

  useEffect(() => {
    if (user) reset(user);
  }, [user, reset]);

  const confirmEdit = () => {
    handleSubmit(onSubmit)();
    onConfirmAlertClose();
  };

  const onSubmit = (data) => {
    onSave(data);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (user) {
      onConfirmAlertOpen();
    } else {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <VStack spacing={4}>
          <FormControl isInvalid={errors.name}>
            <FormLabel>Nombre</FormLabel>
            <Input
              {...register("name", { required: "Este campo es requerido" })}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register("email", {
                required: "Este campo es requerido",
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "Email inválido"
                }
              })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.role}>
            <FormLabel>Rol</FormLabel>
            <Select
              {...register("role", {
                required: "Este campo es requerido"
              })}
            >
              <option value="ADMIN_ROLE">Administrador</option>
              <option value="USER_ROLE">Empleado</option>
            </Select>
            <FormErrorMessage>{errors.role?.message}</FormErrorMessage>
          </FormControl>

          <Button colorScheme="teal" type="submit">
            {user ? "Actualizar" : "Guardar"}
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
            ¿Está seguro que desea actualizar al usuario{" "}
            <strong>{getValues("name")}</strong>?
          </>
        }
        confirmButtonText="Actualizar"
        confirmButtonColor="teal"
      />
    </>
  );
};

export default UserForm;
