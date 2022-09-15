import create from 'zustand';
import { compose, append, propEq, ifElse, identity, always, not } from 'ramda';

import { Selection } from '~/type';

export interface SelectionStore {
  selections: Array<Selection>;
  createSelection: (selection: Selection) => void;
  deleteSelection: (selectionId: string) => void;
  updateSelection: (selection: Selection) => void;
}

const useSelectionStore = create<SelectionStore>((set) => ({
  selections: [],
  createSelection: (selection: Selection) =>
    set((state) => ({ selections: append(selection, state.selections) })),
  deleteSelection: (selectionId: string) =>
    set((state) => ({
      selections: state.selections.filter(compose(not, propEq('id', selectionId))),
    })),
  updateSelection: (selection: Selection) =>
    set((state) => ({
      selections: state.selections.map(
        ifElse<[Selection], Selection, Selection>(
          propEq('id', selection.id),
          always(selection),
          identity
        )
      ),
    })),
}));

export default useSelectionStore;
