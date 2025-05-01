import { v4 as uuidv4 } from 'uuid';
import {
  SimpleGrid,
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Avatar
} from "@chakra-ui/react";
 
export const UserCard = ({ users }) => {    
  const user = {
    name: "Usuario de Prueba",
    email: "prueba@ejemplo.com",
    role: "Editor",
    estado: "Activo",
  };

  const userToDisplay = user;
  const randomSeed = uuidv4();
  const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${randomSeed}`;
  const statusColor = userToDisplay.estado === 'Activo' ? 'green' : 'red';
  
  return (
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
      <Card
        boxShadow="lg"
        borderRadius="lg"
        overflow="hidden"
        _hover={{ boxShadow: "dark-lg", transform: "translateY(-5px)" }}
        transition="all 0.2s ease-in-out"
      >
        <CardBody>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800" mb="5">💼</Text>
          <VStack spacing={4} align="stretch"> 
          <Avatar src={avatarUrl} size="lg" mb="2" />

            <Heading size="md">
              {userToDisplay.name}
            </Heading>

            <Text pb="1" borderBottom="1px solid" fontStyle="italic" fontWeight="semibold" fontSize="sm" color="gray.600">
              Email: {userToDisplay.email}
            </Text>
            <Text pb="1" borderBottom="1px solid" fontStyle="italic" fontWeight="semibold" fontSize="sm" color="gray.600">
              Role: {userToDisplay.role}
            </Text>

            <HStack justifyContent="space-between" alignItems="center">
              <Text pb="1"  fontStyle="italic" fontWeight="semibold" fontSize="sm" color="gray.600">
                Estado:
              </Text>
              <Badge colorScheme={statusColor} variant="solid" borderRadius="full" px="2">
                {userToDisplay.estado}
              </Badge>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
};

export default UserCard;