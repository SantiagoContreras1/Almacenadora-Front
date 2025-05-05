import { Box, Grid, Flex, useColorModeValue, VStack } from "@chakra-ui/react";
import { FiBox, FiDollarSign, FiRepeat, FiAlertTriangle } from "react-icons/fi";

import { AlertSection } from "./AlertSection";
import { MovementsTable } from "./MovementsTable";
import { SideBar } from "./SideBar";
import { StatCard } from "./StatCard";
import { TopBar } from "./TopBar";
import { useState, useEffect } from "react";
import { useNotifications } from "../../shared/hooks/useNotifications";
import { useMovements } from "../../shared/hooks/useMovements"
import { formatDistanceToNow } from "date-fns";
import { useProducts } from "../../shared/hooks/useProducts";
import { useStatistics } from "../../shared/hooks/useStatistics";

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
    time: formatDistanceToNow(new Date(notif.date), { addSuffix: true})
  };
};



const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const AdminDashboard = () => {
  const { getNotifications } = useNotifications();
  const { getMovements } = useMovements();
  const { getProducts, totalStock, } = useProducts()
  const { getLowStockProducts } = useStatistics()
  const [Notifications, setNotifications] = useState([]);
  const [movements, setMovements] = useState([])
  const [products, setProducts] = useState([])
  const [lowStockProducts, setLowStockProducts] = useState([])
  const [today, setToday] = useState([])
  const [stockValue, setStockValue] = useState(0); 

  const fetchData = async () => {
    const NotificationsFromApi = await getNotifications(5);
    const movementsFromApi = await getMovements(5);
    const lowStock = await getLowStockProducts()
    const productsFromApi = await getProducts();
    const stock = await totalStock();
  
    if (NotificationsFromApi && movementsFromApi && productsFromApi && stock && lowStock) {
      setMovements(movementsFromApi.movements);
      setToday(movementsFromApi.today)
      setLowStockProducts(lowStock)
      const formatted = NotificationsFromApi.map(transformNotification);
      setNotifications(formatted);
      setProducts(productsFromApi);
      setStockValue(stock.totalValue);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <Flex h="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      <SideBar active="dashboard" />

      <Box ml="64" flex="1" p="6" overflow="auto">
        <TopBar />

        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap="6"
          mt="6"
        >
          <StatCard
            title="Total Productos"
            value={products.length}
            icon={FiBox}
            color="blue.500"
          />
          <StatCard
            title="Valor de Inventario"
            value={`Q ${stockValue.toLocaleString("en-US")
            }`}
            icon={FiDollarSign}
            color="green.500"
          />
          <StatCard
            title="Movimientos Hoy"
            value={today}
            icon={FiRepeat}
            color="purple.500"
          />
          <StatCard
            title="Productos Stock Bajo"
            value={lowStockProducts.length}
            icon={FiAlertTriangle}
            color="red.500"
          />
        </Grid>
        
        <AlertSection alerts={Notifications} />

        <MovementsTable movements={movements} title="Últimos Movimientos" />
      </Box>
    </Flex>
  );
};

export default AdminDashboard;
