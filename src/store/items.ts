import create from 'zustand';
import { append, compose, not, propEq, ifElse, always, identity, times } from 'ramda';

import { v4 as uuid } from 'uuid';

import { Item } from '~/type';

export interface ItemStore {
  items: Array<Item>;
  createItem: (item: Item) => void;
  deleteItem: (itemId: string) => void;
  updateItem: (item: Item) => void;
  generateItems: (amount: number) => void;
}

const useItemStore = create<ItemStore>((set) => ({
  items: [],
  createItem: (item: Item) => set((state) => ({ items: append(item, state.items) })),
  deleteItem: (itemId: string) =>
    set((state) => ({
      items: state.items.filter(compose(not, propEq('id', itemId))),
    })),
  updateItem: (item: Item) =>
    set((state) => ({
      items: state.items.map(
        ifElse<[Item], Item, Item>(propEq('id', item.id), always(item), identity)
      ),
    })),

  generateItems: (amount: number) =>
    set(() => ({
      items: times(
        (index) => ({
          id: uuid(),
          name: `item ${index}`,
          price: 1,
          description: `item ${index} description`,
          selections: [],
        }),
        amount
      ),
    })),
}));

export default useItemStore;
