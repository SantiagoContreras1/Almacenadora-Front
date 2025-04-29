import {
  Card,
  CardBody,
  Image,
  Heading,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/producto/${product.uid}`);
  };

  return (
    <Card
      maxW="sm"
      boxShadow="md"
      _hover={{ boxShadow: "xl" }}
      transition="0.2s"
    >
      <CardBody p="3">
        <Box onClick={handleCardClick} cursor="pointer">
          <Image
            src={product.imageUrl || "https://via.placeholder.com/150"}
            alt={product.name}
            borderRadius="md"
            mb="2"
            objectFit="cover"
            height="150px"
            width="100%"
          />
          <Heading size="sm" noOfLines={1} mb="1">
            {product.name}
          </Heading>
          <Text fontWeight="bold" color="teal.500">
            Q{product.price?.toFixed(2) || "0.00"}
          </Text>
        </Box>

        <Box mt="3" display="flex" justifyContent="space-between">
          <Button size="sm" colorScheme="blue" onClick={onEdit}>
            Editar
          </Button>
          <Button size="sm" colorScheme="red" onClick={onDelete}>
            Eliminar
          </Button>
        </Box>
      </CardBody>
    </Card>
  );
};
