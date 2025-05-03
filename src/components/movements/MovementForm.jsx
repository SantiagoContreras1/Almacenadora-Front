import { useEffect, useRef, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useDisclosure,
  Text,
  Box,
  List,
  ListItem
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { GenericAlert } from "../GenericAlert";

const MovementForm = ({ onSave, movement, products, defaultType }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      productName: "",
      product: "", 
      quantity: "",
      reason: "",
      destination: "",
      date: Date.now,
      type: defaultType,
    },
  });

  const [productSearch, setProductSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const cancelRef = useRef();
  const {
    isOpen: isConfirmAlertOpen,
    onOpen: onConfirmAlertOpen,
    onClose: onConfirmAlertClose,
  } = useDisclosure();

  useEffect(() => {
    if (movement) {
      reset(movement);
      setProductSearch(movement.productName || "");
    } else if (defaultType) {
      setValue("type", defaultType);
    }
  }, [movement, defaultType, reset, setValue]);

  const filteredProducts = products?.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  const confirmEdit = () => {
    const data = getValues();
    onSave(data, data.type);
    onConfirmAlertClose();
  };

  const onSubmit = (data) => {
    onSave(data, data.type);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (movement) {
      onConfirmAlertOpen();
    } else {
      handleSubmit(onSubmit)();
    }
  };

  const type = getValues("type") || defaultType;

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={errors.productName} position="relative">
            <FormLabel>Producto</FormLabel>
            <Input
              placeholder="Buscar producto"
              value={productSearch}
              onChange={(e) => {
                setProductSearch(e.target.value);
                setShowSuggestions(true);
                setValue("productName", e.target.value);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              {...register("productName")} 
            />
           
            <Input type="hidden" {...register("product")} />
            
            {showSuggestions && filteredProducts.length > 0 && (
              <Box
                position="absolute"
                zIndex={10}
                bg="white"
                w="100%"
                maxH="150px"
                overflowY="auto"
                border="1px solid #ccc"
                borderRadius="md"
                mt={1}
              >
                <List spacing={0}>
                  {filteredProducts.map((product) => (
                    <ListItem
                      key={product.uid}
                      px={3}
                      py={2}
                      _hover={{ bg: "gray.100", cursor: "pointer" }}
                      onClick={() => {
                        setProductSearch(product.name);
                        setValue("productName", product.name);
                        setValue("product", product.uid);
                        setShowSuggestions(false);
                      }}
                    >
                      {product.name} — {product.description}
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </FormControl>

          <FormControl isInvalid={errors.quantity}>
            <FormLabel>
              {type === "Salida" ? "Cantidad Removida" : "Cantidad Añadida"}
            </FormLabel>
            <Input
              type="number"
              {...register("quantity", { required: "Este campo es requerido" })}
            />
          </FormControl>

          {type === "Salida" && (
            <>
              <FormControl isInvalid={errors.reason}>
                <FormLabel>Razón</FormLabel>
                <Input
                  placeholder="Motivo de salida"
                  {...register("reason", { required: "Este campo es requerido" })}
                />
              </FormControl>

              <FormControl isInvalid={errors.destination}>
                <FormLabel>Destino</FormLabel>
                <Input
                  placeholder="Destino del producto"
                  {...register("destination", {
                    required: "Este campo es requerido",
                  })}
                />
              </FormControl>
            </>
          )}

          <Button colorScheme="teal" type="submit">
            {movement ? "Actualizar" : "Guardar"}
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
            ¿Está seguro que desea actualizar el movimiento de{" "}
            <strong>{getValues("productName")}</strong>?
          </>
        }
        confirmButtonText="Actualizar"
        confirmButtonColor="teal"
      />
    </>
  );
};

export default MovementForm;