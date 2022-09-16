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
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  ModalProps,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { useForm, useFieldArray, Controller } from 'react-hook-form';

import { v4 as uuid } from 'uuid';

export type EditSelectionForm = {
  name: string;
  options: Array<{
    id: string;
    name: string;
    price: string | number;
  }>;
};

const defaultForm = {
  name: '',
  options: [],
};

export interface SelectionFormModalProps extends Omit<ModalProps, 'children'> {
  defaultFormValues?: EditSelectionForm;
  onSubmit?: (data: EditSelectionForm) => void;
}

export default function SelectionFormModal({
  defaultFormValues = defaultForm,
  onSubmit = () => {},
  ...props
}: SelectionFormModalProps) {
  const { control, handleSubmit, reset } = useForm({ defaultValues: defaultFormValues });

  useEffect(() => {
    if (props.isOpen) {
      reset(defaultFormValues);
    }
  }, [props.isOpen]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  return (
    <Modal size="md" isCentered scrollBehavior="inside" {...props}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalCloseButton />
        <ModalHeader>Selection</ModalHeader>
        <ModalBody>
          <VStack align="stretch">
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
                required: true,
              }}
            />

            <FormControl>
              <FormLabel>Options</FormLabel>
              <VStack align="stretch">
                {fields.map((field, index) => (
                  <HStack key={field.id}>
                    <Controller
                      control={control}
                      name={`options.${index}.name`}
                      render={({ field, fieldState: { invalid } }) => (
                        <Input flex="3" placeholder="name" {...field} isInvalid={invalid} />
                      )}
                      rules={{
                        required: true,
                      }}
                    />
                    <Controller
                      control={control}
                      name={`options.${index}.price`}
                      render={({ field, fieldState: { invalid } }) => (
                        <Input flex="2" placeholder="price" {...field} isInvalid={invalid} />
                      )}
                      rules={{
                        validate: (v) => !isNaN(Number(v)),
                      }}
                    />
                    <IconButton
                      aria-label="remove option"
                      size="sm"
                      colorScheme="red"
                      icon={<DeleteIcon />}
                      onClick={() => remove(index)}
                    />
                  </HStack>
                ))}

                <Button onClick={() => append({ id: uuid(), name: '', price: '' })}>New</Button>
              </VStack>
            </FormControl>
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
