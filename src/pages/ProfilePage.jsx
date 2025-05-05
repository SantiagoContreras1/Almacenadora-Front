import { useSelector } from "react-redux";
import { SideBar } from "../components/dashboard/SideBar";
import { TopBar } from "../components/dashboard/TopBar";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Container,
  Card,
  CardBody,
  CardHeader,
  Stack,
  Avatar,
  Badge,
  Divider,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Edit2, Lock } from "lucide-react";
import { useUsers } from "../shared/hooks/useUsers";
import { useForm } from "react-hook-form";
import { checkEmail } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const { changePassword, updateUser } = useUsers();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: handleEditClose,
  } = useDisclosure();

  const {
    isOpen: isPasswordOpen,
    onOpen: onPasswordOpen,
    onClose: handlePasswordClose,
  } = useDisclosure();

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const accentColor = "teal.500";

  const {
    register: editRegister,
    handleSubmit: handleEditSubmit,
    reset: resetEditForm,
    formState: { errors: editErrors, isValid: isEditValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const {
    register: passRegister,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    watch: watchPassword,
    formState: { errors: passErrors, isValid: isPassValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmitEdit = (data) => {
    updateUser(user._id, data);
    resetEditForm();
    handleEditClose();
  };
  const handleLogout = () => {
    navigate("/auth");
    dispatch(logout());
  };

  const onSubmitPassword = (data) => {
    changePassword(user._id, data);
    resetPasswordForm();
    handleLogout()
    handlePasswordClose();
  };

  const closeEditModal = () => {
    resetEditForm();
    handleEditClose();
  };

  const closePasswordModal = () => {
    resetPasswordForm();
    handlePasswordClose();
  };

  const password = watchPassword("newPassword");

  return (
    <Box bg={bgColor} minH="100vh">
      <SideBar />
      <Box ml={{ base: 0, md: 60 }} transition="0.3s ease">
        <TopBar />
        <Container maxW="container.lg" py={8}>
          <Card bg={cardBg} boxShadow="md" borderRadius="lg">
            <CardHeader pb={0}>
              <Flex justify="space-between" align="center">
                <Heading size="md">Información del Perfil</Heading>
                <Button
                  leftIcon={<Edit2 size={16} />}
                  colorScheme="teal"
                  onClick={onEditOpen}
                >
                  Editar Perfil
                </Button>
              </Flex>
            </CardHeader>

            <CardBody>
              <Flex
                direction={{ base: "column", md: "row" }}
                align={{ base: "center", md: "start" }}
              >
                <Avatar
                  size="2xl"
                  name={user?.name || "Usuario"}
                  bg={accentColor}
                  color="white"
                  mb={{ base: 4, md: 0 }}
                  mr={{ md: 8 }}
                />

                <Stack spacing={4} flex="1">
                  <Box>
                    <Text color="gray.500" fontSize="sm">
                      Nombre
                    </Text>
                    <Text fontSize="lg" fontWeight="medium">
                      {user?.name || "Usuario"}
                    </Text>
                  </Box>

                  <Box>
                    <Text color="gray.500" fontSize="sm">
                      Email
                    </Text>
                    <Text fontSize="lg">
                      {user?.email || "usuario@ejemplo.com"}
                    </Text>
                  </Box>

                  <Box>
                    <Text color="gray.500" fontSize="sm">
                      Rol
                    </Text>
                    <Badge
                      colorScheme="teal"
                      fontSize="0.9em"
                      py={1}
                      px={2}
                      borderRadius="md"
                    >
                      {user?.role || "Usuario"}
                    </Badge>
                  </Box>

                  <Divider my={2} />

                  <Button
                    leftIcon={<Lock size={16} />}
                    variant="outline"
                    colorScheme="teal"
                    onClick={onPasswordOpen}
                    alignSelf="flex-start"
                  >
                    Cambiar Contraseña
                  </Button>
                </Stack>
              </Flex>
            </CardBody>
          </Card>
        </Container>

        <Modal isOpen={isEditOpen} onClose={closeEditModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Perfil</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleEditSubmit(onSubmitEdit)}>
              <ModalBody>
                <FormControl isInvalid={editErrors.name} mb={4}>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    {...editRegister("name", {
                      required: "El nombre es obligatorio",
                    })}
                  />
                  <FormErrorMessage>
                    {editErrors.name?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={editErrors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    {...editRegister("email", {
                      required: "El email es obligatorio",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Formato de email inválido",
                      },
                      validate: async (value) => {
                        if (value === user.email) return true;
                        const exists = await checkEmail(value);
                        return !exists || "Este email ya está en uso";
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {editErrors.email?.message}
                  </FormErrorMessage>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={closeEditModal}>
                  Cancelar
                </Button>
                <Button type="submit" colorScheme="teal" isDisabled={!isEditValid}>
                  Guardar Cambios
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>

        <Modal isOpen={isPasswordOpen} onClose={closePasswordModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cambiar Contraseña</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handlePasswordSubmit(onSubmitPassword)}>
              <ModalBody>
                <FormControl isInvalid={passErrors.currentPassword} mb={4}>
                  <FormLabel>Contraseña Actual</FormLabel>
                  <Input
                    type="password"
                    {...passRegister("currentPassword", {
                      required: "La contraseña actual es obligatoria",
                    })}
                  />
                  <FormErrorMessage>
                    {passErrors.currentPassword?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={passErrors.password} mb={4}>
                  <FormLabel>Nueva Contraseña</FormLabel>
                  <Input
                    type="password"
                    {...passRegister("password", {
                      required: "La nueva contraseña es obligatoria",
                      minLength: {
                        value: 8,
                        message:
                          "La contraseña debe tener al menos 8 caracteres",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {passErrors.password?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={passErrors.confirmPassword}>
                  <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                  <Input
                    type="password"
                    {...passRegister("confirmPassword", {
                      required: "Debes confirmar la contraseña",
                      validate: (value) =>
                        value === watchPassword("password") ||
                        "Las contraseñas no coinciden",
                    })}
                  />
                  <FormErrorMessage>
                    {passErrors.confirmPassword?.message}
                  </FormErrorMessage>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={closePasswordModal}>
                  Cancelar
                </Button>
                <Button type="submit" colorScheme="teal" isDisabled={!isPassValid}>
                  Actualizar Contraseña
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default ProfilePage;
