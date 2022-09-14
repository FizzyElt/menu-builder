import { Heading, VStack, Divider, Flex, Spacer, IconButton, Icon } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import MenuList from './MenuList';

import useMenuStore from '~/store/menus';
import { identity } from 'ramda';

import { v4 as uuid } from 'uuid';

export default function MenuBoard() {
  const { menus, createMenu } = useMenuStore(identity);

  const handleCreateMenu = () => {
    createMenu({
      id: uuid(),
      name: 'test menu',
      categories: [],
    });
  };

  return (
    <VStack w="20rem" py={4} h="100%" align="stretch" borderRadius="md" bgColor="cyan.50">
      <Flex px={5} align="center">
        <Heading fontSize="lg">Menus</Heading>
        <Spacer />
        <IconButton
          aria-label="create new menu"
          size="sm"
          icon={<AddIcon />}
          onClick={handleCreateMenu}
        />
      </Flex>
      <Divider />
      <MenuList menus={menus}></MenuList>
    </VStack>
  );
}
