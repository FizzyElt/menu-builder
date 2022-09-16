import MenuFormModal, { MenuFormModalProps } from './MenuFormModal';

interface CreateMenuModalProps extends MenuFormModalProps {}

export default function CreateMenuModal(props: CreateMenuModalProps) {
  return <MenuFormModal {...props} />;
}
