import { VStack, Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <Box mx="auto" w="20rem">
      <VStack align="stretch">
        <Button as={Link} to="overview">
          Overview
        </Button>
        <Button as={Link} to="menus">
          Menus
        </Button>
        <Button as={Link} to="categories">
          Categories
        </Button>
        <Button as={Link} to="items">
          Items
        </Button>
        <Button as={Link} to="selections">
          Selections
        </Button>
      </VStack>
    </Box>
  );
}
