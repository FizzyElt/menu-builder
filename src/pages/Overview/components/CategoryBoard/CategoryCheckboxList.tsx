import { Box, VStack, Checkbox, CheckboxGroup, Text, Flex } from '@chakra-ui/react';
import { Category } from '~/type';

interface CategoryCheckboxListProps {
  categories: Array<Category>;
  categoryIds: Array<string>;
  onUpdateCategories: (categories: Array<string>) => void;
}

export default function CategoryCheckboxList({
  categories,
  categoryIds,
  onUpdateCategories,
}: CategoryCheckboxListProps) {
  return (
    <Box h="100%" overflowY="auto" p={2}>
      <CheckboxGroup value={categoryIds} onChange={onUpdateCategories}>
        <VStack align="stretch">
          {categories.map((category) => (
            <Box key={category.id} py={2} px={4}>
              <Flex align="center">
                <Checkbox value={category.id}>
                  <Text>{category.name}</Text>
                </Checkbox>
              </Flex>
            </Box>
          ))}
        </VStack>
      </CheckboxGroup>
    </Box>
  );
}
