import { VStack, Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import useMenuStore from '~/store/menus';
import useCategoryStore from '~/store/categories';
import useItemStore from '~/store/items';
import useSelectionStore from '~/store/selections';

import { prop } from 'ramda';

export default function Home() {
  const generateMenus = useMenuStore(prop('generateMenus'));
  const generateCategories = useCategoryStore(prop('generateCategories'));
  const generateItems = useItemStore(prop('generateItems'));
  const generateSelections = useSelectionStore(prop('generateSelections'));

  const handleCreateSampleData = () => (
    generateMenus(5), generateCategories(10), generateItems(30), generateSelections(5)
  );

  return (
    <Box mx="auto" w="20rem">
      <VStack align="stretch">
        <Button onClick={handleCreateSampleData}>generate data</Button>
        <Button as={Link} to="overview">
          Overview
        </Button>
        <Button as={Link} to="menus">
          Menus
        </Button>
        <Button as={Link} to="categories">
          Categories
        </Button>
        <Button as={Link} to="items">
          Items
        </Button>
        <Button as={Link} to="selections">
          Selections
        </Button>
      </VStack>
    </Box>
  );
}
