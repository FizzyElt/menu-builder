import { useRoutes, RouteObject } from 'react-router-dom';

import Menus from '~/pages/Menus';
import Categories from './pages/Categories';
import Items from './pages/Items';
import Selections from './pages/Selections';

const routes: Array<RouteObject> = [
  { path: '', element: 'home' },
  {
    path: 'menus',
    element: <Menus />,
    children: [{ path: ':menuId', element: 'menu' }],
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
