import type { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaTiktok,
  FaPinterest,
} from 'react-icons/fa6';

import { ROUTES } from '../../router/routes';
import './Footer.css';

interface SocialLink {
  label: string;
  href: string;
  icon: ReactElement;
}

interface FooterLink {
  label: string;
  path: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/sanrio/', icon: <FaInstagram /> },
  { label: 'X / Twitter', href: 'https://twitter.com/sanrio', icon: <FaXTwitter /> },
  { label: 'YouTube', href: 'https://www.youtube.com/@HelloKittyandFriends', icon: <FaYoutube /> },
  { label: 'TikTok', href: 'https://www.tiktok.com/@sanrio', icon: <FaTiktok /> },
  { label: 'Pinterest', href: 'https://www.pinterest.com/sanrio/', icon: <FaPinterest /> },
];

const NAV_LINKS: FooterLink[] = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'Characters', path: ROUTES.CHARACTERS },
  { label: 'Contact', path: ROUTES.CONTACT },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: 'Terms of Service', path: ROUTES.TOS },
  { label: 'Privacy Policy', path: ROUTES.PRIVACY },
];

const currentYear = new Date().getFullYear();

const Footer = () => (
  <footer className="footer">

    <div className="footer__divider-row" aria-hidden="true">
      <hr className="divider" />
    </div>

    <div className="footer__dots dot-bg" aria-hidden="true" />

    <div className="footer__inner container">

      <div className="footer__col footer__col--brand">
        <NavLink to={ROUTES.HOME} className="footer__logo" aria-label="Sanrio homepage">
          <span className="footer__logo-star" aria-hidden="true">★</span>
          <span className="footer__logo-text">Sanrio</span>
          <span className="footer__logo-star" aria-hidden="true">★</span>
        </NavLink>

        <p className="footer__tagline">
          Small gifts, big smiles.
          <br />
          Spreading happiness since 1960.
        </p>

        <ul className="footer__socials" aria-label="Social media links">
          {SOCIAL_LINKS.map(({ label, href, icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label={label}
              >
                {icon}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__col">
        <h3 className="footer__col-heading">Explore</h3>
        <ul className="footer__link-list">
          {NAV_LINKS.map(({ label, path }) => (
            <li key={path}>
              <NavLink to={path} className="footer__link">
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__col">
        <h3 className="footer__col-heading">Legal</h3>
        <ul className="footer__link-list">
          {LEGAL_LINKS.map(({ label, path }) => (
            <li key={path}>
              <NavLink to={path} className="footer__link">
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="footer__newsletter">
          <p className="footer__newsletter-text">
            Get kawaii news in your inbox ✉︎
          </p>
          <NavLink to={ROUTES.CONTACT} className="btn btn--ghost btn--sm">
            Subscribe
          </NavLink>
        </div>
      </div>
    </div>

    <div className="footer__bottom">
      <div className="container footer__bottom-inner">
        <p className="footer__copyright">
          © {currentYear} Sanrio Co., Ltd. All rights reserved.
        </p>
        <p className="footer__credit">
          Designed with&nbsp;
          <span aria-label="love" role="img">♡</span>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
