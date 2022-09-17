import Board from '~/components/Board';

import useSelectionStore from '~/store/selections';
import useItemStore from '~/store/items';

import { identity, isNil, pick, propEq } from 'ramda';
import { useParams, Navigate } from 'react-router-dom';
import { useMemo } from 'react';

export default function SelectionBoard() {
  const { itemId = '' } = useParams();
  const { items, updateItem } = useItemStore(pick(['items', 'updateItem']));

  const { selections } = useSelectionStore(identity);

  const item = useMemo(() => {
    return items.find(propEq('id', itemId));
  }, [itemId, items]);

  const handleUpdateItemSelections = (selections: Array<string>) => {
    if (!item) return;
    updateItem({
      ...item,
      selections,
    });
  };

  if (isNil(item)) {
    return <Navigate to="../" />;
  }

  return (
    <Board
      label="selections"
      editable
      data={selections}
      checkedList={item.selections}
      onUpdateCheckedList={handleUpdateItemSelections}
      canNavigate={false}
    />
  );
}
