import { Box, useColorModeValue } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const InventoryMovementsReport = ({ movements }) => {
  const bg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  if (!movements || movements.length === 0) {
    return <Box p={4} color={textColor}>No hay datos para mostrar.</Box>;
  }

  return (
    <Box p={4} bg={bg} borderRadius="md" boxShadow="md" mt={6} height="400px" borderWidth="1px" borderColor={borderColor}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={movements}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="entradas" fill="#3182CE" name="Entradas" />
          <Bar dataKey="salidas" fill="#E53E3E" name="Salidas" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default InventoryMovementsReport;