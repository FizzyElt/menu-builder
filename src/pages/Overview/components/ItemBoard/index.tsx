import { useMemo } from 'react';

import Board from '~/components/Board';

import useItemStore from '~/store/items';
import useCategoryStore from '~/store/categories';

import { equals, pick, identity, propEq, isNil } from 'ramda';
import { useParams, Navigate } from 'react-router-dom';

export default function ItemBoard() {
  const { categoryId = '' } = useParams();
  const { categories, updateCategory } = useCategoryStore(pick(['categories', 'updateCategory']));

  const { items } = useItemStore(identity);

  const category = useMemo(() => {
    return categories.find(propEq('id', categoryId));
  }, [categoryId, categories]);

  const handleUpdateCategoryItems = (items: Array<string>) => {
    if (!category) return;
    updateCategory({
      ...category,
      items,
    });
  };

  if (isNil(category)) {
    return <Navigate to="../" />;
  }

  return (
    <Board
      label="Items"
      editable
      data={items}
      checkedList={category.items}
      onUpdateCheckedList={handleUpdateCategoryItems}
    />
  );
}
