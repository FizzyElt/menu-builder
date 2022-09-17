import { Box, VStack, Flex, Text, Spacer, HStack } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { Identity } from '.';

interface ListProps<T extends Identity> {
  data: Array<T>;
  canNavigate?: boolean;
  onSelect?: (item: T) => void;
}

export default function List<T extends Identity>({ canNavigate = true, data }: ListProps<T>) {
  return (
    <Box h="100%" overflowY="auto" p={2}>
      <VStack align="stretch">
        {data.map((item) => (
          <NavLink key={item.id} to={canNavigate ? item.id : '.'}>
            {({ isActive }) => (
              <Box
                as="button"
                py={2}
                px={4}
                w="full"
                rounded="md"
                bgColor={canNavigate && isActive ? 'blue.200' : 'transparent'}
                _hover={{ bgColor: 'blue.200' }}
              >
                <Flex align="center">
                  <Text>{item.name}</Text>
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
