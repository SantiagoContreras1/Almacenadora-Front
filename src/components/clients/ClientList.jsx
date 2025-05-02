import {
    Box,
    Flex,
    Text,
    IconButton,
    VStack,
    HStack,
    Avatar,
    Badge,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { FaEdit, FaTrash } from "react-icons/fa";
  
  const ClientList = ({ clients, onEdit, onDelete }) => {
    const bgItem = useColorModeValue("gray.50", "gray.700");
    console.log(clients)
    if (!clients.length) {
      return (
        <Box p={6} textAlign="center">
          <Text color="gray.500">No hay clientes para mostrar.</Text>
        </Box>
      );
    }
  
    return (
      <VStack align="stretch" spacing={0}>
        {clients.map((client, index) => (
          <Box
            key={client.uid || index}
            p={4}
            _hover={{ bg: bgItem }}
            borderBottom="1px solid"
            borderColor="gray.200"
          >
            <Flex justify="space-between" align="center">
              <HStack>
                <Avatar name={client.nombre} />
                <Box>
                  <HStack>
                    <Text fontWeight="bold">{client.nombre}</Text>
                    <Badge colorScheme={client.tipo === "empresa" ? "purple" : "green"}>
                      {client.tipo}
                    </Badge>
                  </HStack>
                  {client.email && (
                    <Text fontSize="sm" color="gray.500">{client.email}</Text>
                  )}
                  {client.telefono && (
                    <Text fontSize="sm" color="gray.500">Tel: {client.telefono}</Text>
                  )}
                  {client.direccion && (
                    <Text fontSize="sm" color="gray.500">Dir: {client.direccion}</Text>
                  )}
                </Box>
              </HStack>
              <HStack>
                <IconButton
                  aria-label="Editar cliente"
                  icon={<FaEdit />}
                  colorScheme="blue"
                  variant="ghost"
                  onClick={() => onEdit(client)}
                />
                <IconButton
                  aria-label="Eliminar cliente"
                  icon={<FaTrash />}
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => onDelete(client.uid, client.nombre)}
                />
              </HStack>
            </Flex>
          </Box>
        ))}
      </VStack>
    );
  };
  
  export default ClientList;
  