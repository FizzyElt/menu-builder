import { useState } from 'react';
import {
  Container,
  Box,
  VStack,
  Flex,
  Spacer,
  Heading,
  Text,
  Divider,
  IconButton,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

import CreateCategoryModal from '~/components/CategoryModal/CreateCategoryModal';
import UpdateCategoryModal from '~/components/CategoryModal/UpdateCategoryModal';

import useCategoryStore from '~/store/categories';
import useMenuStore from '~/store/menus';
import { identity, prop } from 'ramda';
import { v4 as uuid } from 'uuid';

import { Category } from '~/type';
import { EditCategoryForm } from '~/components/CategoryModal/CategoryFormModal';

export default function Categories() {
  const createModalDisclosure = useDisclosure();
  const updateModalDisclosure = useDisclosure();

  const removeCategoryFromMenus = useMenuStore(prop('removeCategory'));
  const { categories, createCategory, updateCategory, deleteCategory } = useCategoryStore(identity);

  const [category, setCategory] = useState<Category | undefined>();

  const handleCreateCategory = (data: EditCategoryForm) => {
    createCategory({
      id: uuid(),
      name: data.name,
      items: [],
    });
    createModalDisclosure.onClose();
  };

  const handleUpdateCategory = (data: EditCategoryForm) => {
    if (!category) return;

    updateCategory({
      ...category,
      name: data.name,
    });

    updateModalDisclosure.onClose();
  };

  const handleDeleteCategory = (id: string) => () => (
    deleteCategory(id), removeCategoryFromMenus(id)
  );

  return (
    <>
      <Box>
        <Container maxW="30rem" py={6}>
          <VStack align="stretch">
            <Flex align="center" px={4}>
              <Heading fontSize="lg">Categories</Heading>
              <Spacer />
              <IconButton
                aria-label="create category"
                size="sm"
                icon={<AddIcon />}
                onClick={createModalDisclosure.onOpen}
              />
            </Flex>
            <Divider />
            {categories.map((category) => (
              <Box key={category.id} py={2} px={4}>
                <Flex align="center">
                  <Text>{category.name}</Text>
                  <Spacer />
                  <HStack>
                    <IconButton
                      aria-label="update category"
                      size="sm"
                      rounded="full"
                      variant="ghost"
                      icon={<EditIcon />}
                      onClick={() => (updateModalDisclosure.onOpen(), setCategory(category))}
                    />
                    <IconButton
                      aria-label="delete category"
                      size="sm"
                      rounded="full"
                      variant="ghost"
                      colorScheme="red"
                      icon={<DeleteIcon />}
                      onClick={handleDeleteCategory(category.id)}
                    />
                  </HStack>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Container>
      </Box>

      <CreateCategoryModal
        isOpen={createModalDisclosure.isOpen}
        onClose={createModalDisclosure.onClose}
        onSubmit={handleCreateCategory}
      />
      <UpdateCategoryModal
        isOpen={updateModalDisclosure.isOpen}
        onClose={updateModalDisclosure.onClose}
        category={category}
        onSubmit={handleUpdateCategory}
      />
    </>
  );
}
