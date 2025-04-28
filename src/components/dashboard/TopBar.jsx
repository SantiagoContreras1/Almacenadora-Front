
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Text,
  HStack,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiSearch, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const TopBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/auth')
    dispatch(logout())
    
  }
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      w="full"
      px="6"
      py="4"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="sm"
      borderRadius="lg"
    >
      <Text fontSize="xl" fontWeight="bold">
        Dashboard
      </Text>

      <InputGroup w="96" maxW="400px">
        <InputLeftElement pointerEvents="none">
          <FiSearch color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Buscar productos, proveedores..."
          borderRadius="md"
          _focus={{ borderColor: "blue.500" }}
        />
      </InputGroup>

      <HStack spacing="4">
        <Menu>
          <MenuButton>
            <HStack spacing="2">
              <Avatar size="sm" name={user.name} bg="blue.500" />
              <Box display={{ base: "none", md: "block" }}>
                <Text fontWeight="medium" fontSize="sm">
                  {user.name}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {user.role === "ADMIN_ROLE" ? 'Administrador' : 'Empleado' }
                </Text>
              </Box>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem icon={<FiUser />}>Perfil</MenuItem>
            <MenuItem icon={<FiLogOut />} onClick={handleLogout}>Cerrar sesión</MenuItem>

          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

