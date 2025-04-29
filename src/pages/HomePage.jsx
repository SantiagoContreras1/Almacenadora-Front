import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      minH="100dvh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
      p={4}
    >
      <VStack spacing={6} textAlign="center">
        <Heading as="h1" size="2xl" color="purple.600">
          Welcome to Storage App!
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Please log in or register
        </Text>
        <VStack spacing={4}>
          <Button colorScheme="purple" onClick={() => navigate("/auth")}>
            Login
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};
