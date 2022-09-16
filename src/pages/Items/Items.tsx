import { useState } from 'react';
import {
  Container,
  Box,
  VStack,
  Flex,
  Heading,
  Divider,
  Spacer,
  IconButton,
  Text,
  useDisclosure,
  HStack,
  Square,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

import CreateItemModal from '~/components/ItemModal/CreateItemModal';
import UpdateItemModal from '~/components/ItemModal/UpdateItemModal';

import useItemStore from '~/store/items';
import useCategoryStore from '~/store/categories';

import { identity, prop } from 'ramda';
import { v4 as uuid } from 'uuid';

import { Item } from '~/type';
import { EditItemForm } from '~/components/ItemModal/ItemFormModal';

export default function Items() {
  const createModalDisclosure = useDisclosure();
  const updateModalDisclosure = useDisclosure();

  const { items, createItem, deleteItem, updateItem } = useItemStore(identity);
  const removeItemFromCategories = useCategoryStore(prop('removeItem'));

  const [item, setItem] = useState<Item | undefined>();

  const handleCreateItem = (data: EditItemForm) => {
    createItem({
      id: uuid(),
      name: data.name,
      description: data.description,
      price: Number(data.price),
      selections: [],
    });
    createModalDisclosure.onClose();
  };

  const handleUpdateItem = (data: EditItemForm) => {
    if (!item) return;
    updateItem({
      ...item,
      name: data.name,
      description: data.description,
      price: Number(data.price),
    });

    updateModalDisclosure.onClose();
  };

  const handleDeleteItem = (id: string) => () => (deleteItem(id), removeItemFromCategories(id));

  return (
    <>
      <Box>
        <Container maxW="30rem" py={6}>
          <VStack align="stretch">
            <Flex align="center" px={4}>
              <Heading fontSize="lg">Items</Heading>
              <Spacer />
              <IconButton
                aria-label="create item"
                size="sm"
                icon={<AddIcon />}
                onClick={createModalDisclosure.onOpen}
              />
            </Flex>
            <Divider />
            {items.map((item) => (
              <Box key={item.id}>
                <Flex align="center">
                  <Text>{item.name}</Text>
                  <Spacer />
                  <Square mr={4} rounded="base" px={2} bgColor="teal.50">
                    <Text>{item.price}</Text>
                  </Square>
                  <HStack>
                    <IconButton
                      aria-label="update item"
                      rounded="full"
                      size="sm"
                      variant="ghost"
                      icon={<EditIcon />}
                      onClick={() => (updateModalDisclosure.onOpen(), setItem(item))}
                    />
                    <IconButton
                      aria-label="delete item"
                      rounded="full"
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      icon={<DeleteIcon />}
                      onClick={handleDeleteItem(item.id)}
                    />
                  </HStack>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Container>
      </Box>

      <CreateItemModal
        isOpen={createModalDisclosure.isOpen}
        onClose={createModalDisclosure.onClose}
        onSubmit={handleCreateItem}
      />
      <UpdateItemModal
        isOpen={updateModalDisclosure.isOpen}
        onClose={updateModalDisclosure.onClose}
        onSubmit={handleUpdateItem}
        item={item}
      />
    </>
  );
}
