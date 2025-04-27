import {
  Box,
  Flex,
  Icon,
  Text,
  VStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom"; // Importamos useLocation
import {
  FiHome,
  FiBox,
  FiRepeat,
  FiUsers,
  FiBriefcase,
  FiPieChart,
  FiSettings,
  FiUser,
} from "react-icons/fi";

const NavItem = ({ icon, children, to, active }) => {
  return (
    <Flex
      as={RouterLink}
      to={to}
      align="center"
      px="4"
      py="3"
      cursor="pointer"
      role="group"
      fontWeight={active ? "semibold" : "medium"}
      transition=".15s ease"
      color={active ? "white" : useColorModeValue("gray.400", "gray.200")}
      bg={active ? "blue.500" : "transparent"}
      borderRadius="md"
      _hover={{
        bg: useColorModeValue("blue.400", "blue.500"),
        color: "white",
        textDecoration: "none",
      }}
    >
      {icon && <Icon mr="2" boxSize="5" as={icon} transition=".15s ease" />}
      {children}
    </Flex>
  );
};

const SideBar = () => {
  const location = useLocation(); // usamos la ruta actual
  const currentPath = location.pathname;

  const navItems = [
    { name: "Dashboard", icon: FiHome, route: "/" },
    { name: "Productos", icon: FiBox, route: "/products" },
    { name: "Movimientos", icon: FiRepeat, route: "/movements" },
    { name: "Proveedores", icon: FiBriefcase, route: "/suppliers" },
    { name: "Clientes", icon: FiUsers, route: "/clients" },
    { name: "Informes", icon: FiPieChart, route: "/reports" },
    { name: "Estadísticas", icon: FiPieChart, route: "/statistics" },
    { name: "Usuarios", icon: FiUser, route: "/users" },
    { name: "Configuración", icon: FiSettings, route: "/settings" }
  ];

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      h="100vh"
      w="64"
      bg={useColorModeValue("gray.800", "gray.900")}
      color="white"
      px="4"
      py="5"
      overflowY="auto"
    >
      <Flex align="center" mb="8" px="2">
        <Box bg="blue.500" borderRadius="md" p="2" mr="3" color="white">
          <Icon as={FiBox} boxSize="6" />
        </Box>
        <Text fontSize="xl" fontWeight="bold">
          Inventario Pro
        </Text>
      </Flex>
      <Divider mb="6" borderColor="gray.600" />
      <VStack spacing="2" align="stretch">
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            icon={item.icon}
            to={item.route}
            active={currentPath === item.route}
          >
            {item.name}
          </NavItem>
        ))}
      </VStack>
    </Box>
  );
};

export default SideBar;
