import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiEye } from "react-icons/fi";
import { AlertItem } from "./AlertItem";

export const AlertSection = ({ alerts }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      p="5"
      borderRadius="lg"
      boxShadow="sm"
      mb="6"
    >
      <Flex justify="space-between" align="center" mb="4">
        <Text fontSize="lg" fontWeight="semibold">
          Alertas y Notificaciones
        </Text>
        <Button
          variant="link"
          size="sm"
          colorScheme="blue"
          rightIcon={<FiEye />}
        >
          Ver todas
        </Button>
      </Flex>

      <VStack spacing="0" align="stretch">
        {alerts.map((alert) => (
          <AlertItem
            key={alert.id}
            type={alert.type}
            title={alert.title}
            message={alert.message}
            time={alert.time}
          />
        ))}
      </VStack>
    </Box>
  );
};
