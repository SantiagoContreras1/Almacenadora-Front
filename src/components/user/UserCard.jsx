import { Box, Text, Badge, Button, VStack, HStack, Avatar } from "@chakra-ui/react";

const UserCard = ({ user, onEdit, onDelete }) => {
  const roleLabel = user.role === "ADMIN_ROLE" ? "Administrador" : "Empleado";
  const avatarUrl =
    user.role === "ADMIN_ROLE"
      ? "https://cdn-icons-png.flaticon.com/512/78/78948.png"
      : "https://i.pinimg.com/736x/04/02/66/040266d0bb7585add27e44663c3adcdd.jpg";
  return (
    <Box borderWidth="1px" borderRadius="2xl" p={4} shadow="md">
      <VStack align="start" spacing={2}>
        <Avatar src={avatarUrl} size="lg" mb="2" />
        <Text fontWeight="bold">{user.name}</Text>
        <Text>ID: {user._id}</Text>
        <Text>Email: {user.email}</Text>
        <Badge colorScheme={user.role === "ADMIN_ROLE" ? "purple" : "blue"}>
          {roleLabel}
        </Badge>
        <HStack spacing={2} mt={3}>
          <Button colorScheme="teal" size="sm" onClick={() => onEdit(user)}>
            Editar
          </Button>
          <Button colorScheme="red" size="sm" onClick={() => onDelete(user)}>
            Eliminar
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default UserCard;
