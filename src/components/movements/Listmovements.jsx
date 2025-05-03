import {
  Box,
  Flex,
  Text,
  IconButton,
  VStack,
  useDisclosure,
  Badge,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRef, useState } from "react";
import { GenericAlert } from "../GenericAlert";

const Listmovements = ({ movements, onEdit, onDelete }) => {
  const [selectedMovement, setSelectedMovement] = useState(null);
  const cancelRef = useRef();

  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose,
  } = useDisclosure();

  const handleDeleteClick = (movement) => {
    setSelectedMovement(movement);
    onDeleteAlertOpen();
  };

  const handleConfirmDelete = () => {
    if (selectedMovement) {
      onDelete(selectedMovement.id, selectedMovement.type);
      onDeleteAlertClose();
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch (e) {
      console.error("Error formateando fecha:", e);
      return "";
    }
  };

  return (
    <>
      <VStack spacing={4} align="stretch" p={4}>
        {movements.map((movement) => (
          <Box key={movement.id} p={4} borderWidth="1px" borderRadius="md">
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontWeight="bold">{movement.productName}</Text>
                <Text fontSize="sm" color="gray.500">
                  Cantidad: {movement.quantity}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Fecha: {formatDate(movement.date)}
                </Text>
                {movement.type === 'Salida' ? <><Text fontSize="sm" color="gray.500">Razon: {movement.reason} </Text> <Text fontSize="sm" color="gray.500">Destino: {movement.destination}</Text></> : null}
                <Badge
                  colorScheme={movement.type === "Entrada" ? "green" : "red"}
                  mt={1}
                >
                  {movement.type}
                </Badge>
              </Box>
              <Box>
                <IconButton
                  aria-label="Editar movimiento"
                  icon={<FaEdit />}
                  colorScheme="blue"
                  mr={2}
                  onClick={() => onEdit(movement)}
                />
                <IconButton
                  aria-label="Eliminar movimiento"
                  icon={<FaTrash />}
                  colorScheme="red"
                  onClick={() => handleDeleteClick(movement)}
                />
              </Box>
            </Flex>
          </Box>
        ))}
        {movements.length === 0 && (
          <Text color="gray.500" align="center">
            No hay movimientos para mostrar.
          </Text>
        )}
      </VStack>

      <GenericAlert
        isOpen={isDeleteAlertOpen}
        onClose={onDeleteAlertClose}
        cancelRef={cancelRef}
        onConfirm={handleConfirmDelete}
        title="Eliminar Movimiento"
        description={
          <>
            ¿Está seguro que desea eliminar el movimiento del producto{" "}
            <strong>{selectedMovement?.productName}</strong>? Esta acción no se puede
            deshacer.
          </>
        }
        confirmButtonText="Eliminar"
        confirmButtonColor="red"
      />
    </>
  );
};

export default Listmovements;