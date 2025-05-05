import { useEffect, useRef, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useDisclosure,
  Box,
  List,
  ListItem,
  InputGroup,
  InputRightElement,
  IconButton,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { GenericAlert } from "../GenericAlert";
import { CloseIcon } from "@chakra-ui/icons";

const MovementForm = ({ onSave, movement, products, defaultType }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    watch,
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
    mode: "onBlur", // Validate on blur for better user experience
  });

  const [productSearch, setProductSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const cancelRef = useRef();
  const {
    isOpen: isConfirmAlertOpen,
    onOpen: onConfirmAlertOpen,
    onClose: onConfirmAlertClose,
  } = useDisclosure();

  // Watch the type field to update validations accordingly
  const type = watch("type") || defaultType;

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

  const confirmEdit = (data) => {
    onConfirmAlertClose();
    onSave(data, data.type);
  };

  const onSubmit = (data) => {
    onSave(data, data.type);
  };

  const handleFormSubmit = (data) => {
    if (movement) {
      onConfirmAlertOpen();
    } else {
      onSubmit(data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={!!errors.product || !!errors.productName} position="relative">
            <FormLabel>Producto <Text as="span" color="red.500">*</Text></FormLabel>
            <InputGroup>
              <Input
                placeholder="Buscar producto"
                value={productSearch}
                onChange={(e) => {
                  setProductSearch(e.target.value);
                  setShowSuggestions(true);
                  setValue("productName", e.target.value);
                  setValue("product", "");
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                {...register("productName", { 
                  required: "Nombre del producto es requerido"
                })}
              />
              {productSearch && (
                <InputRightElement>
                  <IconButton
                    aria-label="Limpiar selección"
                    icon={<CloseIcon />}
                    size="sm"
                    onClick={() => {
                      setProductSearch("");
                      setValue("productName", "");
                      setValue("product", "");
                    }}
                  />
                </InputRightElement>
              )}
            </InputGroup>

            <Input 
              type="hidden" 
              {...register("product", { 
                required: "Debe seleccionar un producto válido de la lista"
              })} 
            />

            {showSuggestions && filteredProducts?.length > 0 && (
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
                        setValue("productName", product.name, { shouldValidate: true });
                        setValue("product", product.uid, { shouldValidate: true });
                        setShowSuggestions(false);
                      }}
                    >
                      {product.name} — {product.description}
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {!showSuggestions && productSearch && !getValues("product") && (
              <FormErrorMessage>Por favor seleccione un producto de la lista</FormErrorMessage>
            )}
            {errors.product && <FormErrorMessage>{errors.product.message}</FormErrorMessage>}
            {errors.productName && <FormErrorMessage>{errors.productName.message}</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={!!errors.quantity}>
            <FormLabel>
              {type === "Salida" ? "Cantidad Removida" : "Cantidad Añadida"} <Text as="span" color="red.500">*</Text>
            </FormLabel>
            <Input
              type="number"
              {...register("quantity", { 
                required: "La cantidad es requerida",
                validate: {
                  positive: value => parseFloat(value) > 0 || "La cantidad debe ser mayor que cero",
                  number: value => !isNaN(parseFloat(value)) || "Ingrese un número válido"
                }
              })}
            />
            {errors.quantity && <FormErrorMessage>{errors.quantity.message}</FormErrorMessage>}
          </FormControl>

          {type === "Salida" && (
            <>
              <FormControl isInvalid={!!errors.reason}>
                <FormLabel>Razón <Text as="span" color="red.500">*</Text></FormLabel>
                <Input
                  placeholder="Motivo de salida"
                  {...register("reason", { 
                    required: "La razón de salida es requerida",
                    minLength: { value: 3, message: "La razón debe tener al menos 3 caracteres" }
                  })}
                />
                {errors.reason && <FormErrorMessage>{errors.reason.message}</FormErrorMessage>}
              </FormControl>

              <FormControl isInvalid={!!errors.destination}>
                <FormLabel>Destino <Text as="span" color="red.500">*</Text></FormLabel>
                <Input
                  placeholder="Destino del producto"
                  {...register("destination", {
                    required: "El destino es requerido",
                    minLength: { value: 3, message: "El destino debe tener al menos 3 caracteres" }
                  })}
                />
                {errors.destination && <FormErrorMessage>{errors.destination.message}</FormErrorMessage>}
              </FormControl>
            </>
          )}

          <Button 
            colorScheme="teal" 
            type="submit" 
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {movement ? "Actualizar" : "Guardar"}
          </Button>
        </VStack>
      </form>

      <GenericAlert
        isOpen={isConfirmAlertOpen}
        onClose={onConfirmAlertClose}
        cancelRef={cancelRef}
        onConfirm={() => handleSubmit(confirmEdit)()}
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