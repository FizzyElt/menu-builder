import { Outlet } from 'react-router-dom';
import ItemBoard from './components/ItemBoard';

export default function Items() {
  return (
    <>
      <ItemBoard />
      <Outlet />
    </>
  );
}
