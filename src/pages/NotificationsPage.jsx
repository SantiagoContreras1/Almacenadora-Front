import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  useColorModeValue,
  VStack,
  Text,
  Divider,
  Icon,
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  HStack,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@chakra-ui/react";
import { SideBar } from "../components/dashboard/SideBar";
import { TopBar } from "../components/dashboard/TopBar";
import { FaBell, FaSearch } from "react-icons/fa";
import { AlertSection } from "../components/dashboard/AlertSection";
import { useNotifications } from "../shared/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";
import Pagination from "../components/Pagination.jsx";

const transformNotification = (notif) => {
  let title = "Notificación";
  let type = "info";

  if (notif.type === "EXPIRATION") {
    title = "Producto próximo a vencer";
    type = "warning";
  } else if (notif.type === "LOW_STOCK") {
    title = "Stock bajo";
    type = "danger";
  }

  return {
    id: notif.uid,
    type,
    title,
    message: notif.message,
    time: formatDistanceToNow(new Date(notif.date), { addSuffix: true }),
  };
};

const NotificationsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [search, setSearch] = useState("");
  const { getNotifications } = useNotifications();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const totalItems = alerts.length;
  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  const bg = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const titleColor = useColorModeValue("teal.600", "teal.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const fetchData = async () => {
    const NotificationsFromApi = await getNotifications();

    if (NotificationsFromApi) {
      const formatted = NotificationsFromApi.map(transformNotification);
      setAlerts(formatted);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.title.toLowerCase().includes(search.toLowerCase()) ||
      alert.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box minH="100vh" bg={bg}>
      <SideBar />
      <Box ml={{ base: 0, md: 60 }} transition="0.3s ease">
        <TopBar />
        <Box p={{ base: 4, md: 8 }}>
          <Flex justify="space-between" align="center" mb={8}>
            <HStack spacing={4}>
              <Icon as={FaBell} boxSize={8} color={titleColor} />
              <Heading size="xl" color={titleColor}>
                Notificaciones
              </Heading>
              <Badge
                colorScheme="teal"
                fontSize="lg"
                px={3}
                py={1}
                borderRadius="full"
              >
                {alerts.length} registros
              </Badge>
            </HStack>
          </Flex>

          <Card mb={8} border="1px" borderColor={borderColor}>
            <CardBody>
              <Flex direction={{ base: "column", md: "row" }} gap={4}>
                <InputGroup flex="1">
                  <Input
                    placeholder="Buscar notificación por título o mensaje..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    borderRadius="lg"
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label="Buscar"
                      icon={<FaSearch />}
                      variant="ghost"
                      colorScheme="teal"
                    />
                  </InputRightElement>
                </InputGroup>
              </Flex>
            </CardBody>
          </Card>

          <Card bg={cardBg} boxShadow="md" borderRadius="xl" overflow="hidden">
            <CardHeader borderBottom="1px" borderColor={borderColor}>
              <Flex justify="space-between" align="center">
                <Heading size="md">Listado de Notificaciones</Heading>
                <Text color="gray.500">{filteredAlerts.length} resultados</Text>
              </Flex>
            </CardHeader>
            <CardBody p={0}>
              <AlertSection alerts={filteredAlerts} all={true} />
            </CardBody>
          </Card>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            itemsPerPage={limit}
            onItemsPerPageChange={handleItemsPerPageChange}
            showItemCount={true}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationsPage;
