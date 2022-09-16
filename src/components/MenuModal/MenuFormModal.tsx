import { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  ModalProps,
} from '@chakra-ui/react';

import { useForm, Controller } from 'react-hook-form';

export type EditMenuForm = {
  name: string;
};

const defaultForm: EditMenuForm = {
  name: '',
};

export interface MenuFormModalProps extends Omit<ModalProps, 'children'> {
  defaultFormValues?: EditMenuForm;
  onSubmit?: (data: EditMenuForm) => void;
}

export default function MenuFormModal({
  defaultFormValues = defaultForm,
  onSubmit = () => {},
  ...props
}: MenuFormModalProps) {
  const { handleSubmit, control, reset } = useForm<EditMenuForm>({
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (props.isOpen) {
      reset(defaultFormValues);
    }
  }, [props.isOpen]);

  return (
    <Modal size="sm" isCentered {...props}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalCloseButton />
        <ModalHeader></ModalHeader>
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
          <Button type="submit" w="full" colorScheme="blue">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
