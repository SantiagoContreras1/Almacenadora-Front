import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import {
  PieChart, Pie, ResponsiveContainer, Cell
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c", "#d0ed57"];

const ProductStatistics = ({ products }) => {
  const bg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("teal.600", "teal.300");

  const chartData = products.map(product => ({
    name: product.name,
    value: product.ventas
  }));

  return (
    <Box p={4} bg={bg} borderRadius="xl" boxShadow="md" mt={6} borderWidth="1px" borderColor={borderColor}>
      <Heading size="md" mb={4} color={titleColor}>Estadísticas de Productos</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
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
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ProductStatistics;