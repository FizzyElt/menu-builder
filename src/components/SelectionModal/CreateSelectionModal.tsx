import SelectionFormModal, { SelectionFormModalProps } from './SelectionFormModal';

interface CreateSelectionModalProps extends SelectionFormModalProps {}

export default function CreateSelectionModal(props: CreateSelectionModalProps) {
  return <SelectionFormModal {...props} />;
}
