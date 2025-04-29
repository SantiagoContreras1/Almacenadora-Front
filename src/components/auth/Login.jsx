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
  Card,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useLogin } from "../../shared/hooks/useLogin";

export const Login = ({ toggleAuthMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const { login, isLoading } = useLogin();

  const onSubmit = (data) => {
    login(data.email, data.password);
  };

  return (
    <Center minH="100vh" bg="gray.100" p={4}>
      <Card w={{ base: "full", md: "4xl" }} p="8" boxShadow="lg">
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing="8"
          align="center"
          justify="center"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <VStack spacing="6">
              <Heading as="h1" size="lg" textAlign="center">
                Log in
              </Heading>

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
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                isDisabled={!isValid || isLoading}
                isLoading={isLoading}
              >
                Sign in
              </Button>

              <Text textAlign="center">
                Don't have an account?
                <Button
                  variant="link"
                  colorScheme="purple"
                  onClick={toggleAuthMode}
                >
                  Register
                </Button>
              </Text>
            </VStack>
          </form>

          <VStack w="full" maxW="400px" spacing="4" align="center">
            <Heading as="h2" size="md">
              Welcome Back!
            </Heading>
            <Text fontSize="md" color="gray.600" textAlign="center">
              Please enter your credentials to log in.
            </Text>
          </VStack>
        </Stack>
      </Card>
    </Center>
  );
};
