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
  
  const LowStockAlert = ({ products }) => {
    const bg = useColorModeValue("red.50", "red.900");
    const color = useColorModeValue("red.800", "red.100");
    const borderColor = useColorModeValue("red.200", "red.700");
    const iconColor = useColorModeValue("red.500", "red.300");
  
    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {products.map((product) => (
          <Box
            key={product.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            bg={bg}
            borderRadius="xl"
            borderColor={borderColor}
          >
            <Stat>
              <StatLabel color={color} fontWeight="bold">
                <Icon as={WarningIcon} color={iconColor} mr={2} />{product.name}
              </StatLabel>
              <StatNumber color={color}>{product.stock} unidades</StatNumber>
              <StatHelpText color={color} fontStyle="italic">Stock Crítico</StatHelpText>
            </Stat>
          </Box>
        ))}
        {products.length === 0 && (
          <Text color={color} fontWeight="semibold">
            No hay productos con stock bajo.
          </Text>
        )}
      </SimpleGrid>
    );
  };
  
  export default LowStockAlert;
  