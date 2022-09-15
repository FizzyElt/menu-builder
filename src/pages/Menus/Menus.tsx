import { Box, HStack } from '@chakra-ui/react';
import MenuBoard from './components/MenuBoard';
import { Outlet } from 'react-router-dom';

export default function Menus() {
  return (
    <Box h="100vh">
      <HStack align="flex-start" h="100%">
        <MenuBoard />
        <Outlet />
      </HStack>
    </Box>
  );
}
