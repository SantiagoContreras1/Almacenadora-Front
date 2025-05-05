import {
  Flex,
  Box,
  Center,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

const AlertIcon = ({ type }) => {
  const bgColor =
    {
      warning: "orange.100",
      danger: "red.100",
      info: "blue.100",
    }[type] || "gray.100";

  const textColor =
    {
      warning: "orange.500",
      danger: "red.500",
      info: "blue.500",
    }[type] || "gray.500";


  let iconEmoji;
  switch(type) {
    case 'warning':
      iconEmoji = "⏱️";
      break;
    case 'danger':
      iconEmoji = "⚠️";
      break;
    default:
      iconEmoji = "ℹ️";
  }

  return (
    <Center
      w="10"
      h="10"
      borderRadius="full"
      bg={bgColor}
      color={textColor}
      fontSize="lg"
    >
      {iconEmoji}
    </Center>
  );
};

export const AlertItem = ({ type, title, message, time }) => {
  return (
    <Flex
      py="3"
      borderBottomWidth="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      align="center"
    >
      <AlertIcon type={type} />
      <Stack flex="1" spacing="0" pl="4">
        <Text fontWeight="medium">{title}</Text>
        <Text fontSize="sm" color="gray.500">
          {message}
        </Text>
      </Stack>
      <Text fontSize="xs" color="gray.500" whiteSpace="nowrap">
        {time}
      </Text>
    </Flex>
  );
};
