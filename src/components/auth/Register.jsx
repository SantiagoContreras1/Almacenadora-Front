import { useForm } from "react-hook-form";
import {
  Center,
  Stack,
  VStack,
  Heading,
  Text,
  Button,
  Input,
  FormControl,
  FormErrorMessage,
  useToast,
  Card,
  Box,
} from "@chakra-ui/react";

export const Register = ({ toggleAuthMode }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const toast = useToast();
  const password = watch("password");

  const onSubmit = (data) => {
    console.log(data);
    toast({
      title: "Register successful!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setTimeout(() => {
      toggleAuthMode();
    }, 1000);
  };

  return (
    <Box
      minH="100dvh"
      bg="gray.100"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      overflow="hidden"
    >
      <Card
        w={{ base: "full", md: "4xl" }}
        maxW="4xl"
        p="8"
        boxShadow="lg"
        maxH="calc(100dvh - 2rem)" // <= el truco: que el Card nunca sea más alto que la pantalla
        overflowY="auto" // <= solo el Card puede hacer scroll interno si es necesario
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing="8"
          align="center"
          justify="center"
          w="full"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%" }}
          >
            <VStack spacing="6" w={{ base: "full", md: "400px" }}>
              <Heading as="h1" size="lg" textAlign="center">
                Register
              </Heading>

              <FormControl isInvalid={errors.username}>
                <Input
                  placeholder="Username"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 8,
                      message: "The username must have at least 8 characters.",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.email}>
                <Input
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <Input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "The password must have at least 8 characters",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.confirmPass}>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPass", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <FormErrorMessage>
                  {errors.confirmPass && errors.confirmPass.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                isDisabled={!isValid}
              >
                Register
              </Button>

              <Text textAlign="center">
                Already have an account?{" "}
                <Button
                  variant="link"
                  colorScheme="purple"
                  onClick={toggleAuthMode}
                >
                  Login
                </Button>
              </Text>
            </VStack>
          </form>

          <VStack w={{ base: "full", md: "400px" }} spacing="4" align="center">
            <Heading as="h2" size="md">
              Welcome Back!
            </Heading>
            <Text fontSize="md" color="gray.600" textAlign="center">
              Enter all the data to register
            </Text>
          </VStack>
        </Stack>
      </Card>
    </Box>
  );
};
