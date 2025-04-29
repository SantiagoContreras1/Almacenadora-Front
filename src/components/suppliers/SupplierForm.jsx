
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
  
  const SupplierForm = () => {
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [productos, setProductos] = useState("");
    const [categoria, setCategoria] = useState("");
    const toast = useToast();
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Verificar si todos los campos están completos
      if (!nombre || !telefono || !email || !productos || !categoria) {
        toast({
          title: "Error",
          description: "Por favor, llena todos los campos.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
  
      setNombre("");
      setTelefono("");
      setEmail("");
      setProductos("");
      setCategoria("");
      toast({
        title: "Proveedor agregado",
        description: "El proveedor ha sido registrado con éxito.",
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
          Registrar Proveedor
        </Heading>
        <Divider mb={6} />
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Nombre del Proveedor</FormLabel>
              <Input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresa el nombre del proveedor"
                bg="gray.50"
                _hover={{ bg: "gray.100" }}
                _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }}
              />
            </FormControl>
  
            <FormControl isRequired>
              <FormLabel>Teléfono</FormLabel>
              <Input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Ingresa el teléfono del proveedor"
                bg="gray.50"
                _hover={{ bg: "gray.100" }}
                _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }}
              />
            </FormControl>
  
            <FormControl isRequired>
              <FormLabel>Correo Electrónico</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa el correo electrónico del proveedor"
                bg="gray.50"
                _hover={{ bg: "gray.100" }}
                _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }}
              />
            </FormControl>
  
            <FormControl isRequired>
              <FormLabel>Productos Suministrados</FormLabel>
              <Input
                type="text"
                value={productos}
                onChange={(e) => setProductos(e.target.value)}
                placeholder="Escribe los productos suministrados, separados por coma"
                bg="gray.50"
                _hover={{ bg: "gray.100" }}
                _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }}
              />
            </FormControl>
  
            <FormControl isRequired>
              <FormLabel>Categoría</FormLabel>
              <Select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                placeholder="Selecciona la categoría del proveedor"
                bg="gray.50"
                _hover={{ bg: "gray.100" }}
                _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }}
              >
                <option value="electrónica">Electrónica</option>
                <option value="ropa">Ropa</option>
                <option value="alimentos">Alimentos</option>
                {/* Agregar el Api del Back */}
              </Select>
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
              Registrar Proveedor
            </Button>
          </Stack>
        </form>
      </Box>
    );
  };
  
  export default SupplierForm;
  