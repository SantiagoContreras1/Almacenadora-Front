import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Text, useColorModeValue } from "@chakra-ui/react";
import { useMemo } from "react";

const InventoryReport = ({ products }) => {
  const bg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("teal.600", "teal.300");
  const headerBg = useColorModeValue("teal.50", "teal.900");

  // Ordenar productos por valor total (de mayor a menor)
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => (b.price * b.stock) - (a.price * a.stock));
  }, [products]);

  const totalStock = useMemo(() => sortedProducts.reduce((acc, product) => acc + product.stock, 0), [sortedProducts]);
  const totalValue = useMemo(() => sortedProducts.reduce((acc, product) => acc + product.stock * product.price, 0), [sortedProducts]);

  return (
    <Box p={4} bg={bg} borderRadius="md" boxShadow="md" borderWidth="1px" borderColor={borderColor}>
      <Heading size="md" mb={4} color={titleColor}>Informe de Inventario</Heading>
      <Text color={textColor}>Total de productos en stock: <strong>{totalStock}</strong></Text>
      <Text color={textColor} mb={4}>Valor total del inventario: <strong>Q{totalValue.toFixed(2)}</strong></Text>
      
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr bg={headerBg}>
            <Th>#</Th>
            <Th>Producto</Th>
            <Th isNumeric>Cantidad</Th>
            <Th isNumeric>Precio Unitario</Th>
            <Th isNumeric>Valor Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedProducts.map((product, index) => (
            <Tr key={product.uid}>
              <Td>{index + 1}</Td>
              <Td>{product.name}</Td>
              <Td isNumeric>{product.stock}</Td>
              <Td isNumeric>Q{product.price.toFixed(2)}</Td>
              <Td isNumeric fontWeight="semibold">Q{(product.stock * product.price).toFixed(2)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InventoryReport;