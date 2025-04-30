import { Box, Text, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 3 }}
      transition={{ duration: 1 }}
    >
      <Box
        borderWidth="6px"
        borderColor="#ffddae"
        borderRadius="lg"
        p={6}
        maxW="lg"
        boxShadow="md"
      >
        <Stack spacing={4}>
          {users.map((user) => (
            <Box
              key={user.id}
              p={5}
              borderWidth="5px"
              borderColor="#c6e7ff"
              borderRadius="md"
              mb={2}
            >
              <Text fontFamily="mono" fontWeight="bold" fontSize="20" color="#da627d">Name: {user.name}</Text>
              <Text fontFamily="mono" fontSize="14" fontStyle="italic">Email: {user.email}</Text>
              <Text fontFamily="mono" fontSize="14" fontStyle="italic">Role: {user.role}</Text>
            </Box>
          ))}
        </Stack>
      </Box>
    </motion.div>
  );
};

export default UserCard;