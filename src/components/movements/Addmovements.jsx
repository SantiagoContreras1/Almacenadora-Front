// AddMovements.jsx
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Select,
  useToast,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";

const AddMovements = () => {
  const [producto, setProducto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fecha, setFecha] = useState("");
  const [empleado, setEmpleado] = useState("");
  const toast = useToast();

  const commonInputProps = {
    bg: "gray.50",
    _hover: { bg: "gray.100" },
    _focus: { borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!producto || !categoria || !cantidad || !fecha || !empleado) {
      toast({
        title: "Error",
        description: "Por favor, llena todos los campos.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const movimiento = {
      producto,
      categoria,
      cantidad: parseInt(cantidad),
      fecha,
      empleado,
    };

    console.log("Datos enviados (quemados):", movimiento);

    setProducto("");
    setCategoria("");
    setCantidad("");
    setFecha("");
    setEmpleado("");

    toast({
      title: "Movimiento registrado",
      description: "Los datos han sido simulados y mostrados en consola.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      my={10}
      p={6}
      borderRadius="md"
      boxShadow="lg"
      bg="white"
      borderWidth={1}
    >
      <Heading as="h3" size="lg" textAlign="center" mb={6}>
        Registrar Movimiento
      </Heading>
      <Divider mb={6} />
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Nombre del Producto</FormLabel>
            <Input
              {...commonInputProps}
              type="text"
              value={producto}
              onChange={(e) => setProducto(e.target.value)}
              placeholder="Ej: Laptop Dell"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Categoría</FormLabel>
            <Select
              {...commonInputProps}
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              placeholder="Selecciona categoría"
            >
              <option value="electrónica">Electrónica</option>
              <option value="ropa">Ropa</option>
              <option value="alimentos">Alimentos</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Cantidad</FormLabel>
            <Input
              {...commonInputProps}
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              placeholder="Ej: 10"
              min={1}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Fecha del Movimiento</FormLabel>
            <Input
              {...commonInputProps}
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Empleado Responsable</FormLabel>
            <Input
              {...commonInputProps}
              type="text"
              value={empleado}
              onChange={(e) => setEmpleado(e.target.value)}
              placeholder="Ej: Juan Pérez"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            _hover={{ bg: "teal.500" }}
            _active={{ bg: "teal.600" }}
            size="lg"
            mt={4}
          >
            Registrar Movimiento
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddMovements;
