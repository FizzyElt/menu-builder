import { Box, VStack, Text, Flex, Spacer, IconButton, HStack } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useParams, NavLink } from 'react-router-dom';

import { pipe, tap } from 'ramda';

import { Menu } from '~/type';

interface MenuListProps {
  menus: Array<Menu>;
  onDelete: (id: string) => void;
  onEdit: (menu: Menu) => void;
}

export default function MenuList({ menus, onDelete, onEdit }: MenuListProps) {
  return (
    <Box h="100%" overflowY="auto" p={2}>
      <VStack align="stretch">
        {menus.map((menu) => (
          <NavLink to={menu.id} key={menu.id}>
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
                <Flex align="center">
                  <Text>{menu.name}</Text>
                  <Spacer />
                  <HStack>
                    <IconButton
                      size="xs"
                      rounded="full"
                      aria-label="edit menu"
                      variant="ghost"
                      colorScheme="gray"
                      icon={<EditIcon />}
                      onClick={pipe(
                        tap((e) => e.stopPropagation()),
                        tap(() => onEdit(menu))
                      )}
                    />
                    <IconButton
                      size="xs"
                      rounded="full"
                      aria-label="delete menu"
                      variant="ghost"
                      colorScheme="red"
                      icon={<DeleteIcon />}
                      onClick={pipe(
                        tap((e) => e.stopPropagation()),
                        tap(() => onDelete(menu.id))
                      )}
                    />
                  </HStack>
                </Flex>
              </Box>
            )}
          </NavLink>
        ))}
      </VStack>
    </Box>
  );
}
