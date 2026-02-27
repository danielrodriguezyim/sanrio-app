import { NavLink }              from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';

import { ROUTES } from '../../router/routes';
import './Hero.css';

/* ----------------------------------------------------------------
   IMAGE SPEC — hero background (optional upgrade path):
   File : public/images/hero-bg.jpg
   Size : 1440 × 680 px  (2× for retina: 2880 × 1360 px)
   Format: JPEG, quality 85. Keep file under 250 KB.
   Usage: Replace the CSS gradient in Hero.css with:
     background-image: url('/images/hero-bg.jpg');
     background-size: cover;
     background-position: center top;
   The overlay div already handles text legibility.
   ---------------------------------------------------------------- */

const containerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const Hero = () => (
  <section className="hero" aria-label="Welcome banner">
    {/* Decorative floating shapes */}
    <span className="hero__shape hero__shape--1" aria-hidden="true">✦</span>
    <span className="hero__shape hero__shape--2" aria-hidden="true">★</span>
    <span className="hero__shape hero__shape--3" aria-hidden="true">♡</span>
    <span className="hero__shape hero__shape--4" aria-hidden="true">✿</span>
    <span className="hero__shape hero__shape--5" aria-hidden="true">✦</span>

    <div className="container hero__inner">
      <motion.div
        className="hero__content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span className="badge hero__badge" variants={itemVariants}>
          ✦ Sanrio Fan Page
        </motion.span>

        <motion.h1 className="hero__title" variants={itemVariants}>
          Where Every Day
          <br />
          <span className="hero__title-accent">Feels Magical</span>
        </motion.h1>

        <motion.p className="hero__description" variants={itemVariants}>
          Discover the world of Sanrio — meet your favourite characters,
          explore our collection, and bring a little kawaii into your life.
        </motion.p>

        <motion.div className="hero__actions" variants={itemVariants}>
          <NavLink to={ROUTES.CHARACTERS} className="btn btn--primary btn--lg">
            Meet the Characters ✦
          </NavLink>
          <NavLink to={ROUTES.CONTACT} className="btn btn--ghost btn--lg">
            Get in Touch
          </NavLink>
        </motion.div>

        {/* Trust strip */}
        <motion.div className="hero__trust" variants={itemVariants}>
          <span className="hero__trust-item">♡ Since 1960</span>
          <span className="hero__trust-sep" aria-hidden="true" />
          <span className="hero__trust-item">✦ 400+ Characters</span>
          <span className="hero__trust-sep" aria-hidden="true" />
          <span className="hero__trust-item">★ Worldwide Shipping</span>
        </motion.div>
      </motion.div>

      {/* Character showcase strip — 3 floating placeholder circles
          Replace src values with real character images when available */}
      <motion.div
        className="hero__visual"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        {/* IMAGE SPEC — hero character portraits:
            Files : public/images/characters/hello-kitty.png  (primary)
                    public/images/characters/my-melody.png    (secondary)
                    public/images/characters/cinnamoroll.png  (tertiary)
            Size  : 320 × 320 px each, transparent PNG
            Usage : Displayed at 220 px, 180 px, and 160 px respectively
                    inside .hero__portrait elements below.             */}
        <div className="hero__portrait hero__portrait--primary">
          <img
            src="/images/portraits/hello-kitty-circle.png"
            alt="Hello Kitty"
            width={280}
            height={280}
            loading="eager"
          />
        </div>
        <div className="hero__portrait hero__portrait--secondary">
          <img
            src="/images/portraits/kuromi-circle.png"
            alt="Kuromi"
            width={260}
            height={260}
            loading="eager"
          />
        </div>
        <div className="hero__portrait hero__portrait--tertiary">
          <img
            src="/images/portraits/cinnamoroll-circle.png"
            alt="Cinnamon Roll"
            width={240}
            height={240}
            loading="eager"
          />
        </div>
      </motion.div>
    </div>

    {/* Bottom wave */}
    <div className="hero__wave" aria-hidden="true">
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z"
          fill="var(--color-bg)"
        />
      </svg>
    </div>
  </section>
);

export default Hero;
