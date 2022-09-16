import { Menu } from '~/type';
import MenuFormModal, { MenuFormModalProps } from './MenuFormModal';

interface UpdateMenuModalProps extends MenuFormModalProps {
  menu?: Menu;
}

export default function UpdateMenuModal({ menu, ...props }: UpdateMenuModalProps) {
  return <MenuFormModal {...props} defaultFormValues={menu && { name: menu.name }}></MenuFormModal>;
}
