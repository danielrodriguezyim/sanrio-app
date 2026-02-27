import { Outlet, useLocation } from 'react-router-dom';
import { useEffect }           from 'react';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import './Layout.css';

/* Scroll to top on every route change */
const useScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
};

const Layout = () => {
  useScrollToTop();

  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
