import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Flex,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

export const StatCard = ({
  title,
  value,
  change,
  icon,
  color = "blue.500",
}) => {
  const isPositiveChange = change >= 0;

  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      p="5"
      borderRadius="lg"
      boxShadow="sm"
      position="relative"
      overflow="hidden"
    >
      <Box position="absolute" top="4" right="4" opacity="0.2">
        <Icon as={icon} w="8" h="8" color={color} />
      </Box>
      <Stat>
        <StatLabel color="gray.500" fontSize="sm">
          {title}
        </StatLabel>
        <StatNumber fontSize="2xl" fontWeight="bold">
          {value}
        </StatNumber>
        <StatHelpText>
          <Flex align="center">
            <StatArrow type={isPositiveChange ? "increase" : "decrease"} />
            {Math.abs(change)}% desde el mes pasado
          </Flex>
        </StatHelpText>
      </Stat>
    </Box>
  );
};
