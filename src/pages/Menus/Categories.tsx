import { Outlet } from 'react-router-dom';
import CategoryBoard from './components/CategoryBoard';

export default function Categories() {
  return (
    <>
      <CategoryBoard />
      <Outlet />
    </>
  );
}
