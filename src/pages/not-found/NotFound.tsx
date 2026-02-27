import { NavLink } from 'react-router-dom';
import { motion }  from 'framer-motion';

import { ROUTES } from '../../router/routes';
import './NotFound.css';

const NotFound = () => (
  <div className="not-found">
    <motion.div
      className="not-found__inner"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <span className="not-found__icon animate-float" aria-hidden="true">🌸</span>
      <h1 className="not-found__code">404</h1>
      <h2 className="not-found__title">Page not found</h2>
      <p className="not-found__message">
        Looks like this page wandered off to Mariland. Let's get you back home. ♡
      </p>

      <div className="not-found__actions">
        <NavLink to={ROUTES.HOME} className="btn btn--primary btn--lg">
          Back to Home ✦
        </NavLink>
        <NavLink to={ROUTES.CHARACTERS} className="btn btn--ghost btn--lg">
          Meet the Characters
        </NavLink>
      </div>
    </motion.div>

    {/* Floating background shapes */}
    <div className="not-found__shapes" aria-hidden="true">
      <span>★</span><span>♡</span><span>✿</span><span>✦</span><span>★</span>
    </div>
  </div>
);

export default NotFound;
