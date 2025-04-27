import {
  Box,
  Flex,
  Icon,
  Text,
  Link,
  VStack,
  Divider,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
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

const NavItem = ({ icon, children, active }) => {
  return (
    <Flex
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
      }}
    >
      {icon && <Icon mr="2" boxSize="5" as={icon} transition=".15s ease" />}
      {children}
    </Flex>
  );
};

const SideBar = ({ active = "dashboard" }) => {
  const navItems = [
    { name: "Dashboard", icon: FiHome, route: "dashboard" },
    { name: "Inventario", icon: FiBox, route: "inventory" },
    { name: "Movimientos", icon: FiRepeat, route: "movements" },
    { name: "Proveedores", icon: FiBriefcase, route: "suppliers" },
    { name: "Clientes", icon: FiUsers, route: "clients" },
    { name: "Informes", icon: FiPieChart, route: "reports" },
    { name: "Usuarios", icon: FiUser, route: "users" },
    { name: "Configuración", icon: FiSettings, route: "settings" },
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
            active={active === item.route}
          >
            {item.name}
          </NavItem>
        ))}
      </VStack>
    </Box>
  );
};

export default SideBar;
