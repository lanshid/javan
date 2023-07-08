/* eslint-disable react-hooks/exhaustive-deps */
import { RouteObject, useRoutes } from 'react-router-dom';
import ListProductPage from '../pages/shop';
import CartPage from '../pages/shop/cart';
import WishListPage from '../pages/shop/wishlist';

const MainRoutes = () => {
 
  const routes: RouteObject[] = [
    { path: '/', element: <ListProductPage /> },
    { path: '/cart', element: <CartPage /> },
    { path: '/wishlist', element: <WishListPage /> },
  ];
  const element = useRoutes(routes);
  return (
    <>
      {element}
    </>
  );
};

export default MainRoutes;
