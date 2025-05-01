import { Box } from "@chakra-ui/react";
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

  if (!movements || movements.length === 0) {
    return <Box p={4}>No hay datos para mostrar.</Box>;
  }

  return (
    <Box p={4} bg="white" borderRadius="md" boxShadow="md" mt={6} height="400px">
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
