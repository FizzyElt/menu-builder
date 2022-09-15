import { useMemo, useState } from 'react';
import { Heading, VStack, Divider, Flex, Spacer, IconButton } from '@chakra-ui/react';
import { AddIcon, ViewIcon, EditIcon } from '@chakra-ui/icons';
import CategoryList from './CategoryList';
import CategoryCheckboxList from './CategoryCheckboxList';

import { useParams, Navigate } from 'react-router-dom';
import useMenuStore from '~/store/menus';

import { props, propEq, identity, partition, isNil, equals, cond, always, pick } from 'ramda';
import useCategoryStore from '~/store/categories';

import { v4 as uuid } from 'uuid';

export default function CategoryBoard() {
  const { menuId = '' } = useParams();
  const { menus, updateMenu } = useMenuStore(pick(['menus', 'updateMenu']));
  const { categories, createCategory } = useCategoryStore(identity);

  const [mode, setMode] = useState<'view' | 'edit'>('view');

  const menu = useMemo(() => {
    return menus.find(propEq('id', menuId));
  }, [menuId, menus]);

  const [menuCategories, restOfCategories] = useMemo(() => {
    const idSet = new Set(menu?.categories || []);

    return partition(({ id }) => idSet.has(id), categories);
  }, [menu?.categories, categories]);

  const handleCreateCategory = () => {
    createCategory({
      id: uuid(),
      name: 'test category',
      items: [],
    });
  };

  const handleUpdateMenuCategories = (categories: Array<string>) => {
    updateMenu({
      id: menu?.id || '',
      name: menu?.name || '',
      categories,
    });
  };

  if (isNil(menu)) {
    return <Navigate to="../" />;
  }

  return (
    <VStack w="20rem" py={4} h="100%" align="stretch" rounded="md" bgColor="cyan.50">
      <Flex px={5} align="center">
        <Heading fontSize="lg">Categories</Heading>
        <Spacer />
        <IconButton
          aria-label="create category"
          size="sm"
          icon={equals(mode, 'view') ? <EditIcon /> : <ViewIcon />}
          onClick={() => setMode((prev) => (equals(prev, 'view') ? 'edit' : 'view'))}
        />
      </Flex>
      <Divider />
      {cond([
        [equals('view'), always(<CategoryList categories={menuCategories} />)],
        [
          equals('edit'),
          always(
            <CategoryCheckboxList
              categories={categories}
              categoryIds={menu.categories}
              onUpdateCategories={handleUpdateMenuCategories}
            />
          ),
        ],
      ])(mode)}
    </VStack>
  );
}
