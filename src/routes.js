import { lazy } from 'react';

import AuthGuard from 'guards/AuthGuard';

import MainLayout from 'layouts/MainLayout';

// List page not auth
const Signin = lazy(() => import('pages/Auth/Signin'));


const Dashboard = lazy(() => import('pages/Dashboard'));
const ProductList = lazy(() => import('pages/ProductList'));
const Customers = lazy(() => import('pages/Customers'));
const Orders = lazy(() => import('pages/Orders'));
const Analytics = lazy(() => import('pages/BarChart'));

const ColorPage = lazy(() => import('pages/Colors'));
const CategoryPage = lazy(() => import('pages/Category'));
const UserPage = lazy(() => import('pages/UserList'));

const NotFound = lazy(() => import('pages/NotFound'));

export const routes = [
  {
    path: '/',
    exact: true,
    layout: MainLayout,
    component: Dashboard,
    guard: AuthGuard,
  },
  {
    path: '/product-list',
    layout: MainLayout,
    exact: true,
    component: ProductList,
    guard: AuthGuard,
  },
  {
    path: '/customers',
    layout: MainLayout,
    exact: true,
    component: Customers,
    guard: AuthGuard,
  },
  {
    path: '/orders',
    layout: MainLayout,
    exact: true,
    component: Orders,
    guard: AuthGuard,
  },
  {
    path: '/analytics',
    layout: MainLayout,
    exact: true,
    component: Analytics,
    guard: AuthGuard,
  },
  {
    path: '/colors',
    layout: MainLayout,
    exact: true,
    component: ColorPage,
    guard: AuthGuard,
  },
  {
    path: '/category',
    layout: MainLayout,
    exact: true,
    component: CategoryPage,
    guard: AuthGuard,
  },
  {
    path: '/users',
    layout: MainLayout,
    exact: true,
    component: UserPage,
    guard: AuthGuard,
  },


  {
    path: '/signin',
    exact: true,
    component: Signin,
  },

  /**
  path: là đường dẫn
  layout: là thằng dùng chung bên ngoài, nhưng trang nào mà cần login vào mới có sidebar thì cứ copy paste cái layout này xuống@media screen and(min-width: 567px) {
  exact: của react-route thằng nào có route con ở trong thì mới cần cân nhắc,
  component: Là component trong folder page tượng trưng cho 1 trang 
  guard: mặc định cứ để AuthGuard thì khi chưa login sẽ tự bị đẩy ra ngoài nơi bắt login 
  }
  @media screen and(min-width: 768px) {
  }
  */
  { path: '*', component: NotFound },
];
