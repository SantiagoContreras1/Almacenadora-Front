import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3182CE", "#E53E3E", "#38A169", "#D69E2E", 
  "#805AD5", "#0BC5EA", "#F6AD55", "#F687B3"
];

const InventoryValueChart = ({ products }) => {
  const bg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("teal.600", "teal.300");


  const data = products.map(p => ({
    name: p.name,
    value: p.price * p.stock,
    unitPrice: p.price,
    stock: p.stock
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value, unitPrice, stock } = payload[0].payload;
      return (
        <Box 
          bg={useColorModeValue("white", "gray.800")}
          p={3} 
          borderRadius="md" 
          borderWidth="1px"
          borderColor={borderColor}
          boxShadow="md"
          color={textColor}
        >
          <p><strong>{name}</strong></p>
          <p>Stock: {stock} unidades</p>
          <p>Precio unitario: Q{unitPrice.toFixed(2)}</p>
          <p>Valor total: Q{value.toFixed(2)}</p>
          <p>Porcentaje: {(payload[0].payload.percent * 100).toFixed(1)}%</p>
        </Box>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="12px"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <Box p={4} bg={bg} borderRadius="xl" boxShadow="md" mt={6} borderWidth="1px" borderColor={borderColor}>
      <Heading size="md" mb={4} color={titleColor}>Distribución del Valor del Inventario</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell 
                key={index} 
                fill={COLORS[index % COLORS.length]} 
                stroke={useColorModeValue("#fff", "gray.800")}
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            formatter={(value, entry, index) => data[index].name}
            wrapperStyle={{
              paddingTop: "20px"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default InventoryValueChart;