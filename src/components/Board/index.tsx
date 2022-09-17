import { useState, useMemo } from 'react';
import { VStack, Flex, Heading, Spacer, Divider, IconButton, StackProps } from '@chakra-ui/react';
import { ViewIcon, EditIcon } from '@chakra-ui/icons';
import List from './List';
import CheckboxList from './CheckboxList';

import { always, cond, equals } from 'ramda';

export type Identity = {
  id: string;
  name: string;
};

interface BoardProps<T extends Identity> {
  label: string;
  checkedList?: Array<string>;
  data: Array<T>;
  editable?: boolean;
  canNavigate?: boolean;
  onSelect?: (item: T) => void;
  onUpdateCheckedList?: (data: Array<string>) => void;

  containerStyles?: StackProps;
}

export default function Board<T extends Identity>({
  label,
  checkedList = [],
  data,
  editable = false,
  canNavigate,
  containerStyles = {},
  onSelect,
  onUpdateCheckedList,
}: BoardProps<T>) {
  const [mode, setMode] = useState<'view' | 'edit'>('view');

  const checkedItems = useMemo(() => {
    const idSet = new Set(checkedList);
    return data.filter((item) => idSet.has(item.id));
  }, [data, checkedList]);

  return (
    <VStack
      w="full"
      maxW="25rem"
      py={4}
      h="100%"
      align="stretch"
      rounded="md"
      bgColor="cyan.50"
      {...containerStyles}
    >
      <Flex px={5} align="center">
        <Heading fontSize="lg">{label}</Heading>
        <Spacer />

        <IconButton
          aria-label="mode switch"
          isDisabled={!editable}
          size="sm"
          icon={equals(mode, 'view') ? <EditIcon /> : <ViewIcon />}
          onClick={() => setMode((prev) => (equals(prev, 'view') ? 'edit' : 'view'))}
        />
      </Flex>
      <Divider />
      {cond([
        [
          equals('view'),
          always(<List data={checkedItems} onSelect={onSelect} canNavigate={canNavigate} />),
        ],
        [
          equals('edit'),
          always(
            <CheckboxList
              checkedList={checkedList}
              data={data}
              onUpdateCheckedList={onUpdateCheckedList}
            />
          ),
        ],
      ])(mode)}
    </VStack>
  );
}
