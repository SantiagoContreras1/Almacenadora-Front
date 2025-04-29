import { Box, Heading } from "@chakra-ui/react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const COLORS = ["#3182ce", "#63b3ed", "#90cdf4"];

const InventoryValueChart = ({ products }) => {
  const data = products.map(p => ({
    name: p.name,
    value: p.price * p.stock,
  }));

  return (
    <Box p={4} bg="white" borderRadius="xl" boxShadow="md" mt={6}>
      <Heading size="md" mb={4}>Distribución del Valor del Inventario</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default InventoryValueChart;
