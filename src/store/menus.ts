import create from 'zustand';
import { append, pipe, assoc, propEq, not, compose, identity, ifElse, always } from 'ramda';

import { Menu } from '~/type';

interface MenuStore {
  menus: Array<Menu>;
  createMenu: (menu: Menu) => void;
}

const useMenuStore = create<MenuStore>((set) => ({
  menus: [],
  createMenu: (menu: Menu) => set((state) => ({ menus: append(menu, state.menus) })),
  deleteMenu: (menuId: string) =>
    set((state) => ({ menus: state.menus.filter(compose(not, propEq('id', menuId))) })),
  updateMenu: (menu: Menu) =>
    set((state) => ({
      menus: state.menus.map(
        ifElse<[Menu], Menu, Menu>(propEq('id', menu.id), always(menu), identity)
      ),
    })),
}));

export default useMenuStore;
