import { Box, Heading } from "@chakra-ui/react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const ProductStatistics = ({ stats }) => {
  return (
    <Box p={4} bg="white" borderRadius="xl" boxShadow="md" mt={6}>
      <Heading size="md" mb={4}>Estadísticas de Productos</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={stats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="productName" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="movements" fill="#3182ce" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ProductStatistics;
