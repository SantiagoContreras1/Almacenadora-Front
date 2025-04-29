import React from 'react';
import { Box, Button, Heading, Text, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; // Si estás usando React Router

const UnauthorizedPage = () => {
  return (
    <Center h="100vh" flexDirection="column" textAlign="center">
      <Box
        p={6}
        borderRadius="md"
        shadow="md"
        bg="red.100"
        border="1px"
        borderColor="red.300"
      >
        <Heading size="lg" color="red.600" mb={4}>
          ¡Acceso No Autorizado!
        </Heading>
        <Text color="gray.600" mb={4}>
          No tienes permisos para acceder a esta página. Si crees que esto es un
          error, por favor, contacta con el administrador.
        </Text>
        <Link to="/">
          <Button colorScheme="red" mr={3}>
            Volver a la página de inicio
          </Button>
        </Link>
      </Box>
    </Center>
  );
};

export default UnauthorizedPage;
