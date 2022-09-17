import { Box, VStack, Checkbox, CheckboxGroup, Text, Flex } from '@chakra-ui/react';
import { Identity } from '.';

interface CheckboxListProps<T extends Identity> {
  checkedList: Array<string>;
  data: Array<T>;
  onUpdateCheckedList?: (checkedList: Array<string>) => void;
}

export default function CheckboxList<T extends Identity>({
  checkedList,
  data,
  onUpdateCheckedList,
}: CheckboxListProps<T>) {
  return (
    <Box h="100%" overflowY="auto" p={2}>
      <CheckboxGroup value={checkedList} onChange={onUpdateCheckedList}>
        <VStack align="stretch">
          {data.map((item) => (
            <Box key={item.id} py={2} px={4}>
              <Flex align="center">
                <Checkbox value={item.id}>
                  <Text>{item.name}</Text>
                </Checkbox>
              </Flex>
            </Box>
          ))}
        </VStack>
      </CheckboxGroup>
    </Box>
  );
}
