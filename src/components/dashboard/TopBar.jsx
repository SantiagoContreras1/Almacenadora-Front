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
  IconButton,
  useColorModeValue,
  Badge,
  useColorMode,
  Tooltip
} from "@chakra-ui/react";
import { FiSearch, FiUser, FiLogOut, FiBell, FiMoon, FiSun } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const TopBar = ({ isSearch, handleChange }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useSelector((state) => state.notifications);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = () => {
    navigate("/auth");
    dispatch(logout());
  };

  const handleProfile = () => {
    navigate("/profile");
  };

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

      {isSearch && (
        <InputGroup w="96" maxW="400px">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search"
            onChange={(e) => handleChange(e.target.value)}
            borderRadius="md"
            _focus={{ borderColor: "blue.500" }}
          />
        </InputGroup>
      )}

      <HStack spacing="4">
        <Tooltip label={colorMode === "light" ? "Modo oscuro" : "Modo claro"}>
          <IconButton
            aria-label={colorMode === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
            icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
            variant="ghost"
          />
        </Tooltip>

        <Menu>
          <MenuButton as={IconButton} icon={<FiBell />} variant="ghost" position="relative">
            {notifications.length > 0 && (
              <Badge
                colorScheme="red"
                position="absolute"
                top="0"
                right="0"
                borderRadius="full"
                fontSize="0.7em"
              >
                {notifications.length}
              </Badge>
            )}
          </MenuButton>
          <MenuList maxW="300px">
            {notifications.length === 0 ? (
              <MenuItem>No hay notificaciones</MenuItem>
            ) : (
              notifications.map((n, index) => (
                <MenuItem key={index}>
                  <Text fontSize="sm">
                    <strong>{n.type}:</strong> {n.message}
                  </Text>
                </MenuItem>
              ))
            )}
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton>
            <HStack spacing="2">
              <Avatar size="sm" name={user.name} bg="blue.500" />
              <Box display={{ base: "none", md: "block" }}>
                <Text fontWeight="medium" fontSize="sm">
                  {user.name}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {user.role === "ADMIN_ROLE" ? "Administrador" : "Empleado"}
                </Text>
              </Box>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem icon={<FiUser />} onClick={handleProfile}>Perfil</MenuItem>
            <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
              Cerrar sesión
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};