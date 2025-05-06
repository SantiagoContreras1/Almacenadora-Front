import {
  Box,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  Icon
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

const StockStatusBadge = ({ status }) => {
  const colorScheme =
    {
      Urgente: "red",
      Bajo: "orange",
      Moderado: "green",
      Alto: "blue",
    }[status] || "gray";

  return (
    <StatHelpText color={colorScheme} borderRadius="md" px="2" py="1">
      {status}
    </StatHelpText>
  );
};

const LowStockAlert = ({ products }) => {
  const alertBg = useColorModeValue("red.50", "red.900");
  const alertColor = useColorModeValue("red.800", "red.100");
  const alertBorderColor = useColorModeValue("red.200", "red.700");
  const iconColor = useColorModeValue("red.500", "red.300");

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
      {products.map((product) => (
        <Box
          key={product.id}
          p={5}
          shadow="md"
          borderWidth="1px"
          bg={alertBg}
          borderRadius="xl"
          borderColor={alertBorderColor}
        >
          <Stat>
            <StatLabel color={alertColor} fontWeight="bold">
              <Icon as={WarningIcon} color={iconColor} mr={2} />
              {product.name}
            </StatLabel>
            <StatNumber color={alertColor}>{product.stock} unidades</StatNumber>
            <StockStatusBadge status={product.tipo} />
          </Stat>
        </Box>
      ))}
      {products.length === 0 && (
        <Text color={alertColor} fontWeight="semibold">
          No hay productos con stock bajo.
        </Text>
      )}
    </SimpleGrid>
  );
};

export default LowStockAlert;