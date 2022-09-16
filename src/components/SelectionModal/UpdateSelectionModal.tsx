import { Selection } from '~/type';
import SelectionFormModal, { SelectionFormModalProps } from './SelectionFormModal';

import { dissoc } from 'ramda';

interface UpdateSelectionModalProps extends SelectionFormModalProps {
  selection?: Selection;
}

export default function UpdateSelectionModal({ selection, ...props }: UpdateSelectionModalProps) {
  const defaultForm = selection && dissoc('id', selection);

  return <SelectionFormModal {...props} defaultFormValues={defaultForm} />;
}
