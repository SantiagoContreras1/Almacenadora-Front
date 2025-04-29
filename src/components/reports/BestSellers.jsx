import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const BestSellers = ({ data }) => {
  return (
    <Box p={4} bg="white" borderRadius="xl" boxShadow="md" mt={6}>
      <Heading size="md" mb={4}>Productos Más Vendidos</Heading>
      <Table variant="striped" colorScheme="blue">
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
              <Td>{item.productName}</Td>
              <Td>{item.totalSales}</Td>
              <Td>{item.stock}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default BestSellers;
