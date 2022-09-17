import Board from '~/components/Board';

import useMenuStore from '~/store/menus';

import { identity, prop } from 'ramda';

export default function MenuBoard() {
  const { menus } = useMenuStore(identity);

  return (
    <>
      <Board
        label="Menus"
        data={menus}
        checkedList={menus.map(prop('id'))}
      />
    </>
  );
}
