import { Box, Grid, Flex, useColorModeValue, VStack } from "@chakra-ui/react";

import { MovementsTable } from "./MovementsTable";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";
import { useState, useEffect } from "react";
import { useMovements } from "../../shared/hooks/useMovements"






const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const AdminDashboard = () => {
  const { getMovements } = useMovements();
  const [movements, setMovements] = useState([])

  const fetchData = async () => {
    const movementsFromApi = await getMovements(10)
    if ( movementsFromApi) {
      setMovements(movementsFromApi.movements)
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
        <MovementsTable movements={movements} title="Últimos Movimientos" />
      </Box>
    </Flex>
  );
};

export default AdminDashboard;
