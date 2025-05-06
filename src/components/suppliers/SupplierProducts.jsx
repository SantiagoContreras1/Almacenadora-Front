import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    Flex,
    Heading,
    Divider,
    Icon,
    Skeleton,
    Alert,
    AlertIcon,
    HStack,
    Avatar
  } from "@chakra-ui/react";
  import { FaBox, FaTruck, FaInfoCircle } from "react-icons/fa";
  
  const SupplierProducts = ({ isOpen, onClose, supplier }) => {
    
    const products = supplier?.productos || [];
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack spacing={3}>
              <Avatar icon={<FaBox />} bg="teal.500" />
              <Box>
                <Heading size="md">Productos de {supplier?.nombre}</Heading>
                <Text fontSize="sm" color="gray.500">
                  Listado de productos suministrados por este proveedor
                </Text>
              </Box>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {products.length > 0 ? (
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Nombre</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products.map((product) => (
                    <Tr key={product._id}>
                      <Td>
                        <Text fontSize="xs" color="gray.500">
                          {product._id}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontWeight="medium">{product.name}</Text>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Flex
                direction="column"
                align="center"
                justify="center"
                py={10}
                color="gray.500"
              >
                <Icon as={FaInfoCircle} boxSize={10} mb={4} />
                <Text fontSize="lg" fontWeight="medium">
                  No hay productos asociados
                </Text>
                <Text align="center">
                  Este proveedor no tiene productos registrados en el sistema.
                </Text>
              </Flex>
            )}
          </ModalBody>
  
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  
  export default SupplierProducts