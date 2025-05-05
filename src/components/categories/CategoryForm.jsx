import { useEffect, useRef } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { GenericAlert } from "../GenericAlert";

const CategoryForm = ({ onSave, category }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
    getValues,
  } = useForm();

  const {
    isOpen: isConfirmAlertOpen,
    onOpen: onConfirmAlertOpen,
    onClose: onConfirmAlertClose,
  } = useDisclosure();

  const cancelRef = useRef();

  useEffect(() => {
    if (category) {
      reset(category);
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [category, reset]);

  const onSubmit = async (values) => {
    await onSave(values);
    reset();
  };

  const confirmEdit = () => {
    const data = getValues();
    onSave(data);
    onConfirmAlertClose();
    reset();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (category) {
      onConfirmAlertOpen();
    } else {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <Box as="form" onSubmit={handleFormSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Nombre</FormLabel>
            <Input
              placeholder="Nombre de la Categoría"
              {...register("name", { required: true })}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Descripción</FormLabel>
            <Input
              placeholder="Descripción"
              {...register("description")}
            />
          </FormControl>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            {category ? "Actualizar" : "Guardar"}
          </Button>
        </Stack>
      </Box>

      <GenericAlert
        isOpen={isConfirmAlertOpen}
        onClose={onConfirmAlertClose}
        cancelRef={cancelRef}
        onConfirm={confirmEdit}
        title="Confirmar Cambios"
        description={
          <>
            ¿Está seguro que desea actualizar la categoría{" "}
            <strong>{getValues("name")}</strong>?
          </>
        }
        confirmButtonText="Actualizar"
        confirmButtonColor="teal"
      />
    </>
  );
};

export default CategoryForm;
