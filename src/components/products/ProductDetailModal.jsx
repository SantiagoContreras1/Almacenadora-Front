import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Box,
  Text,
  Heading,
  Grid,
  GridItem,
  Badge,
  Divider,
  Stack,
  Button,
} from "@chakra-ui/react";

const formatDate = (dateString) => {
  if (!dateString) return "No disponible";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch (e) {
    return "Fecha inválida";
  }
};

export const ProductDetailModal = ({ isOpen, onClose, product }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalles del Producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem colSpan={[2, 1]}>
              <Image
                src={product.image || "https://www.fifpro.org/media/ovzgbezo/messi_w11_2024.jpg"}
                alt={product.name}
                borderRadius="md"
                objectFit="cover"
                width="100%"
                maxHeight="300px"
              />
            </GridItem>
            <GridItem colSpan={[2, 1]}>
              <Stack spacing={3}>
                <Heading size="md">{product.name}</Heading>
                <Divider />
                <Box>
                  <Text fontWeight="bold" color="teal.500" fontSize="xl">
                    Q{product.price?.toFixed(2) || "0.00"}
                  </Text>
                  <Badge
                    colorScheme={product.stock > 0 ? "green" : "red"}
                    mt={2}
                  >
                    {product.stock > 0 ? "En stock" : "Agotado"}
                  </Badge>
                  <Text mt={2}>
                    Cantidad disponible: <strong>{product.stock || 0}</strong>
                  </Text>
                </Box>
              </Stack>
            </GridItem>

            <GridItem colSpan={2}>
              <Divider my={3} />
              <Heading size="sm" mb={2}>
                Información adicional
              </Heading>
              <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                <Box>
                  <Text fontWeight="bold">Categoría:</Text>
                  <Text>{product.category?.name || "No especificada"}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Proveedor:</Text>
                  <Text>{product.proveedor?.nombre || "No especificado"}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Fecha de entrada:</Text>
                  <Text>{formatDate(product.entrada)}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">ID del producto:</Text>
                  <Text fontSize="sm">{product.uid}</Text>
                </Box>
              </Grid>
            </GridItem>

            <GridItem colSpan={2}>
              <Box mt={3}>
                <Text fontWeight="bold">Descripción:</Text>
                <Text>
                  {product.description || "Sin descripción disponible."}
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
