import create from 'zustand';
import { append, propEq, not, compose, identity, ifElse, always, equals } from 'ramda';

import { Menu } from '~/type';

export interface MenuStore {
  menus: Array<Menu>;
  createMenu: (menu: Menu) => void;
  deleteMenu: (menuId: string) => void;
  updateMenu: (menu: Menu) => void;
  removeCategory: (categoryId: string) => void;
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

  removeCategory: (id: string) =>
    set((state) => ({
      menus: state.menus.map((menu) => ({
        ...menu,
        categories: menu.categories.filter(compose(not, equals(id))),
      })),
    })),
}));

export default useMenuStore;
