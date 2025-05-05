import {
  Box,
  Flex,
  Text,
  IconButton,
  VStack,
  HStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { GenericAlert } from "../GenericAlert";

const CategoryList = ({ categories, onEdit, onDelete }) => {
  const bgItem = useColorModeValue("gray.50", "gray.700");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const cancelRef = useRef();

  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose,
  } = useDisclosure();

  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    onDeleteAlertOpen();
  };

  const handleConfirmDelete = () => {
    if (selectedCategory) {
      onDelete(selectedCategory.uid, selectedCategory.name);
      onDeleteAlertClose();
    }
  };

  if (!categories.length) {
    return (
      <Box p={6} textAlign="center">
        <Text color="gray.500">No hay categorias para mostrar.</Text>
      </Box>
    );
  }

  return (
    <>
      <VStack align="stretch" spacing={0}>
        {categories.map((category, index) => (
          <Box
            key={category.uid || index}
            p={4}
            _hover={{ bg: bgItem }}
            borderBottom="1px solid"
            borderColor="gray.200"
          >
            <Flex justify="space-between" align="center">
              <HStack>
                <Box>
                  <HStack>
                    <Text fontWeight="bold">{category.name}</Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.500">
                    Descripción: {category.description}
                  </Text>
                </Box>
              </HStack>
              {isAdmin && (
                <HStack>
                  <IconButton
                    aria-label="Editar categoria"
                    icon={<FaEdit />}
                    colorScheme="blue"
                    variant="ghost"
                    onClick={() => onEdit(category)}
                  />
                  <IconButton
                    aria-label="Eliminar categoria"
                    icon={<FaTrash />}
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => handleDeleteClick(category)}
                  />
                </HStack>
              )}
            </Flex>
          </Box>
        ))}
      </VStack>

      <GenericAlert
        isOpen={isDeleteAlertOpen}
        onClose={onDeleteAlertClose}
        cancelRef={cancelRef}
        onConfirm={handleConfirmDelete}
        title="Eliminar Categoría"
        description={
          <>
            ¿Está seguro que desea eliminar la categoría{" "}
            <strong>{selectedCategory?.name}</strong>? Esta acción no se puede deshacer.
          </>
        }
        confirmButtonText="Eliminar"
        confirmButtonColor="red"
      />
    </>
  );
};

export default CategoryList;
