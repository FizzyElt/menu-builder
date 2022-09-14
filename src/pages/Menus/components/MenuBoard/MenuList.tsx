import { Box, VStack, Button } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { Menu } from '~/type';

interface MenuListProps {
  menus: Array<Menu>;
}

export default function MenuList({ menus }: MenuListProps) {
  return (
    <Box h="100%" overflowY="auto" p={2}>
      <VStack align="stretch">
        {menus.map((menu) => (
          <Button
            key={menu.id}
            variant="ghost"
            justifyContent="flex-start"
            leftIcon={<DeleteIcon />}
          >
            {menu.name}
          </Button>
        ))}
      </VStack>
    </Box>
  );
}
