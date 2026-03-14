import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import Home from '../pages/home/Home';
import Characters from '../pages/characters/Characters';
import Contact from '../pages/contact/Contact';
import News from '../pages/news/News';
import LegalPage from '../pages/legal/LegalPage';
import NotFound from '../pages/not-found/NotFound';
import { ROUTES } from './routes';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES.CHARACTERS, element: <Characters /> },
      { path: ROUTES.CONTACT, element: <Contact /> },
      { path: ROUTES.NEWS, element: <News /> },
      { path: ROUTES.TOS, element: <LegalPage /> },
      { path: ROUTES.PRIVACY, element: <LegalPage /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
