import ItemFormModal, { ItemFormModalProps } from './ItemFormModal';

interface CreateItemModalProps extends ItemFormModalProps {}

export default function CreateItemModal(props: CreateItemModalProps) {
  return <ItemFormModal {...props} />;
}
