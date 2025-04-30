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

const DeleteMovements = () => {
  const [producto, setProducto] = useState("Laptop Dell");
  const [categoria, setCategoria] = useState("Electrónica");
  const [cantidad, setCantidad] = useState("10");
  const [fecha, setFecha] = useState("2025-04-30");
  const [empleado, setEmpleado] = useState("Juan Pérez");
  const [razon, setRazon] = useState("Daño irreparable");
  const [destino, setDestino] = useState("Descarte");
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    const movimientoEliminado = {
      producto,
      categoria,
      cantidad: parseInt(cantidad),
      fecha,
      empleado,
      razon,
      destino,
    };

    console.log("Datos de eliminación:", movimientoEliminado);

    toast({
      title: "Movimiento Eliminado",
      description: "Los datos han sido simulados y mostrados en consola.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const commonInputProps = {
    bg: "gray.50",
    _hover: { bg: "gray.100" },
    _focus: { borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" },
  };

  return (
    <Box
      maxW="100vh"
      w="100%"
      maxH="90vh"
      mx="auto"
      p={6}
      borderRadius="lg"
      boxShadow="xl"
      bg="white"
      borderWidth={1}
    >
      <Heading as="h3" size="lg" textAlign="center" mb={4}>
        Eliminar Movimiento
      </Heading>
      <Divider mb={4} />
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Producto</FormLabel>
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
            <FormLabel>Fecha</FormLabel>
            <Input
              {...commonInputProps}
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Empleado</FormLabel>
            <Input
              {...commonInputProps}
              type="text"
              value={empleado}
              onChange={(e) => setEmpleado(e.target.value)}
              placeholder="Ej: Juan Pérez"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Razón</FormLabel>
            <Input
              {...commonInputProps}
              type="text"
              value={razon}
              onChange={(e) => setRazon(e.target.value)}
              placeholder="Ej: Daño irreparable"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Destino</FormLabel>
            <Select
              {...commonInputProps}
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              placeholder="Selecciona destino"
            >
              <option value="reparacion">Reparación</option>
              <option value="descarte">Descarte</option>
              <option value="reubicacion">Reubicación</option>
            </Select>
          </FormControl>

          <Button
            type="submit"
            colorScheme="red"
            width="full"
            _hover={{ bg: "red.500" }}
            _active={{ bg: "red.600" }}
            size="lg"
            mt={2}
          >
            Eliminar Movimiento
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default DeleteMovements;
