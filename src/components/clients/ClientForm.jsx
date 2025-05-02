import { useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const ClientForm = ({ onSave, client }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    if (client) {
      reset(client);
    } else {
      reset({
        tipo: "",
        nombre: "",
        telefono: "",
        email: "",
        direccion: "",
      });
    }
  }, [client, reset]);

  const onSubmit = async (values) => {
    await onSave(values);
    reset();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Tipo</FormLabel>
          <Select placeholder="Selecciona tipo" {...register("tipo", { required: true })}>
            <option value="individual">Individual</option>
            <option value="empresa">Empresa</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Nombre</FormLabel>
          <Input placeholder="Nombre completo o razón social" {...register("nombre", { required: true })} />
        </FormControl>

        <FormControl>
          <FormLabel>Teléfono</FormLabel>
          <Input type="tel" placeholder="123456789" {...register("telefono")} />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="correo@ejemplo.com" {...register("email")} />
        </FormControl>

        <FormControl>
          <FormLabel>Dirección</FormLabel>
          <Input placeholder="Dirección del cliente" {...register("direccion")} />
        </FormControl>

        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          {client ? "Actualizar" : "Guardar"}
        </Button>
      </Stack>
    </Box>
  );
};

export default ClientForm;
