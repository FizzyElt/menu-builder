import { useState } from 'react';
import {
  Heading,
  VStack,
  Divider,
  Flex,
  Spacer,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import MenuList from './MenuList';
import CreateMenuModal from '~/components/MenuModal/CreateMenuModal';
import UpdateMenuModal from '~/components/MenuModal/UpdateMenuModal';

import useMenuStore from '~/store/menus';

import { identity, pipe, tap } from 'ramda';

import { v4 as uuid } from 'uuid';

import { EditMenuForm } from '~/components/MenuModal/MenuFormModal';
import { Menu } from '~/type';

export default function MenuBoard() {
  const createModalDisclosure = useDisclosure();
  const updateModalDisclosure = useDisclosure();
  const [menu, setMenu] = useState<Menu | undefined>();

  const { menus, createMenu, deleteMenu, updateMenu } = useMenuStore(identity);

  const handleCreateMenu = (data: EditMenuForm) => {
    createMenu({
      id: uuid(),
      name: data.name,
      categories: [],
    });
    createModalDisclosure.onClose();
  };

  const handleUpdateMenu = (data: EditMenuForm) => {
    updateMenu({
      id: menu?.id || '',
      name: data.name,
      categories: menu?.categories || [],
    });
    updateModalDisclosure.onClose();
  };

  return (
    <>
      <VStack w="20rem" py={4} h="100%" align="stretch" rounded="md" bgColor="cyan.50">
        <Flex px={5} align="center">
          <Heading fontSize="lg">Menus</Heading>
          <Spacer />
          <IconButton
            aria-label="create new menu"
            size="sm"
            icon={<AddIcon />}
            onClick={createModalDisclosure.onOpen}
          />
        </Flex>
        <Divider />
        <MenuList
          menus={menus}
          onDelete={deleteMenu}
          onEdit={pipe(tap(setMenu), tap(updateModalDisclosure.onOpen))}
        ></MenuList>
      </VStack>

      <CreateMenuModal
        isOpen={createModalDisclosure.isOpen}
        onClose={createModalDisclosure.onClose}
        onSubmit={handleCreateMenu}
      />

      <UpdateMenuModal
        isOpen={updateModalDisclosure.isOpen}
        onClose={updateModalDisclosure.onClose}
        onSubmit={handleUpdateMenu}
        menu={menu}
      />
    </>
  );
}
