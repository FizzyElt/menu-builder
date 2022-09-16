import { Item } from '~/type';
import ItemFormModal, { ItemFormModalProps } from './ItemFormModal';

interface UpdateItemModalProps extends ItemFormModalProps {
  item?: Item;
}

export default function UpdateItemModal({ item, ...props }: UpdateItemModalProps) {
  const defaultForm = item && { name: item.name, price: item.price, description: item.description };

  return <ItemFormModal {...props} defaultFormValues={defaultForm}></ItemFormModal>;
}
