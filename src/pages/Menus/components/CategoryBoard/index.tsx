import { Heading, VStack, Divider } from '@chakra-ui/react';
import CategoryList from './CategoryList';
export default function CategoryBoard() {
  return (
    <VStack w="20rem" p={6} h="100%" align="stretch">
      <Heading fontSize="lg" px={5}>
        Categories
      </Heading>
      <Divider />
      <CategoryList></CategoryList>
    </VStack>
  );
}
