import { Box, Text, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export const UserCard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const staticUsers = [
      { id: 1, name: "Jassie Bhatia", email: "jassie@jassie.dev", role: "Admin" },
      { id: 2, name: "John Doe", email: "john@example.com", role: "User" },
      { id: 3, name: "Alice Smith", email: "alice@smith.com", role: "Manager" },
    ];

    setUsers(staticUsers);
    setLoading(false);
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (users.length === 0) return <div>No se encontraron usuarios</div>;

  return (
    <Box borderWidth="8px" borderRadius="lg" p={4} maxW="md">
      <Stack spacing={4}>
        {users.map((user) => (
          <Box key={user.id}>
            <Text fontWeight="bold">Name: {user.name}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Role: {user.role}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default UserCard;