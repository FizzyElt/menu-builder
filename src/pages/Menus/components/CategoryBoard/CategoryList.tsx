import { Box, VStack, Flex, IconButton, Text, Spacer, HStack } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { Category } from '~/type';

interface CategoryListProps {
  categories: Array<Category>;
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <Box h="100%" overflowY="auto" p={2}>
      <VStack align="stretch">
        {categories.map((category) => (
          <NavLink key={category.id} to={category.id}>
            {({ isActive }) => (
              <Box
                as="button"
                py={2}
                px={4}
                w="full"
                rounded="md"
                bgColor={isActive ? 'blue.200' : 'transparent'}
                _hover={{ bgColor: 'blue.200' }}
              >
                <Flex>
                  <Text>{category.name}</Text>
                  <Spacer />
                </Flex>
              </Box>
            )}
          </NavLink>
        ))}
      </VStack>
    </Box>
  );
}
