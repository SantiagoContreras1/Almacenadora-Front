import { useState } from "react";
import { Login } from "../components/auth/Login.jsx";
import { Register } from "../components/auth/Register.jsx";
import { Center, Stack } from "@chakra-ui/react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <Center minH="100vh" bg="gray.100" p="6">
      <Stack spacing="4" align="center" w="full" maxW="md">
        {isLogin ? <Login toggleAuthMode={toggleAuthMode} /> : <Register toggleAuthMode={toggleAuthMode} />}
      </Stack>
    </Center>
  );
};

export default AuthPage
