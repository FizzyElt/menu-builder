import { Category } from '~/type';
import CategoryFormModal, { CategoryFormModalProps } from './CategoryFormModal';

interface UpdateCategoryModalProps extends CategoryFormModalProps {
  category?: Category;
}

export default function UpdateCategoryModal({ category, ...props }: UpdateCategoryModalProps) {
  return <CategoryFormModal {...props} defaultFormValues={category && { name: category.name }} />;
}
