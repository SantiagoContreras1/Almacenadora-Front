import {
  Box,
  Flex,
  Text,
  IconButton,
  VStack,
  useDisclosure,
  HStack,
  Button,
  Tooltip,
  Badge
} from "@chakra-ui/react";
import { FaEdit, FaTrash, FaBox } from "react-icons/fa";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { GenericAlert } from "../GenericAlert";
import SupplierProducts from "./SupplierProducts";

const SupplierList = ({ suppliers, onEdit, onDelete }) => {
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const cancelRef = useRef();

  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose,
  } = useDisclosure();

  const {
    isOpen: isProductsModalOpen,
    onOpen: onProductsModalOpen,
    onClose: onProductsModalClose,
  } = useDisclosure();

  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const handleDeleteClick = (supplier) => {
    setSelectedSupplier(supplier);
    onDeleteAlertOpen();
  };

  const handleConfirmDelete = () => {
    if (selectedSupplier) {
      onDelete(selectedSupplier.uid, selectedSupplier.nombre);
      onDeleteAlertClose();
    }
  };

  const handleViewProducts = (supplier) => {
    setSelectedSupplier(supplier);
    onProductsModalOpen();
  };

  return (
    <>
      <VStack spacing={4} align="stretch" p={4}>
        {suppliers.map((supplier) => (
          <Box key={supplier.uid} p={4} borderWidth="1px" borderRadius="md">
            <Flex justify="space-between" align="center">
              <Box>
                <Flex align="center" gap={2}>
                  <Text fontWeight="bold">{supplier.nombre}</Text>
                  <Badge colorScheme="blue" fontSize="xs">
                    {supplier.productos?.length || 0} productos
                  </Badge>
                </Flex>
                <Text fontSize="sm" color="gray.500">
                  Contacto: {supplier.contacto} - {supplier.email}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Telefono: {supplier.telefono}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Direccion: {supplier.direccion}
                </Text>
              </Box>
              <HStack>
                <Tooltip label="Ver productos">
                  <IconButton
                    aria-label="Ver productos"
                    icon={<FaBox />}
                    colorScheme="teal"
                    onClick={() => handleViewProducts(supplier)}
                  />
                </Tooltip>
                {isAdmin && (
                  <>
                    <IconButton
                      aria-label="Editar"
                      icon={<FaEdit />}
                      colorScheme="blue"
                      onClick={() => onEdit(supplier)}
                    />
                    <IconButton
                      aria-label="Eliminar"
                      icon={<FaTrash />}
                      colorScheme="red"
                      onClick={() => handleDeleteClick(supplier)}
                    />
                  </>
                )}
              </HStack>
            </Flex>
          </Box>
        ))}
        {suppliers.length === 0 && (
          <Text color="gray.500" align="center">
            No hay proveedores para mostrar.
          </Text>
        )}
      </VStack>

      <GenericAlert
        isOpen={isDeleteAlertOpen}
        onClose={onDeleteAlertClose}
        cancelRef={cancelRef}
        onConfirm={handleConfirmDelete}
        title="Eliminar Proveedor"
        description={
          <>
            ¿Está seguro que desea eliminar el proveedor{" "}
            <strong>{selectedSupplier?.nombre}</strong>? Esta acción no se puede
            deshacer.
          </>
        }
        confirmButtonText="Eliminar"
        confirmButtonColor="red"
      />

      {selectedSupplier && (
        <SupplierProducts
          isOpen={isProductsModalOpen}
          onClose={onProductsModalClose}
          supplier={selectedSupplier}
        />
      )}
    </>
  );
};

export default SupplierList;