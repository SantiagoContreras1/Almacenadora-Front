import {
  Box,
  Flex,
  Text,
  IconButton,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { GenericAlert } from "../GenericAlert";

const SupplierList = ({ suppliers, onEdit, onDelete }) => {
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const cancelRef = useRef();

  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose,
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

  return (
    <>
      <VStack spacing={4} align="stretch" p={4}>
        {suppliers.map((supplier) => (
          <Box key={supplier.uid} p={4} borderWidth="1px" borderRadius="md">
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontWeight="bold">{supplier.nombre}</Text>
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
              {isAdmin && (
                <Box>
                  <IconButton
                    aria-label="Editar"
                    icon={<FaEdit />}
                    colorScheme="blue"
                    mr={2}
                    onClick={() => onEdit(supplier)}
                  />
                  <IconButton
                    aria-label="Eliminar"
                    icon={<FaTrash />}
                    colorScheme="red"
                    onClick={() => handleDeleteClick(supplier)}
                  />
                </Box>
              )}
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
    </>
  );
};

export default SupplierList;
