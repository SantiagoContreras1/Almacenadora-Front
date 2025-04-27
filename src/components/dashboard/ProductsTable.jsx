import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiEye } from "react-icons/fi";

const StockStatusBadge = ({ status }) => {
  const colorScheme =
    {
      Crítico: "red",
      Bajo: "orange",
      Normal: "green",
      Alto: "blue",
    }[status] || "gray";

  return (
    <Badge colorScheme={colorScheme} borderRadius="md" px="2" py="1">
      {status}
    </Badge>
  );
};

export const ProductsTable = ({
  products,
  title = "Productos",
  showViewAll = true,
}) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      p="5"
      borderRadius="lg"
      boxShadow="sm"
      overflowX="auto"
    >
      <Flex justify="space-between" align="center" mb="4">
        <Text fontSize="lg" fontWeight="semibold">
          {title}
        </Text>
        {showViewAll && (
          <Button
            variant="link"
            size="sm"
            colorScheme="blue"
            rightIcon={<FiEye />}
          >
            Ver todos
          </Button>
        )}
      </Flex>

      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Producto</Th>
            <Th>Categoría</Th>
            <Th isNumeric>Stock Actual</Th>
            <Th isNumeric>Stock Mínimo</Th>
            <Th>Estado</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.name}</Td>
              <Td>{product.category}</Td>
              <Td isNumeric>{product.currentStock}</Td>
              <Td isNumeric>{product.minStock}</Td>
              <Td>
                <StockStatusBadge status={product.status} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
