import { useState } from 'react';
import {
  Container,
  Box,
  VStack,
  IconButton,
  Heading,
  Flex,
  Spacer,
  HStack,
  Text,
  Divider,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import CreateMenuModal from '~/components/MenuModal/CreateMenuModal';
import UpdateMenuModal from '~/components/MenuModal/UpdateMenuModal';

import { identity } from 'ramda';
import { v4 as uuid } from 'uuid';

import useMenuStore from '~/store/menus';

import { Menu } from '~/type';
import { EditMenuForm } from '~/components/MenuModal/MenuFormModal';

export default function Menus() {
  const createModalDisclosure = useDisclosure();
  const updateModalDisclosure = useDisclosure();

  const { menus, createMenu, deleteMenu, updateMenu } = useMenuStore(identity);

  const [menu, setMenu] = useState<Menu | undefined>();

  const handleCreateMenu = (data: EditMenuForm) => {
    createMenu({
      id: uuid(),
      name: data.name,
      categories: [],
    });
    createModalDisclosure.onClose();
  };

  const handleUpdateMenu = (data: EditMenuForm) => {
    if (!menu) return;

    updateMenu({
      ...menu,
      name: data.name,
    });
    updateModalDisclosure.onClose();
  };

  return (
    <>
      <Box>
        <Container maxW="30rem" py={6}>
          <VStack align="stretch">
            <Flex align="center" px={4}>
              <Heading fontSize="lg">Menus</Heading>
              <Spacer />
              <IconButton
                size="sm"
                aria-label="create menu"
                icon={<AddIcon />}
                onClick={createModalDisclosure.onOpen}
              />
            </Flex>
            <Divider />
            {menus.map((menu) => (
              <Box key={menu.id} py={2} px={4} bgColor="blue.50" rounded="md">
                <Flex align="center">
                  <Text>{menu.name}</Text>
                  <Spacer />
                  <HStack>
                    <IconButton
                      size="sm"
                      rounded="full"
                      variant="ghost"
                      aria-label="update menu"
                      icon={<EditIcon />}
                      onClick={() => (updateModalDisclosure.onOpen(), setMenu(menu))}
                    />
                    <IconButton
                      size="sm"
                      rounded="full"
                      colorScheme="red"
                      variant="ghost"
                      aria-label="delete menu"
                      icon={<DeleteIcon />}
                      onClick={() => deleteMenu(menu.id)}
                    />
                  </HStack>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Container>
      </Box>

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
