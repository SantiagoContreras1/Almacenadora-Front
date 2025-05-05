import { useEffect, useRef } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Select,
  FormErrorMessage,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { GenericAlert } from "../GenericAlert";

const ClientForm = ({ onSave, client }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm({ mode: "onBlur" });

  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    if (client) {
      reset(client);
    } else {
      reset({ tipo: "", nombre: "", telefono: "", email: "", direccion: "" });
    }
  }, [client, reset]);

  const onSubmit = async (values) => {
    await onSave(values);
    if (!client) reset();
  };

  const confirmEdit = () => {
    const data = getValues();
    onSave(data);
    onConfirmClose();
    reset();
  };

  const handleFormSubmit = (data) => {
    if (client) onConfirmOpen();
    else onSubmit(data);
  };

  return (
    <>
      <Box as="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={4}>
          <FormControl isRequired isInvalid={!!errors.tipo}>
            <FormLabel>
              Tipo{" "}
              <Text as="span" color="red.500">
                *
              </Text>
            </FormLabel>
            <Select
              placeholder="Selecciona tipo"
              {...register("tipo", {
                required: "El tipo de cliente es requerido",
              })}
            >
              <option value="individual">Individual</option>
              <option value="empresa">Empresa</option>
            </Select>
            {errors.tipo && (
              <FormErrorMessage>{errors.tipo.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.nombre}>
            <FormLabel>
              Nombre{" "}
              <Text as="span" color="red.500">
                *
              </Text>
            </FormLabel>
            <Input
              placeholder="Nombre completo o razón social"
              {...register("nombre", {
                required: "El nombre es requerido",
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menos 3 caracteres",
                },
              })}
            />
            {errors.nombre && (
              <FormErrorMessage>{errors.nombre.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.telefono}>
            <FormLabel>Teléfono</FormLabel>
            <Input
              type="tel"
              placeholder="123456789"
              {...register("telefono", {
                required: "El teléfono es requerido",
              })}
            />
            {errors.telefono && (
              <FormErrorMessage>{errors.telefono.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="correo@ejemplo.com"
              {...register("email", {
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "Email inválido",
                },
              })}
            />
            {errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.direccion}>
            <FormLabel>Dirección</FormLabel>
            <Input
              placeholder="Dirección del cliente"
              {...register("direccion", { required: "Dirección es requerida" })}
            />
            {errors.direccion && (
              <FormErrorMessage>{errors.direccion.message}</FormErrorMessage>
            )}
          </FormControl>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
            disabled={isSubmitting}
          >
            {client ? "Actualizar" : "Guardar"}
          </Button>
        </Stack>
      </Box>

      <GenericAlert
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        cancelRef={cancelRef}
        onConfirm={confirmEdit}
        title="Confirmar Actualización"
        description={
          <>
            ¿Está seguro que desea actualizar la información de{" "}
            <strong>{getValues("nombre")}</strong>?
          </>
        }
        confirmButtonText="Actualizar"
        confirmButtonColor="teal"
      />
    </>
  );
};

export default ClientForm;
