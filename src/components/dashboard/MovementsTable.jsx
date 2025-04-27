import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiEye } from "react-icons/fi";

const MovementTypeText = ({ type }) => {
  const color = type === "Entrada" ? "green.500" : "red.500";

  return (
    <Text color={color} fontWeight="medium">
      {type}
    </Text>
  );
};

export const MovementsTable = ({
  movements,
  title = "Movimientos",
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
            <Th>Tipo</Th>
            <Th isNumeric>Cantidad</Th>
            <Th>Usuario</Th>
            <Th>Fecha</Th>
          </Tr>
        </Thead>
        <Tbody>
          {movements.map((movement) => (
            <Tr key={movement.id}>
              <Td>{movement.product}</Td>
              <Td>
                <MovementTypeText type={movement.type} />
              </Td>
              <Td isNumeric>{movement.quantity}</Td>
              <Td>{movement.user}</Td>
              <Td>{movement.date}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};


