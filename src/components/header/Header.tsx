import { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '../../router/routes';
import './Header.css';

interface NavItem {
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'Characters', path: ROUTES.CHARACTERS },
  { label: 'Contact', path: ROUTES.CONTACT },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 12);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleResize = () => { if (mediaQuery.matches) closeMenu(); };
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      <header className={`header${isScrolled ? ' header--scrolled' : ''}`}>
        <div className="header__inner container">

          <NavLink
            to={ROUTES.HOME}
            className="header__logo"
            onClick={closeMenu}
            aria-label="Sanrio — go to homepage"
          >
            <span className="header__logo-star" aria-hidden="true">★</span>
            <span className="header__logo-text">Sanrio</span>
            <span className="header__logo-star" aria-hidden="true">★</span>
          </NavLink>

          <nav className="header__nav hide-on-mobile" aria-label="Main navigation">
            <ul className="header__nav-list">
              {NAV_ITEMS.map(({ label, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    end={path === ROUTES.HOME}
                    className={({ isActive }) =>
                      `header__nav-link${isActive ? ' header__nav-link--active' : ''}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <NavLink
            to={ROUTES.CHARACTERS}
            className="btn btn--primary btn--sm hide-on-mobile"
          >
            Explore ✦
          </NavLink>

          <button
            className={`header__hamburger hide-on-desktop${isMenuOpen ? ' header__hamburger--open' : ''}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="header__bar" />
            <span className="header__bar" />
            <span className="header__bar" />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`header__mobile-menu hide-on-desktop${isMenuOpen ? ' header__mobile-menu--open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className="header__mobile-list">
            {NAV_ITEMS.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === ROUTES.HOME}
                  className={({ isActive }) =>
                    `header__mobile-link${isActive ? ' header__mobile-link--active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <NavLink
            to={ROUTES.CHARACTERS}
            className="btn btn--primary"
            onClick={closeMenu}
          >
            Explore ✦
          </NavLink>
        </nav>
      </div>

      {isMenuOpen && (
        <div
          className="header__backdrop hide-on-desktop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;
