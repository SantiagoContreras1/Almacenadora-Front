import { Box, Grid, Flex, useColorModeValue, VStack } from "@chakra-ui/react";
import { FiBox, FiDollarSign, FiRepeat, FiAlertTriangle } from "react-icons/fi";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import { AlertSection } from "./AlertSection";
import { ChartContainer } from "./ChartContainer";
import { MovementsTable } from "./MovementsTable";
import { ProductsTable } from "./ProductsTable";
import { SideBar } from "./SideBar";
import { StatCard } from "./StatCard";
import { TopBar } from "./TopBar";

const productData = [
  {
    id: 1,
    name: "Cemento Portland Tipo I",
    category: "Construcción",
    currentStock: 5,
    minStock: 10,
    status: "Crítico",
  },
  {
    id: 2,
    name: 'Varillas de Hierro 1/2"',
    category: "Metales",
    currentStock: 12,
    minStock: 20,
    status: "Bajo",
  },
  {
    id: 3,
    name: 'Tubería PVC 4"',
    category: "Plomería",
    currentStock: 15,
    minStock: 25,
    status: "Bajo",
  },
  {
    id: 4,
    name: "Pintura Blanca Interior",
    category: "Pinturas",
    currentStock: 8,
    minStock: 15,
    status: "Bajo",
  },
  {
    id: 5,
    name: "Bloques de Cemento 20cm",
    category: "Construcción",
    currentStock: 35,
    minStock: 50,
    status: "Bajo",
  },
];

const movementData = [
  {
    id: 1,
    product: 'Varillas de Hierro 3/8"',
    type: "Entrada",
    quantity: 200,
    user: "Juan Pérez",
    date: "26/04/2025",
  },
  {
    id: 2,
    product: "Cemento Portland Tipo I",
    type: "Salida",
    quantity: 15,
    user: "María López",
    date: "26/04/2025",
  },
  {
    id: 3,
    product: "Lámina Galvanizada 8'",
    type: "Entrada",
    quantity: 50,
    user: "Carlos Rodríguez",
    date: "25/04/2025",
  },
  {
    id: 4,
    product: "Pintura Blanca Interior",
    type: "Salida",
    quantity: 12,
    user: "Ana Ramírez",
    date: "25/04/2025",
  },
  {
    id: 5,
    product: 'Tubería PVC 4"',
    type: "Salida",
    quantity: 8,
    user: "Pedro Gómez",
    date: "24/04/2025",
  },
];

const alertData = [
  {
    id: 1,
    type: "danger",
    title: 'Stock crítico de "Cemento Portland Tipo I"',
    message: "El stock ha bajado a 5 unidades (por debajo del mínimo de 10)",
    time: "Hace 2 horas",
  },
  {
    id: 2,
    type: "warning",
    title: "Productos próximos a vencer",
    message: "3 productos vencerán en los próximos 15 días",
    time: "Hace 5 horas",
  },
  {
    id: 3,
    type: "info",
    title: "Nueva entrada de inventario",
    message: 'Se han registrado 200 unidades de "Varillas de hierro 3/8"',
    time: "Ayer",
  },
];

const inventoryMovementData = [
  { name: "Semana 1", entradas: 120, salidas: 85 },
  { name: "Semana 2", entradas: 95, salidas: 110 },
  { name: "Semana 3", entradas: 135, salidas: 90 },
  { name: "Semana 4", entradas: 65, salidas: 85 },
];

const topSellingProductsData = [
  { name: "Cemento Portland Tipo I", value: 450 },
  { name: 'Varillas de Hierro 1/2"', value: 320 },
  { name: 'Tubería PVC 4"', value: 290 },
  { name: "Pintura Blanca Interior", value: 270 },
  { name: "Bloques de Cemento 20cm", value: 250 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const AdminDashboard = () => {
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
            value="1,458"
            change={5.2}
            icon={FiBox}
            color="blue.500"
          />
          <StatCard
            title="Valor de Inventario"
            value="Q456,789"
            change={3.8}
            icon={FiDollarSign}
            color="green.500"
          />
          <StatCard
            title="Movimientos Hoy"
            value="47"
            change={-2.1}
            icon={FiRepeat}
            color="purple.500"
          />
          <StatCard
            title="Productos Stock Bajo"
            value="23"
            change={12}
            icon={FiAlertTriangle}
            color="red.500"
          />
        </Grid>

        <AlertSection alerts={alertData} />

        <Box width="100%" mb="6" height="400px">
          <ChartContainer title="Movimientos de Inventario">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryMovementData}>
                <defs>
                  <linearGradient
                    id="colorEntradas"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3182CE" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3182CE" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="colorSalidas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E53E3E" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#E53E3E" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="entradas"
                  fill="url(#colorEntradas)"
                  name="Entradas"
                />
                <Bar
                  dataKey="salidas"
                  fill="url(#colorSalidas)"
                  name="Salidas"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Box>

        <Box width="100%" mb="6" height="400px">
          <ChartContainer title="Productos Más Vendidos">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topSellingProductsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {topSellingProductsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Box>

        
        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
          gap="6"
          mb="6"
        >
          <ProductsTable
            products={productData}
            title="Productos con Stock Bajo"
          />
          <MovementsTable
            movements={movementData}
            title="Últimos Movimientos"
          />
        </Grid>
      </Box>
    </Flex>
  );
};

export default AdminDashboard;
