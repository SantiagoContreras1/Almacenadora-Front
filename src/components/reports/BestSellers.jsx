import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, useColorModeValue } from "@chakra-ui/react";

const BestSellers = ({ data }) => {
  const bg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("teal.600", "teal.300");

  return (
    <Box p={4} bg={bg} borderRadius="xl" boxShadow="md" mt={6} borderWidth="1px" borderColor={borderColor}>
      <Heading size="md" mb={4} color={titleColor}>Productos Más Vendidos</Heading>
      <Table variant="striped" colorScheme={useColorModeValue("blue", "blueDark")}>
        <Thead>
          <Tr>
            <Th>Producto</Th>
            <Th>Ventas</Th>
            <Th>Stock Actual</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>{item.name}</Td>
              <Td>{item.ventas}</Td>
              <Td>{item.stock}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default BestSellers;