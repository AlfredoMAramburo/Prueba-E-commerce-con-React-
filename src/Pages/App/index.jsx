import { useContext } from 'react';
import { useRoutes, BrowserRouter, Navigate } from 'react-router-dom';
import { ShoppingCartProvider, initializeLocalStorage, ShoppingCartContext } from '../../Context';
import Home from '../Home';
import MyAccount from '../MyAccount';
import MyOrder from '../MyOrder';
import MyOrders from '../MyOrders';
import NotFound from '../NotFound';
import SignIn from '../SignIn';
import Navbar from '../../Components/Navbar';
import CheckoutSideMenu from '../../Components/CheckoutSideMenu';
import './App.css';

const AppRoutes = () => {
  const context = useContext(ShoppingCartContext);

  const account = localStorage.getItem('account');
  const parsedAccount = account ? JSON.parse(account) : null;

  const signOut = localStorage.getItem('sign-out');
  const parsedSignOut = JSON.parse(signOut);

  const noAccountInLocalStorage = !parsedAccount || Object.keys(parsedAccount).length === 0;
  const noAccountInLocalState = !context.account || Object.keys(context.account).length === 0;
  const hasUserAnAccount = noAccountInLocalStorage || noAccountInLocalState;
  const isUserSignOut = context.signOut || parsedSignOut;

  let routes = useRoutes([
    { path: '/', element: !hasUserAnAccount || isUserSignOut ? <Navigate replace to={'/sign-in'} /> : <Home /> },
    { path: '/clothes', element: !hasUserAnAccount || isUserSignOut ? <Navigate replace to={'/sign-in'} /> : <Home /> },
    { path: '/electronics', element: !hasUserAnAccount || isUserSignOut ? <Navigate replace to={'/sign-in'} /> : <Home /> },
    { path: '/furnitures', element: !hasUserAnAccount || isUserSignOut ? <Navigate replace to={'/sign-in'} /> : <Home /> },
    { path: '/toys', element: !hasUserAnAccount || isUserSignOut ? <Navigate replace to={'/sign-in'} /> : <Home /> },
    { path: '/others', element: !hasUserAnAccount || isUserSignOut ? <Navigate replace to={'/sign-in'} /> : <Home /> },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/my-order', element: <MyOrder /> },
    { path: '/my-orders', element: <MyOrders /> },
    { path: '/my-orders/last', element: <MyOrder /> },
    { path: '/my-orders/:id', element: <MyOrder /> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/*', element: <NotFound /> },
  ]);

  return routes;
};

const App = () => {
  initializeLocalStorage();

  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
};

export default App;
