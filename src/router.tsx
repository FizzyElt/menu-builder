import { useRoutes, RouteObject } from 'react-router-dom';

import Home from '~/pages/Home';

import Overview from '~/pages/Overview';
import CategoriesBoard from '~/pages/Overview/Categories';
import ItemsBoard from '~/pages/Overview/Items';
import SelectionBoard from './pages/Overview/Selections';

import Menus from '~/pages/Menus';
import Categories from './pages/Categories';
import Items from './pages/Items';
import Selections from './pages/Selections';

const routes: Array<RouteObject> = [
  { path: '', element: <Home /> },
  {
    path: 'overview',
    element: <Overview />,
    children: [
      {
        path: ':menuId',
        element: <CategoriesBoard />,
        children: [
          {
            path: ':categoryId',
            element: <ItemsBoard />,
            children: [{ path: ':itemId', element: <SelectionBoard /> }],
          },
        ],
      },
    ],
  },
  {
    path: 'menus',
    element: <Menus />,
  },
  {
    path: 'items',
    element: <Items />,
  },
  {
    path: 'categories',
    element: <Categories />,
  },
  {
    path: 'selections',
    element: <Selections />,
  },
];

export default function Routes() {
  const elements = useRoutes(routes);

  return elements;
}
