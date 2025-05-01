import { SideBar } from "../components/dashboard/SideBar";
import { TopBar } from "../components/dashboard/TopBar";
import { useEffect, useState } from "react";
import { Box, Container, Heading, Flex, Divider } from "@chakra-ui/react";
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
  const [movementsData, setmovementData] = useState([]);
  const [bestSellersData, setBestSellerData] = useState([]);
  const [products, setProducts] = useState([]);
  const [lowProducts, setLowProducts] = useState([])
  const { getBestSellers, getLowStockProducts, getWeeklyInventoryMovements } = useStatistics();
  const { getProducts } = useProducts();

  const fetchData = async () => {
    const productsData = await getProducts();
    setProducts(productsData)
    const bestData = await getBestSellers()
    setBestSellerData(bestData)
    const weekData = await getWeeklyInventoryMovements()
    setmovementData(weekData)
    const lowData = await getLowStockProducts();
    setLowProducts(lowData)
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <SideBar />
      <TopBar />
      <Box ml="250px" p="5">
        <Box
          mb="4"
          display="flex"
          justifyContent="space-between"
          gap={4}
          flexWrap="wrap"
        >
          <Container maxW="7xl" py={8}>
            <Heading
              mb={10}
              textAlign="center"
              color="teal.600"
              fontSize={{ base: "2xl", md: "4xl" }}
            >
              Panel de Informes y Estadísticas
            </Heading>

            <ExpandableSection title="🔴 Alerta: Productos con Stock Bajo">
             <LowStockAlert products={lowProducts}></LowStockAlert>
            </ExpandableSection>

            <Divider my={10} borderColor="gray.300" />

            <ExpandableSection title="📦 Informe de Inventario">
              <InventoryReport products={products} />
              <Box mt={6}>
                <InventoryValueChart products={products} />
              </Box>
            </ExpandableSection>

            <Divider my={10} borderColor="gray.300" />

            <ExpandableSection title="🔄 Informe de Movimientos de Inventario">
              <InventoryMovementsReport movements={movementsData} />
            </ExpandableSection>

            <Divider my={10} borderColor="gray.300" />

            <ExpandableSection title="📊 Estadísticas de Productos">
              <ProductStatistics products={bestSellersData} />
              <Box mt={6}>
                <BestSellers data={bestSellersData} />
              </Box>
            </ExpandableSection>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default ReportsPage;
