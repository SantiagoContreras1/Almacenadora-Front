import {
  Card,
  CardBody,
  Image,
  Heading,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";

export const ProductCard = ({ product, onEdit, onMovement }) => {
  return (
    <Card boxShadow="md" _hover={{ boxShadow: "xl" }}>
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          borderTopRadius="md"
        />
      ) : (
        <Image borderTopRadius="md" />
      )}
      <CardBody>
        <Heading size="md" mb="2">
          {product.name}
        </Heading>
        <Text>Categoría: {product.category}</Text>
        <Text>Stock: {product.stock}</Text>
        <Text>Proveedor: {product.supplier}</Text>
        <Text>Fecha Entrada: {product.entrada || product.entryDate}</Text>
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
          <Button
            size="sm"
            colorScheme="purple"
            onClick={onMovement}
          >
            Movimientos
          </Button>
        </Box>
      </CardBody>
    </Card>
  );
};

