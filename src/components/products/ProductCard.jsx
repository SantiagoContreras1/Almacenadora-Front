import {
  Card,
  CardBody,
  Image,
  Heading,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";

export const ProductCard = ({ product, onEdit}) => {
  return (
    <Card boxShadow="md" _hover={{ boxShadow: "xl" }}>
      <CardBody>
        <Heading size="md" mb="2">
          {product.name}
        </Heading>
        <Text>Categoría: {product.category.name}</Text>
        <Text>Stock:{product.stock}</Text>
        <Text>Proveedor: {product.proveedor.nombre}</Text>
        <Text>Fecha Entrada: {new Date(product.entrada).toLocaleDateString()}</Text>
        <Text mb="2">Descripción: {product.description}</Text>

        <Box mt="4" display="flex" flexWrap="wrap" gap="2">
          <Button
            size="sm"
            colorScheme="blue"
            onClick={onEdit}
          >
            Editar
          </Button>
          <Button
            size="sm"
            colorScheme="red"
          >
            Eliminar
          </Button>
        </Box>
      </CardBody>
    </Card>
  );
};
