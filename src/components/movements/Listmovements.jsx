
import {
    Box,
    Heading,
    VStack,
    Text,
    Badge,
    StackDivider,
  } from "@chakra-ui/react";
  
  const Listmovements = ({ suppliers }) => {
    return (
      <Box bg="white" p={6} borderRadius="xl" boxShadow="md" h="60%" overflowY="auto">
        <Heading size="md" mb={4}>
           Historial de Movimientos 
        </Heading>
        <VStack spacing={4} align="stretch" divider={<StackDivider borderColor="gray.200" />}>
          {suppliers.length > 0 ? (
            suppliers.map((supplier) => (
              <Box key={supplier.id}>
                <Text fontWeight="bold">{supplier.name}</Text>
                <Text color="gray.600">Contacto: {supplier.contact}</Text>
                <Badge colorScheme="purple" mt={1}>
                  {supplier.products}
                </Badge>
              </Box>
            ))
          ) : (
            <Text color="gray.500"></Text>
          )}
        </VStack>
      </Box>
    );
  };
  
  export default Listmovements;
  