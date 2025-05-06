import { SideBar } from "../components/dashboard/SideBar";
import { TopBar } from "../components/dashboard/TopBar";
import { useEffect, useState } from "react";
import { 
  Box, 
  Container, 
  Heading, 
  Flex, 
  Divider, 
  useColorModeValue,
  Card,
  CardBody
} from "@chakra-ui/react";
import InventoryReport from "../components/reports/InventoryReport";
import InventoryMovementsReport from "../components/reports/InventoryMovementsReport";
import ProductStatistics from "../components/reports/ProductStatistics";
import BestSellers from "../components/reports/BestSellers";
import InventoryValueChart from "../components/reports/InventoryValueChart";
import ExpandableSection from "../components/reports/ExpandableSection";
import LowStockAlert from "../components/reports/LowStockAlert";
import { useStatistics } from "../shared/hooks/useStatistics";
import { useProducts } from "../shared/hooks/useProducts";

const ReportsPage = () => {
  const [movements, setMovements] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const { getBestSellers, getLowStockProducts, getWeeklyInventoryMovements } = useStatistics();
  const { getProducts } = useProducts();

  const bg = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const titleColor = useColorModeValue("teal.600", "teal.300");

  const fetchData = async () => {
    const productsData = await getProducts();
    setProducts(productsData);

    const bestSellersData = await getBestSellers();
    setBestSellers(bestSellersData);

    const weeklyMovements = await getWeeklyInventoryMovements();
    setMovements(weeklyMovements);

    const lowStockData = await getLowStockProducts();
    setLowStockProducts(lowStockData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box minH="100vh" bg={bg}>
      <SideBar />
      <Box ml={{ base: 0, md: 60 }} transition="0.3s ease">
        <TopBar />
        <Box p={{ base: 4, md: 8 }}>
          <Container maxW="7xl">
            <Heading 
              mb={10} 
              textAlign="center" 
              color={titleColor} 
              fontSize={{ base: "2xl", md: "4xl" }}
            >
              Panel de Informes y Estadísticas
            </Heading>

            <Card bg={cardBg} boxShadow="md" mb={6}>
              <CardBody>
                <ExpandableSection title="🔴 Alerta: Productos con Stock Bajo">
                  <LowStockAlert products={lowStockProducts} />
                </ExpandableSection>
              </CardBody>
            </Card>

            <Divider my={10} borderColor="gray.300" />

            <Card bg={cardBg} boxShadow="md" mb={6}>
              <CardBody>
                <ExpandableSection title="📦 Informe de Inventario">
                  <InventoryReport products={products} />
                  <Box mt={6}>
                    <InventoryValueChart products={products} />
                  </Box>
                </ExpandableSection>
              </CardBody>
            </Card>

            <Divider my={10} borderColor="gray.300" />

            <Card bg={cardBg} boxShadow="md" mb={6}>
              <CardBody>
                <ExpandableSection title="🔄 Informe de Movimientos de Inventario">
                  <InventoryMovementsReport movements={movements} />
                </ExpandableSection>
              </CardBody>
            </Card>

            <Divider my={10} borderColor="gray.300" />

            <Card bg={cardBg} boxShadow="md" mb={6}>
              <CardBody>
                <ExpandableSection title="📊 Estadísticas de Productos">
                  <ProductStatistics products={bestSellers} />
                  <Box mt={6}>
                    <BestSellers data={bestSellers} />
                  </Box>
                </ExpandableSection>
              </CardBody>
            </Card>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default ReportsPage;