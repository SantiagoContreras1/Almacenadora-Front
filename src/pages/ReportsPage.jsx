import { SideBar } from "../components/dashboard/SideBar";
import { TopBar } from "../components/dashboard/TopBar";
import { Box, Container, Heading, Flex, Divider } from "@chakra-ui/react";
import InventoryReport from "../components/reports/InventoryReport";
import InventoryMovementsReport from "../components/reports/InventoryMovementsReport";
import ProductStatistics from "../components/reports/ProductStatistics";
import BestSellers from "../components/reports/BestSellers";
import InventoryValueChart from "../components/reports/InventoryValueChart";
import ExpandableSection from "../components/reports/ExpandableSection";
import LowStockAlert from "../components/reports/LowStockAlert";

// Datos Falsos (Cambiar por el Back )
const productsData = [
  { id: 1, name: "Producto A", stock: 5, price: 10 },
  { id: 2, name: "Producto B", stock: 3, price: 20 },
  { id: 3, name: "Producto C", stock: 70, price: 5 },
  { id: 4, name: "Producto D", stock: 2, price: 15 },
];

const movementsData = [
  { date: "2025-04-20", productName: "Producto A", type: "Entrada", quantity: 20 },
  { date: "2025-04-21", productName: "Producto B", type: "Salida", quantity: 10 },
  { date: "2025-04-22", productName: "Producto C", type: "Entrada", quantity: 15 },
];

const statisticsData = [
  { productName: "Producto A", movements: 40 },
  { productName: "Producto B", movements: 25 },
  { productName: "Producto C", movements: 30 },
];

const bestSellersData = [
  { productName: "Producto A", totalSales: 120, stock: 5 },
  { productName: "Producto B", totalSales: 95, stock: 3 },
  { productName: "Producto C", totalSales: 78, stock: 70 },
];

const lowStockProducts = productsData.filter((p) => p.stock < 10);

const ReportsPage = () => {
  return (
    <Flex>
      <SideBar />
      <Box flex="1" bg="gray.50" minH="100vh">
        <TopBar />
        <Container maxW="7xl" py={8}>
          <Heading
            mb={10}
            textAlign="center"
            color="teal.600"
            fontSize={{ base: "2xl", md: "4xl" }}
          >
            Panel de Informes y Estadísticas
          </Heading>

          <ExpandableSection title="🚨 Alerta: Productos con Stock Bajo">
            <LowStockAlert products={lowStockProducts} />
          </ExpandableSection>

          <Divider my={10} borderColor="gray.300" />

          <ExpandableSection title="📦 Informe de Inventario">
            <InventoryReport products={productsData} />
            <Box mt={6}>
              <InventoryValueChart products={productsData} />
            </Box>
          </ExpandableSection>

          <Divider my={10} borderColor="gray.300" />

          <ExpandableSection title="🔄 Informe de Movimientos de Inventario">
            <InventoryMovementsReport movements={movementsData} />
          </ExpandableSection>

          <Divider my={10} borderColor="gray.300" />

          <ExpandableSection title="📊 Estadísticas de Productos">
            <ProductStatistics stats={statisticsData} />
            <Box mt={6}>
              <BestSellers data={bestSellersData} />
            </Box>
          </ExpandableSection>
        </Container>
      </Box>
    </Flex>
  );
};

export default ReportsPage;
