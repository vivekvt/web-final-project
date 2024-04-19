import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/products',
    element: <ProductsPage />,
  },
  {
    path: '/products/:productId',
    element: <ProductDetailPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
