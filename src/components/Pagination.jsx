import React from "react";
import {
  Flex,
  Button,
  Text,
  HStack,
  Select,
  useColorModeValue
} from "@chakra-ui/react";
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 25, 50, 100],
  showItemCount = false,
  compact = false
}) => {
  const textColor = useColorModeValue("gray.600", "gray.300");
  
  // Calcular el rango de elementos mostrados
  const firstItem = Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1);
  const lastItem = Math.min(totalItems, currentPage * itemsPerPage);

  return (
    <Flex 
      justify="center" 
      align="center" 
      width="100%" 
      mt={6}
      direction={{ base: "column", md: "row" }}
      gap={3}
    >
      {!compact && onItemsPerPageChange && (
        <HStack spacing={2} mr={{ base: 0, md: 4 }}>
          <Text fontSize="sm" color={textColor}>
            Mostrar:
          </Text>
          <Select
            size="sm"
            width="80px"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            {itemsPerPageOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </HStack>
      )}

      <HStack spacing={4}>
        <Button
          size={compact ? "sm" : "md"}
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          colorScheme="teal"
          variant="outline"
        >
          Anterior
        </Button>
        
        <Text fontSize={compact ? "sm" : "md"} color={textColor}>
          Página {currentPage} de {totalPages || 1}
        </Text>
        
        <Button
          size={compact ? "sm" : "md"}
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
          colorScheme="teal"
          variant="outline"
        >
          Siguiente
        </Button>
      </HStack>

      {showItemCount && totalItems > 0 && (
        <Text fontSize="sm" color={textColor} ml={{ base: 0, md: 4 }}>
          Mostrando {firstItem} a {lastItem} de {totalItems} elementos
        </Text>
      )}
    </Flex>
  );
};

export default Pagination;