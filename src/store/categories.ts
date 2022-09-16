import create from 'zustand';
import { append, compose, not, propEq, ifElse, always, identity, equals } from 'ramda';

import { Category } from '~/type';

export interface CategoryStore {
  categories: Array<Category>;
  createCategory: (category: Category) => void;
  deleteCategory: (categoryId: string) => void;
  updateCategory: (category: Category) => void;
  removeItem: (itemId: string) => void;
}

const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],

  createCategory: (category: Category) =>
    set((state) => ({ categories: append(category, state.categories) })),

  deleteCategory: (categoryId: string) =>
    set((state) => ({
      categories: state.categories.filter(compose(not, propEq('id', categoryId))),
    })),

  updateCategory: (category: Category) =>
    set((state) => ({
      categories: state.categories.map(
        ifElse<[Category], Category, Category>(
          propEq('id', category.id),
          always(category),
          identity
        )
      ),
    })),

  removeItem: (id: string) =>
    set((state) => ({
      categories: state.categories.map((category) => ({
        ...category,
        items: category.items.filter(compose(not, equals(id))),
      })),
    })),
}));

export default useCategoryStore;
