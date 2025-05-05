import {
  Box,
  Flex,
  Icon,
  Text,
  VStack,
  Divider,
  useColorModeValue,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  IconButton,
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
  FiMenu,
} from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";

import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NavItem = ({ icon, children, to, active, onClick }) => {
  return (
    <Link to={to} style={{ textDecoration: "none", width: "100%" }} onClick={onClick}>
      <Flex
        align="center"
        px="4"
        py="3"
        cursor="pointer"
        role="group"
        fontWeight={active ? "semibold" : "medium"}
        transition=".15s ease"
        color={"white"}
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
    </Link>
  );
};

export const SideBar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const currentPath = location.pathname.substring(1) || "";
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  let navItems = [];

  if (user.role === "ADMIN_ROLE") {
    navItems = [
      { name: "Dashboard", icon: FiHome, route: "" },
      { name: "Inventario", icon: FiBox, route: "products" },
      { name: "Categorias", icon: BiCategoryAlt, route: "categories" },
      { name: "Movimientos", icon: FiRepeat, route: "movements" },
      { name: "Proveedores", icon: FiBriefcase, route: "suppliers" },
      { name: "Clientes", icon: FiUsers, route: "clients" },
      { name: "Informes", icon: FiPieChart, route: "reports" },
      { name: "Usuarios", icon: FiUser, route: "users" },
      
    ];
  } else {
    navItems = [
      { name: "Dashboard", icon: FiHome, route: "" },
      { name: "Inventario", icon: FiBox, route: "products" },
      { name: "Movimientos", icon: FiRepeat, route: "movements" },
      { name: "Categorias", icon: BiCategoryAlt, route: "categories" },
      { name: "Proveedores", icon: FiBriefcase, route: "suppliers" },
      { name: "Clientes", icon: FiUsers, route: "clients" },
    ];
  }

  const SidebarContent = ({ onNavClick }) => (
    <Box
      as="nav"
      h="100%"
      w="full"
      bg={useColorModeValue("gray.800", "gray.900")}
      color="white"
      px="4"
      py="5"
    >
      <Link to="" style={{ textDecoration: "none" }}>
        <Flex align="center" mb="8" px="2">
          <Box bg="blue.500" borderRadius="md" p="2" mr="3" color="white">
            <Icon as={FiBox} boxSize="6" />
          </Box>
          <Text fontSize="xl" fontWeight="bold" color="white">
            Inventario Pro
          </Text>
        </Flex>
      </Link>
      <Divider mb="6" borderColor="gray.600" />
      <VStack spacing="2" align="stretch">
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            icon={item.icon}
            to={`/${item.route}`}
            active={currentPath === item.route}
            onClick={onNavClick}
          >
            {item.name}
          </NavItem>
        ))}
      </VStack>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            icon={<FiMenu />}
            aria-label="Open menu"
            onClick={onOpen}
            position="fixed"
            top="4"
            left="4"
            zIndex="overlay"
          />
          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent bg="gray.800">
              <DrawerCloseButton />
              <DrawerHeader color="white">Menú</DrawerHeader>
              <DrawerBody>
                <SidebarContent onNavClick={onClose} />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
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
          <SidebarContent />
        </Box>
      )}
    </>
  );
};
