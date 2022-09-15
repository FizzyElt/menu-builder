import { useRoutes, RouteObject } from 'react-router-dom';

import Home from '~/pages/Home';

import Menus from '~/pages/Menus';
import CategoriesBoard from './pages/Menus/Categories';

import Categories from './pages/Categories';
import Items from './pages/Items';
import Selections from './pages/Selections';

const routes: Array<RouteObject> = [
  { path: '', element: <Home /> },
  {
    path: 'overview',
    element: <Menus />,
    children: [
      {
        path: ':menuId',
        element: <CategoriesBoard />,
        children: [
          {
            path: ':categoryId',
            element: 'category',
            children: [{ path: ':itemId', element: 'item' }],
          },
        ],
      },
    ],
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
