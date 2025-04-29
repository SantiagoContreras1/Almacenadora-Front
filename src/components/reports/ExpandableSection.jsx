
import { Box, Button, Collapse, Heading } from "@chakra-ui/react";
import { useState } from "react";

const ExpandableSection = ({ title, children }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Box bg="white" boxShadow="md" borderRadius="xl" p={5} mb={6}>
      <Heading size="md" mb={4}>{title}</Heading>
      <Collapse startingHeight={200} in={showMore}>
        {children}
      </Collapse>
      <Button size="sm" mt={3} onClick={() => setShowMore(!showMore)} colorScheme="blue" variant="ghost">
        {showMore ? "Mostrar menos" : "Mostrar más"}
      </Button>
    </Box>
  );
};

export default ExpandableSection;
