import {
  Card,
  CardBody,
  Image,
  Heading,
  Text,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { ProductDetailModal } from "./ProductDetailModal";
import { GenericAlert } from "../GenericAlert";

export const ProductCard = ({ product, onEdit, onDelete }) => {
  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose,
  } = useDisclosure();

  const {
    isOpen: isDetailModalOpen,
    onOpen: onDetailModalOpen,
    onClose: onDetailModalClose,
  } = useDisclosure();

  const cancelRef = useRef();

  const handleCardClick = () => onDetailModalOpen();

  const handleDelete = () => {
    onDelete(product.uid, product.name);
    onDeleteAlertClose();
  };

  return (
    <>
      <Card
        maxW="sm"
        boxShadow="md"
        _hover={{ boxShadow: "xl" }}
        transition="0.2s"
      >
        <CardBody p="3">
          <Box onClick={handleCardClick} cursor="pointer">
            <Image
              src={product.image || "https://via.placeholder.com/150"}
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
            <Button size="sm" colorScheme="red" onClick={onDeleteAlertOpen}>
              Eliminar
            </Button>
          </Box>
        </CardBody>
      </Card>

      <ProductDetailModal
        isOpen={isDetailModalOpen}
        onClose={onDetailModalClose}
        product={product}
        onEdit={onEdit}
      />

      <GenericAlert
        isOpen={isDeleteAlertOpen}
        onClose={onDeleteAlertClose}
        cancelRef={cancelRef}
        onConfirm={handleDelete}
        title="Eliminar Producto"
        description={
          <>
            ¿Está seguro que desea eliminar el producto{" "}
            <strong>{product.name}</strong>? Esta acción no se puede deshacer.
          </>
        }
        confirmButtonText="Eliminar"
        confirmButtonColor="red"
      />
    </>
  );
};
