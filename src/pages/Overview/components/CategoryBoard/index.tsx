import { useMemo, useState } from 'react';

import Board from '~/components/Board';

import { useParams, Navigate } from 'react-router-dom';
import useMenuStore from '~/store/menus';

import { propEq, identity, isNil, pick } from 'ramda';
import useCategoryStore from '~/store/categories';

import { v4 as uuid } from 'uuid';

export default function CategoryBoard() {
  const { menuId = '' } = useParams();
  const { menus, updateMenu } = useMenuStore(pick(['menus', 'updateMenu']));
  const { categories, createCategory } = useCategoryStore(identity);

  const menu = useMemo(() => {
    return menus.find(propEq('id', menuId));
  }, [menuId, menus]);

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
    <Board
      label="Categories"
      editable
      data={categories}
      checkedList={menu.categories}
      onUpdateCheckedList={handleUpdateMenuCategories}
    />
  );
}
