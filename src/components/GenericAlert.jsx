import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
  } from "@chakra-ui/react";
  
  export const GenericAlert = ({
    isOpen,
    onClose,
    cancelRef,
    onConfirm,
    title,
    description,
    confirmButtonText,
    confirmButtonColor = "red",
  }) => {
    return (
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>
  
            <AlertDialogBody>
              {description}
            </AlertDialogBody>
  
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme={confirmButtonColor} onClick={onConfirm} ml={3}>
                {confirmButtonText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  };