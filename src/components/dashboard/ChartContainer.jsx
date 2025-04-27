import { Box, Flex, Text, Button, useColorModeValue } from "@chakra-ui/react";
import { FiEye } from "react-icons/fi";

export const ChartContainer = ({ title, children, showViewAll = true }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      p="5"
      borderRadius="lg"
      boxShadow="sm"
      h="full"
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
            Ver detalles
          </Button>
        )}
      </Flex>

      <Box h="calc(100% - 40px)">{children}</Box>
    </Box>
  );
};
