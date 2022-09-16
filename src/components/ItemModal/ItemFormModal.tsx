import { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Flex,
  VStack,
  ModalProps,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';

export type EditItemForm = {
  name: string;
  price: string | number;
  description: string;
};

const defaultForm: EditItemForm = {
  name: '',
  price: '',
  description: '',
};

export interface ItemFormModalProps extends Omit<ModalProps, 'children'> {
  defaultFormValues?: EditItemForm;
  onSubmit?: (data: EditItemForm) => void;
}

export default function ItemFormModal({
  defaultFormValues = defaultForm,
  onSubmit = () => {},
  ...props
}: ItemFormModalProps) {
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
        <ModalHeader>Item</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState: { error, invalid } }) => (
                <FormControl isInvalid={invalid}>
                  <FormLabel>Name</FormLabel>
                  <Input {...field} />
                  <FormErrorMessage>{error?.message || ''}</FormErrorMessage>
                </FormControl>
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Name can not be empty',
                },
              }}
            />
            <Controller
              control={control}
              name="price"
              render={({ field, fieldState: { error, invalid } }) => (
                <FormControl isInvalid={invalid}>
                  <FormLabel>Price</FormLabel>
                  <Input {...field} />
                  <FormErrorMessage>{error?.message || ''}</FormErrorMessage>
                </FormControl>
              )}
              rules={{
                validate: (v) => (isNaN(Number(v)) ? 'Not a number' : true),
              }}
            />
            <Controller
              control={control}
              name="description"
              render={({ field, fieldState: { error, invalid } }) => (
                <FormControl isInvalid={invalid}>
                  <FormLabel>Description</FormLabel>
                  <Textarea {...field} resize="none" />
                  <FormErrorMessage>{error?.message || ''}</FormErrorMessage>
                </FormControl>
              )}
            />
          </VStack>
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
