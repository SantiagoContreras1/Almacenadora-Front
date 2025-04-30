import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";

const InventoryReport = ({ products }) => {
  const totalStock = products.reduce((acc, product) => acc + product.stock, 0);
  const totalValue = products.reduce((acc, product) => acc + product.stock * product.price, 0);

  return (
    <Box p={4} bg="white" borderRadius="md" boxShadow="md">
      <Heading size="md" mb={4}>Informe de Inventario</Heading>
      <Text>Total de productos en stock: <strong>{totalStock}</strong></Text>
      <Text>Valor total del inventario: <strong>${totalValue.toFixed(2)}</strong></Text>
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>Producto</Th>
            <Th>Cantidad</Th>
            <Th>Precio Unitario</Th>
            <Th>Valor Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.name}</Td>
              <Td>{product.stock}</Td>
              <Td>${product.price}</Td>
              <Td>${(product.stock * product.price).toFixed(2)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InventoryReport;
