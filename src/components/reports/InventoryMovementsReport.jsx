import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const InventoryMovementsReport = ({ movements }) => {
  return (
    <Box p={4} bg="white" borderRadius="md" boxShadow="md" mt={6}>
      <Heading size="md" mb={4}>Movimientos de Inventario</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Fecha</Th>
            <Th>Producto</Th>
            <Th>Tipo</Th>
            <Th>Cantidad</Th>
          </Tr>
        </Thead>
        <Tbody>
          {movements.map((move, index) => (
            <Tr key={index}>
              <Td>{move.date}</Td>
              <Td>{move.productName}</Td>
              <Td>{move.type}</Td>
              <Td>{move.quantity}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InventoryMovementsReport;
