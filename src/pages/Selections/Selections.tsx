import { useState } from 'react';
import {
  Container,
  Box,
  VStack,
  Flex,
  Heading,
  Divider,
  Spacer,
  IconButton,
  Text,
  useDisclosure,
  HStack,
  Square,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

import CreateSelectionModal from '~/components/SelectionModal/CreateSelectionModal';
import UpdateSelectionModal from '~/components/SelectionModal/UpdateSelectionModal';

import useSelectionStore from '~/store/selections';

import { identity } from 'ramda';
import { v4 as uuid } from 'uuid';

import { Selection } from '~/type';
import { EditSelectionForm } from '~/components/SelectionModal/SelectionFormModal';

export default function Selections() {
  const createModalDisclosure = useDisclosure();
  const updateModalDisclosure = useDisclosure();

  const { selections, createSelection, deleteSelection, updateSelection } =
    useSelectionStore(identity);

  const [selection, setSelection] = useState<Selection | undefined>();

  const handleCreateSelection = (data: EditSelectionForm) => {
    createSelection({
      id: uuid(),
      name: data.name,
      options: data.options.map((option) => ({ ...option, price: Number(option.price) })),
    });

    createModalDisclosure.onClose();
  };

  const handleUpdateSelection = (data: EditSelectionForm) => {
    if (!selection) return;

    updateSelection({
      ...selection,
      name: data.name,
      options: data.options.map((option) => ({ ...option, price: Number(option.price) })),
    });

    updateModalDisclosure.onClose();
  };

  const handleDeleteSelection = (id: string) => () => {
    deleteSelection(id);
  };

  return (
    <>
      <Box>
        <Container maxW="30rem" py={6}>
          <VStack align="stretch">
            <Flex align="center" px={4}>
              <Heading fontSize="lg">Selections</Heading>
              <Spacer />
              <IconButton
                aria-label="create selection"
                size="sm"
                icon={<AddIcon />}
                onClick={createModalDisclosure.onOpen}
              />
            </Flex>
            <Divider />

            {selections.map((selection) => (
              <Box key={selection.id} px={4} py={2}>
                <Flex>
                  <Text>{selection.name}</Text>
                  <Spacer />
                  <HStack>
                    <IconButton
                      aria-label="update selection"
                      size="sm"
                      rounded="full"
                      variant="ghost"
                      icon={<EditIcon />}
                      onClick={() => (updateModalDisclosure.onOpen(), setSelection(selection))}
                    />
                    <IconButton
                      aria-label="delete selection"
                      size="sm"
                      rounded="full"
                      variant="ghost"
                      colorScheme="red"
                      icon={<DeleteIcon />}
                      onClick={handleDeleteSelection(selection.id)}
                    />
                  </HStack>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Container>
      </Box>

      <CreateSelectionModal
        isOpen={createModalDisclosure.isOpen}
        onClose={createModalDisclosure.onClose}
        onSubmit={handleCreateSelection}
      />
      <UpdateSelectionModal
        isOpen={updateModalDisclosure.isOpen}
        onClose={updateModalDisclosure.onClose}
        onSubmit={handleUpdateSelection}
        selection={selection}
      />
    </>
  );
}
