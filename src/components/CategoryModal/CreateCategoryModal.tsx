import CategoryFormModal, { CategoryFormModalProps } from './CategoryFormModal';

interface CreateCategoryModalProps extends CategoryFormModalProps {}

export default function CreateCategoryModal(props: CreateCategoryModalProps) {
  return <CategoryFormModal {...props} />;
}
