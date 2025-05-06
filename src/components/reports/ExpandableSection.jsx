import { Box, Button, Collapse, Heading, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

const ExpandableSection = ({ title, children }) => {
  const [showMore, setShowMore] = useState(false);
  const bg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("teal.600", "teal.300");

  return (
    <Box bg={bg} boxShadow="md" borderRadius="xl" p={5} mb={6} borderWidth="1px" borderColor={borderColor}>
      <Heading size="md" mb={4} color={titleColor}>{title}</Heading>
      <Collapse startingHeight={200} in={showMore}>
        {children}
      </Collapse>
      <Button 
        size="sm" 
        mt={3} 
        onClick={() => setShowMore(!showMore)} 
        colorScheme="blue" 
        variant="ghost"
      >
        {showMore ? "Mostrar menos" : "Mostrar más"}
      </Button>
    </Box>
  );
};

export default ExpandableSection;