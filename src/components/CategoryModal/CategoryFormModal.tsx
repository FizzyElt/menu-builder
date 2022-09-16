import { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalProps,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';

export type EditCategoryForm = {
  name: string;
};

const defaultForm: EditCategoryForm = {
  name: '',
};

export interface CategoryFormModalProps extends Omit<ModalProps, 'children'> {
  defaultFormValues?: EditCategoryForm;
  onSubmit?: (data: EditCategoryForm) => void;
}

export default function CategoryFormModal({
  defaultFormValues = defaultForm,
  onSubmit = () => {},
  ...props
}: CategoryFormModalProps) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (props.isOpen) {
      reset(defaultFormValues);
    }
  }, [props.isOpen]);

  return (
    <Modal size="md" isCentered {...props}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalCloseButton />
        <ModalHeader>Category</ModalHeader>
        <ModalBody>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error, invalid } }) => (
              <FormControl isRequired isInvalid={invalid}>
                <FormLabel>Name</FormLabel>
                <Input {...field} />
                <FormErrorMessage>{error?.message || ''}</FormErrorMessage>
              </FormControl>
            )}
            rules={{
              required: { value: true, message: 'Name can not be empty' },
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button type="submit" colorScheme="blue" w="full">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
