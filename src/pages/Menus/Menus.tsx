import { Box, HStack } from '@chakra-ui/react';
import MenuBoard from './components/MenuBoard';
import CategoryBoard from './components/CategoryBoard';

export default function Menus() {
  return (
    <Box h="100vh">
      <HStack align="flex-start" h="100%">
        <MenuBoard />
        <CategoryBoard />
      </HStack>
    </Box>
  );
}
